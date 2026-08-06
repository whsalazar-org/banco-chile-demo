# Usar Copilot para acelerar el modelado en BigQuery

---

## Título

# Usar Copilot para acelerar el modelado en BigQuery

### Artefactos de modelado, mapeos de campos y esquemas tipados

**Mensaje clave:** acelerar la primera versión sin delegar las decisiones de negocio, seguridad o despliegue.

**Notas del presentador:**
- Copilot ayuda a transformar metadatos y reglas explícitas en artefactos revisables.
- El resultado generado es un borrador: la aprobación humana sigue siendo obligatoria.

---

## Objetivos

Al finalizar, el equipo podrá:

- Definir un contrato de modelado antes de generar SQL.
- Crear mapeos origen-destino trazables.
- Generar esquemas tipados para BigQuery y aplicaciones.
- Producir modelos SQL y pruebas de calidad.
- Aplicar un ciclo de revisión seguro y repetible.

---

## Principio de trabajo

## Copilot acelera la ejecución; las personas gobiernan las decisiones

### Copilot puede ayudar a:

- Crear primeros borradores de modelos, mapeos y esquemas.
- Detectar inconsistencias entre artefactos.
- Proponer validaciones, documentación y casos de prueba.
- Identificar campos sensibles y preguntas abiertas.

### Copilot no debe:

- Inventar definiciones de negocio.
- Aprobar accesos a datos sensibles.
- Ejecutar cambios productivos sin aprobación explícita.

> Tratar SQL, mapeos, esquemas y metadatos de gobierno como borradores sujetos a revisión.

---

## Qué artefactos se pueden acelerar?

- Notas de modelos conceptuales y lógicos.
- Tablas de mapeo origen-destino.
- Sentencias `CREATE TABLE` y `CREATE VIEW`.
- Esquemas JSON para `bq`, APIs y procesos de ingesta.
- Modelos tipados en TypeScript o C#.
- Consultas de validación y controles de calidad.
- Sugerencias de particionamiento, clustering y nombres.
- Inventarios de campos sensibles y etiquetas de políticas.
- Casos de prueba y listas de verificación para pull requests.

---

## Estructura recomendada

```text
bigquery/
├── models/
│   ├── staging/
│   ├── intermediate/
│   └── marts/
├── mappings/
│   └── customer.yml
├── schemas/
│   ├── customer.json
│   └── customer.ts
├── tests/
│   └── customer_quality.sql
└── README.md
```

### Recomendaciones

- Versionar los artefactos junto con el código.
- Mantener cada cambio acotado a un modelo o producto de datos.
- Respetar las convenciones existentes del repositorio.

---

## Flujo de trabajo de extremo a extremo

1. **Definir** el contrato de modelado.
2. **Mapear** los campos origen-destino.
3. **Tipar** el esquema de BigQuery y los consumidores.
4. **Generar** el artefacto SQL.
5. **Revisar** diseño, seguridad y costos.
6. **Validar** sintaxis, calidad y consistencia.
7. **Aprobar y desplegar** mediante el flujo normal de pull request.

### Regla

Generar un artefacto por vez y comparar cada resultado con la fuente aprobada.

---

## Paso 1: contrato de modelado

Antes de solicitar SQL, documentar:

- Granularidad: una fila por cliente, cuenta, transacción o evento.
- Tablas origen y columnas relevantes.
- Campos obligatorios y opcionales.
- Convenciones de nombres.
- Zona horaria y reglas para timestamps.
- Claves y reglas de unicidad.
- Nulos, valores por defecto y datos tardíos.
- Particionamiento y clustering.
- Clasificación de PII y datos confidenciales.
- Consumidores esperados y objetivo de frescura.

### Seguridad

Usar placeholders para proyectos, datasets, credenciales y valores sensibles. Nunca pegar secretos, tokens, cadenas de conexión o registros productivos innecesarios.

---

## Prompt: contrato de modelado

```text
Actúa como ingeniero senior de analítica. Crea un contrato de modelado
para una dimensión de clientes en BigQuery.

Granularidad: una fila por cliente maestro.
Fuentes: raw.crm_customer, raw.core_party.
Resultados: customer_key, source_system, created_at, updated_at, status.
Reglas: usar timestamps UTC, preservar identificadores origen,
no inventar mapeos, identificar ambigüedades como PREGUNTAS ABIERTAS
y clasificar campos sensibles.

Devuelve: granularidad y claves, supuestos, definiciones por campo,
preguntas pendientes y pruebas propuestas.
```

