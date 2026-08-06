---
marp: true
theme: default
paginate: true
title: Agentes locales seguros y centralizados para repositorios institucionales
---

# Agentes locales seguros y centralizados

## Capacidades aprobadas para los repositorios del banco

**Audiencia:** Ingeniería, plataforma, ciberseguridad, riesgos y dueños de repositorios

---

## Mensaje ejecutivo

> **Centralizar políticas, distribución y evidencia; no todos los flujos de desarrollo.**

El banco necesita:

- Catálogo aprobado.
- Perfiles con mínimo privilegio.
- Controles para excepciones locales.
- Identidad, privacidad y auditoría.
- Aprobación humana para acciones de alto impacto.

---

## Principio de diseño

### La autonomía local debe estar gobernada

- **Centralizar:** políticas, perfiles y registro de herramientas.
- **Localizar:** ejecución en el IDE o CLI del desarrollador.
- **Restringir:** herramientas, datos, redes y credenciales.
- **Verificar:** pruebas, escaneos y revisiones.
- **Revocar:** acceso ante riesgo o incumplimiento.

---

## ¿Qué es un agente local?

Un agente local es una capacidad de IA que se ejecuta en el entorno del desarrollador y puede:

- Leer código y documentación.
- Proponer o modificar archivos.
- Ejecutar pruebas y comandos.
- Invocar herramientas mediante MCP.

**La ejecución es local; las reglas deben ser institucionales.**

---

## Capas de distribución

| Capa | Función |
| --- | --- |
| Empresarial | Políticas, riesgo y controles obligatorios |
| Organizacional | Catálogo de agentes, skills y plantillas |
| Repositorio | Configuración, pruebas y revisiones locales |
| Equipo del desarrollador | Ejecución con perfiles aprobados |

---

## Modelo operativo

```text
Gobierno empresarial
        ↓
Catálogo organizacional
        ↓
Repositorio institucional
        ↓
Equipo del desarrollador
```

**Las políticas bajan; la evidencia sube.**

---

## Catálogo central de agentes

Cada agente publicado debe incluir:

- Propósito y alcance.
- Dueño técnico y de negocio.
- Herramientas permitidas.
- Datos y entornos autorizados.
- Versión y dependencias.
- Fecha de revisión.
- Plan de retiro.

---

## Perfil seguro de agente

### Reglas esenciales

- Una responsabilidad concreta.
- Herramientas mínimas.
- Lectura como valor predeterminado.
- Acciones prohibidas explícitas.
- Flujo de trabajo reproducible.
- Salida y evidencia estandarizadas.
- Puertas de aprobación definidas.

**El perfil es configuración productiva: debe revisarse como código.**

---

## Incorporación segura: identidad

Antes de habilitar un agente local:

1. Autenticar con la identidad institucional.
2. Validar postura y cumplimiento del equipo.
3. Usar IDE, CLI y extensiones aprobados.
4. Aplicar políticas empresariales y del repositorio.
5. Mantener credenciales temporales y acotadas.

---

## Incorporación segura: contexto

- Excluir secretos y llaves privadas.
- No incluir datos reales de clientes.
- Preferir datos sintéticos o enmascarados.
- Tratar tickets, páginas web e issues como datos no confiables.
- Evitar repetir tokens, cookies o headers.
- Definir retención y residencia de datos.

---

## Incorporación segura: validación

Antes del commit o PR:

- Escaneo de secretos.
- Lint y formato.
- Pruebas automatizadas.
- Revisión de dependencias.
- Validación de políticas.
- Revisión humana del cambio.

**La velocidad no reemplaza los controles de calidad.**

---

## MCP: registro central

El registro MCP debe documentar:

- Identidad y versión del servidor.
- Propósito y dueño.
- Herramientas permitidas.
- Clasificación de datos.
- Entornos autorizados.
- Autenticación y secretos.
- Logs, límites y revisión.

---

## MCP: reglas de uso

- Permitir solo servidores registrados.
- Permitir herramientas individualmente.
- Preferir operaciones de lectura.
- Separar desarrollo, pruebas y producción.
- Redactar datos sensibles.
- Aplicar timeouts y límites de red.
- Revisar cualquier cambio de permisos.