### Resultado esperado

Un contrato revisable antes de implementar transformaciones.

---

## Paso 2: mapeo origen-destino

Solicitar el mapeo antes del SQL para separar decisiones de negocio de detalles de implementación.

### Cada registro debe incluir

- Tabla y campo origen.
- Modelo y campo destino.
- Transformación.
- Tipo y modo de BigQuery.
- Nulabilidad.
- Regla de calidad.
- Clasificación de sensibilidad.
- Nivel de confianza.
- Responsable o pregunta pendiente.

### Beneficio

La trazabilidad facilita la revisión, el mantenimiento y el análisis de impacto.

---

## Ejemplo de mapeo

```yaml
- target: customer_key
  type: STRING
  mode: REQUIRED
  source: [raw.crm_customer.customer_id, raw.core_party.party_id]
  transformation: "Normalizar el identificador maestro según la regla aprobada."
  lineage_status: confirmed
  sensitivity: internal
  quality_rules:
    - not_null
    - unique
```

### Regla de gobierno

Copilot no debe inventar la regla de resolución de identidades. La debe proporcionar y aprobar el responsable de negocio o de datos.

---

## Paso 3: esquema tipado

Generar dos artefactos sincronizados:

1. **Esquema de despliegue:** JSON para `bq` o la API de BigQuery.
2. **Modelo de consumo:** interfaz TypeScript o tipo C#.

### Requisitos

- Conservar nombres, descripciones, modos y estructuras anidadas.
- Representar explícitamente los campos anulables.
- Usar timestamps UTC en las fronteras del sistema.
- No cambiar tipos para ocultar datos inválidos.
- Reportar cualquier conversión con pérdida de información.

---

## Tipos y representación

BigQuery incluye tipos como:

`STRING` · `INT64` · `NUMERIC` · `BOOL` · `DATE` · `DATETIME` · `TIMESTAMP` · `GEOGRAPHY` · `JSON` · `ARRAY` · `STRUCT`

### Ejemplo de consumidor TypeScript

```typescript
export interface Customer {
  customer_key: string;
  created_at: string;
  preferences?: {
    language?: string;
  };
}
```

### Para consumidores C#

- Usar tipos de referencia anulables.
- Usar `DateTimeOffset` para instantes UTC.
- Incluir documentación XML en miembros públicos.
- Mantener las credenciales fuera del código.

---

## Paso 4: modelo SQL

Solicitar el modelo después de revisar el mapeo y el esquema.

### Reglas recomendadas

- Usar BigQuery GoogleSQL.
- Mantener la granularidad declarada.
- Usar listas explícitas de columnas; nunca `SELECT *`.
- Conservar la trazabilidad en comentarios SQL.
- Aplicar conversiones explícitas.
- Usar `SAFE_CAST` solo cuando esté autorizado por el mapeo.
- Normalizar timestamps a UTC.
- Hacer determinista el tratamiento de duplicados y nulos.
- Justificar particionamiento y clustering según los patrones de consulta.
- Evitar identificadores específicos de proyectos en artefactos reutilizables.

---

## Modelos incrementales

Para un modelo incremental, especificar antes de generar:

- Marca de agua o watermark.
- Estrategia de actualización.
- Clave de deduplicación.
- Ventana de reprocesamiento.
- Política para datos tardíos.
- Comportamiento de backfill y replay.

### Si falta una decisión

Copilot debe generar una **PREGUNTA ABIERTA**, no asumir silenciosamente una regla.

---

## Revisión del diseño

Solicitar una revisión separada de la generación de código.

### Aspectos a evaluar

- Corrección de granularidad y claves.
- Dimensiones estables, rápidamente cambiantes o historizadas.
- Medidas aditivas, semi-aditivas o no aditivas.
- Cardinalidad de joins y riesgo de fan-out.
- Particionamiento y clustering.
- Costo y volumen de datos escaneados.
- Backfill, replay y datos tardíos.
- Zonas horarias y calendarios.
- Compatibilidad con consumidores tipados.

> No pedir que el modelo sea “óptimo” sin proporcionar patrones de consulta, volumen, frescura y objetivos de costo.

---

## Ciclo de validación

1. **Generar:** un artefacto por solicitud.
2. **Inspeccionar:** nombres, granularidad, tipos, nulos, linaje y seguridad.
3. **Validar:** sintaxis y dry run fuera de producción.
4. **Probar:** unicidad, nulos, valores aceptados, relaciones y conteos.
5. **Comparar:** SQL contra esquema y mapeo.
6. **Resolver:** todas las preguntas abiertas con los responsables.
7. **Desplegar:** mediante pull request y aprobaciones establecidas.

---

## Prompts de revisión

```text
Compara el SQL, el esquema JSON y el mapeo YAML.
Lista cada diferencia por campo. No modifiques archivos.
```

```text
Revisa pérdida silenciosa de datos, nulos inesperados,
reducción de tipos, fan-out, claves duplicadas y errores de zona horaria.
Indica la columna exacta y recomienda una prueba para cada problema.
```

```text
Genera únicamente consultas de validación para BigQuery.
No generes SQL destructivo, DDL, credenciales ni comandos de producción.
```

---

## Seguridad y gobierno

### Revisión humana obligatoria

- Clasificación y etiquetas de políticas.
- Filtros de filas y principales autorizados.
- Enmascaramiento.
- Roles IAM y cuentas de servicio.
- Movimiento entre proyectos o regiones.
- Exposición de datos personales o confidenciales.

### Controles BigQuery

- Las etiquetas de políticas permiten control de acceso a nivel de columna.
- La seguridad a nivel de fila restringe subconjuntos de registros.
- Ambos controles deben alinearse con la clasificación y el modelo de acceso aprobado.

Nunca incluir secretos, cadenas de conexión o datos productivos innecesarios en prompts o commits.

---

## DCriterios de finalización

Un cambio está listo para revisión cuando:

- La granularidad y las claves están documentadas.
- Cada campo tiene origen, transformación, tipo, nulabilidad y sensibilidad revisados.
- SQL, mapeo y esquema tipado son consistentes.
- Las ambigüedades están documentadas y asignadas.
- Existen pruebas de calidad y regresión.
- La sintaxis y el dry run se validaron fuera de producción.
- Las decisiones de particionamiento y clustering están justificadas.
- Seguridad y acceso fueron revisados por sus responsables.
- No hay secretos ni registros productivos innecesarios.
- El pull request indica qué generó Copilot y qué verificó una persona.

---

## Plantilla de pull request

```markdown
## Cambio de modelado BigQuery

### Artefactos
- Modelo:
- Mapeo:
- Esquema:
- Pruebas:

### Contrato
- Granularidad:
- Clave principal/de negocio:
- Estrategia de actualización:
- Particionamiento/clustering:

### Validación
- [ ] Sintaxis o dry run fuera de producción
- [ ] SQL, esquema y mapeo comparados
- [ ] Pruebas de calidad actualizadas
- [ ] Campos sensibles y accesos revisados
- [ ] Sin secretos ni registros productivos
- [ ] Preguntas abiertas resueltas

### Uso de Copilot
Copilot creó borradores y verificaciones de consistencia.
Los revisores validaron reglas de negocio, linaje, tipos,
seguridad, pruebas y seguridad del despliegue.
```

---

## Mensajes clave

1. **Definir antes de generar:** el contrato evita supuestos ocultos.
2. **Mapear antes de implementar:** la trazabilidad guía el SQL y el esquema.
3. **Tipar de forma sincronizada:** BigQuery y las aplicaciones deben compartir el contrato.
4. **Validar fuera de producción:** las pruebas protegen calidad y costos.
5. **Mantener control humano:** negocio, datos y seguridad aprueban las decisiones críticas.

---

## Fuentes oficiales

- [Ingeniería de prompts para GitHub Copilot](https://docs.github.com/en/copilot/concepts/prompting/prompt-engineering)
- [Personalizar Copilot para un proyecto](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-copilot-overview)
- [Tipos de datos de BigQuery](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types)
- [Control de acceso a nivel de columna en BigQuery](https://cloud.google.com/bigquery/docs/column-level-security-intro)
- [Seguridad a nivel de fila en BigQuery](https://cloud.google.com/bigquery/docs/row-level-security-intro)