[GitHub: Uso empresarial de servidores MCP](https://docs.github.com/en/copilot/concepts/mcp-management)

---

## Separar leer de actuar

| Nivel | Ejemplo | Control |
| --- | --- | --- |
| Observar | Leer documentación | Permitir y registrar |
| Preparar | Crear código o borradores | Validar antes de fusionar |
| Cambiar | Commit o PR | Aprobación humana |
| Impactar | Producción o datos | Doble aprobación |
| Prohibido | Obtener credenciales | Denegar y alertar |

---

## Acciones que requieren aprobación

Exigir aprobación humana para:

- Cambios productivos.
- Migraciones o mutaciones de datos.
- Comandos destructivos.
- Despliegues.
- Comunicaciones externas.
- Cambios de permisos.
- Acceso a información regulada.

**Toda acción irreversible debe tener un responsable identificable.**

---

## Controles del repositorio

Cada repositorio institucional debe implementar:

- `.github/copilot-instructions.md`.
- Instrucciones por ruta sensible.
- Agentes y skills aprobados.
- MCP limitado al registro central.
- Protección de ramas.
- CODEOWNERS.
- Secret scanning y push protection.
- Code scanning y revisión de dependencias.

---

## Evidencia en el pull request

El PR debe indicar:

- Agente y versión utilizados.
- Políticas activas.
- Servidores MCP y herramientas invocadas.
- Acciones de escritura ejecutadas.
- Aprobadores de acciones elevadas.
- Clasificación de datos utilizada.
- Pruebas y escaneos ejecutados.
- Riesgos y pendientes.

**Sin evidencia no existe gobierno confiable.**

---

## Ciclo de vida

```text
Proponer
   ↓
Modelar amenazas
   ↓
Revisar y pilotear
   ↓
Publicar
   ↓
Monitorear y recertificar
   ↓
Actualizar o retirar
```

Revisar al menos trimestralmente o ante cambios materiales.

---

## Revocación e incidentes

Debe existir un mecanismo rápido para:

- Deshabilitar un agente.
- Revocar credenciales.
- Retirar un servidor MCP.
- Bloquear una herramienta.
- Notificar a los dueños.
- Preservar evidencia.
- Analizar el alcance del incidente.

**La capacidad debe ser revocable, no permanente.**

---

## Hoja de ruta

| Fase | Resultado |
| --- | --- |
| 1. Base | Dueños, riesgos y reglas |
| 2. Catálogo | Agentes y MCP aprobados |
| 3. Barreras | Identidad, endpoint y secretos |
| 4. Repositorios | Ramas, scans y CODEOWNERS |
| 5. Observabilidad | Auditoría e incidentes |
| 6. Escala | Activación por riesgo |

---

## Métricas de adopción

- Repositorios con la línea base aprobada.
- Agentes activos provenientes del catálogo.
- Tiempo desde aprobación hasta disponibilidad.
- PR con evidencia completa.
- Uso de agentes por área y riesgo.

---

## Métricas de seguridad

- Agentes o MCP no aprobados detectados.
- Secretos bloqueados.
- Excepciones vencidas.
- Herramientas fuera de revisión.
- Intentos de bypass.
- Tiempo para revocar una capacidad comprometida.

---

## Lista de decisión

Antes de habilitar un agente local:

- [ ] Dueño y propósito documentados.
- [ ] Riesgo y alcance definidos.
- [ ] Perfil y herramientas aprobados.
- [ ] Lectura como valor predeterminado.
- [ ] Secretos gestionados externamente.
- [ ] Datos sensibles excluidos o aislados.
- [ ] Aprobaciones de alto impacto configuradas.
- [ ] Auditoría, revisión y retiro definidos.

---

# Recomendación final

## Hacer que el camino seguro sea el más fácil

> Cada agente local debe estar **aprobado, limitado, observable y revocable**.

- Políticas centralizadas.
- Ejecución local controlada.
- Herramientas con mínimo privilegio.
- Datos protegidos.
- Validación determinista.
- Responsabilidad humana.

---

## Referencias

- [GitHub — Gestión empresarial de agentes](https://docs.github.com/en/copilot/concepts/agents/enterprise-management)
- [GitHub — Agentes personalizados](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-cli/about-custom-agents)
- [GitHub — Uso empresarial de servidores MCP](https://docs.github.com/en/copilot/concepts/mcp-management)
- [GitHub — Enforcement de listas MCP](https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement)
- [NIST — Marco de gestión de riesgos de IA](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP — Top 10 para aplicaciones LLM](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Repositorio — Ecosistema de agentes y MCP](../agent-ecosystem.md)
- [Repositorio — Catálogo MCP](../../mcp/README.md)
