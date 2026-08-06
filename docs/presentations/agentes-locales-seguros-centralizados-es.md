---
marp: true
theme: default
paginate: true
title: Agentes locales seguros y centralizados para repositorios institucionales
---

# Agentes locales seguros y centralizados

## Capacidades aprobadas para los repositorios del banco

**Audiencia:** Ingeniería, plataforma, ciberseguridad, riesgos y dueños de repositorios  
**Alcance:** Agentes locales de IDE/CLI, perfiles personalizados e integraciones MCP

---

## Mensaje ejecutivo

> **Centralizar políticas, distribución y evidencia; no todos los flujos de desarrollo.**

El banco debe ofrecer:

- Catálogo central de agentes y herramientas aprobadas.
- Perfiles reutilizables con mínimo privilegio.
- Controles de repositorio para excepciones locales.
- Identidad sólida, aislamiento de secretos, clasificación de datos y auditoría.
- Aprobación humana para acciones productivas, destructivas, externas o reguladas.

[GitHub: Gestión empresarial de agentes](https://docs.github.com/en/copilot/concepts/agents/enterprise-management)  
[NIST: Marco de gestión de riesgos de IA](https://www.nist.gov/itl/ai-risk-management-framework)

---

## ¿Qué es un agente local?

| Capacidad | Ubicación | Gobierno central |
| --- | --- | --- |
| Agente del repositorio | `.github/agents/` | Versionado con el código |
| Agente organizacional | Repositorio `.github` o `.github-private` | Compartido entre repositorios |
| Agente empresarial | Repositorio empresarial `.github-private` | Compartido entre organizaciones |
| Agente IDE/CLI | Equipo del desarrollador | Perfiles, políticas, endpoint y monitoreo |
| Servidor MCP local | Equipo del desarrollador | Registro, herramientas, secretos, red y datos restringidos |

**Distinción clave:** GitHub no administra directamente la configuración local del IDE. Se requieren controles combinados de identidad, endpoint, red y repositorio.

[GitHub: Agentes personalizados](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-cli/about-custom-agents)

---

## Modelo operativo objetivo

```text
Gobierno empresarial de IA
  ├─ Catálogo y versiones aprobadas
  ├─ Registro MCP y listas permitidas
  ├─ Identidad, datos, red y endpoints
  └─ Auditoría, métricas e incidentes
          ↓
Repositorio de plataforma organizacional
  └─ Agentes, instrucciones, skills y plantillas
          ↓
Repositorio institucional
  └─ Configuración, MCP, pruebas y revisiones
          ↓
Equipo del desarrollador
  └─ Ejecución solo con perfiles y herramientas aprobados
```

**Principio:** las políticas bajan; la evidencia sube.

---

## Patrón de distribución central

### Línea base empresarial

- Reglas obligatorias de seguridad, privacidad y uso aceptable.
- Dueños para agentes, MCP, datos y aprobaciones.
- Niveles de riesgo: bajo, moderado, alto y prohibido.

### Catálogo organizacional

- Publicar agentes reutilizables en `.github` o `.github-private`.
- Usar visibilidad interna; reservar la privada para guías sensibles.
- Versionar cambios mediante PR, revisión de seguridad y changelog.

### Adopción por repositorio

- Consumir la línea base sin copiarla.
- Permitir extensiones locales justificadas.
- Registrar excepciones, dueños y fechas de vencimiento.

[GitHub: Preparar agentes personalizados](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents)

---

## Contrato mínimo de un perfil de agente

Todo agente publicado debe definir:

- **Propósito:** una responsabilidad concreta.
- **Alcance:** repositorios, rutas, entornos y datos.
- **Herramientas permitidas:** las mínimas; lectura como valor predeterminado.
- **Acciones prohibidas:** secretos, producción, comandos destructivos y comunicaciones no aprobadas.
- **Flujo:** inspeccionar → planificar → implementar → probar → revisar → informar.
- **Puertas de aprobación:** acciones que requieren una persona autorizada.
- **Salida:** archivos, pruebas, herramientas, riesgos y pendientes.
- **Ciclo de vida:** versión, dueño, soporte, revisión y retiro.

**Regla:** un perfil de agente es configuración productiva; revísalo como código.

---

## Incorporación segura del agente local

1. Autenticar con el proveedor de identidad y controles de postura del equipo.
2. Instalar solo IDE, CLI, runtime y extensiones aprobados.
3. Obtener perfiles desde el catálogo organizacional o empresarial.
4. Aplicar instrucciones del repositorio y reglas por ruta.
5. Usar credenciales temporales y acotadas desde un gestor de secretos.
6. Bloquear secretos y datos productivos del contexto.
7. Ejecutar escaneo de secretos, lint, pruebas, dependencias y políticas.
8. Registrar agente, versión, repositorio, herramientas y aprobaciones en el PR.

**Nunca:** pegar credenciales, datos de clientes, llaves privadas, tokens o cadenas de conexión.

---

## Gobierno MCP: registro central, ejecución local

El registro MCP es la fuente de verdad:

- Identidad, dueño, propósito, versión, clasificación y entornos.
- Herramientas permitidas individualmente; lectura primero.
- Secretos administrados o referencias de entorno; nunca valores en Git.
- Egreso de red, timeouts, límites, redacción y logs.
- Separación entre desarrollo, pruebas, staging y producción.
- Aprobación humana para escrituras, acciones destructivas, migraciones y producción.
- Nueva revisión ante cambios de proveedor, versión, permisos o clasificación.

Con **Registry only**, los servidores MCP locales deben usar el ID exacto registrado. Persisten limitaciones de enforcement; se necesitan controles de endpoint y configuración.

[GitHub: Uso empresarial de servidores MCP](https://docs.github.com/en/copilot/concepts/mcp-management)  
[GitHub: Enforcement de listas MCP](https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement)

---

## Modelo de permisos: leer antes de actuar

| Nivel | Ejemplos | Tratamiento |
| --- | --- | --- |
| 0 — Observar | Metadatos, documentación, datos sintéticos | Permitir y registrar |
| 1 — Preparar | Código, pruebas, consultas o borradores de PR | Permitir; validar antes de fusionar |
| 2 — Cambiar | Commits, PR y sistemas no productivos | Aprobación humana y protección de ramas |
| 3 — Impactar | Producción, datos, migraciones o comunicaciones | Doble aprobación y registro de cambio |
| Prohibido | Obtener credenciales, acceso productivo irrestricto o evadir controles | Denegar y alertar |

**El mínimo privilegio debe revisarse durante todo el ciclo de vida.**

---

## Protección de datos y límites de contexto

### Clasificar antes de conectar

- **Público:** contexto externo aprobado.
- **Interno:** servicios y repositorios institucionales.
- **Confidencial:** minimizar, redactar y restringir por rol.
- **Regulado o cliente:** flujo aislado y autorización explícita.

### Defensa en profundidad

- Excluir secretos, llaves, configuraciones sensibles y fixtures reales.
- Usar datos sintéticos o enmascarados.
- Tratar tickets, issues, páginas web y documentación externa como datos no confiables.
- Evitar que el agente repita headers, cookies, tokens o datos personales.
- Definir retención, residencia y eliminación de prompts, trazas y logs.

[OWASP: Top 10 para aplicaciones LLM](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

---

## Controles obligatorios del repositorio

Cada repositorio institucional debe incluir o heredar:

- `.github/copilot-instructions.md` con reglas obligatorias.
- Instrucciones específicas para componentes sensibles.
- Solo agentes y skills aprobados.
- MCP limitado a servidores registrados.
- Protección de ramas y revisiones requeridas.
- Secret scanning y push protection.
- Code scanning, revisión de dependencias y lockfiles.
- CODEOWNERS para seguridad, plataforma y datos.
- Plantilla de PR con uso de agentes y MCP.

Referencia del repositorio: [`docs/agent-ecosystem.md`](../agent-ecosystem.md), [`mcp/README.md`](../../mcp/README.md) y [`mcp/policies/approved-tools.md`](../../mcp/policies/approved-tools.md).

---

## Evidencia mínima en cada pull request

El PR debe responder:

- ¿Qué agente y versión se utilizaron?
- ¿Qué política empresarial u organizacional estaba activa?
- ¿Qué servidores MCP y herramientas se invocaron?
- ¿Se ejecutaron herramientas de escritura o producción?
- ¿Quién aprobó las acciones elevadas?
- ¿Qué clasificación de datos entró al contexto?
- ¿Qué pruebas, escaneos y políticas pasaron?
- ¿Qué riesgos o limitaciones permanecen?

**Sin reconstrucción de la actividad no existe gobierno confiable.**

---

## Ciclo de vida y responsabilidades

```text
Proponer → Modelar amenazas → Revisar → Pilotear
   → Publicar → Monitorear → Recertificar → Actualizar o retirar
```

Controles mínimos:

- Dueño técnico y de negocio.
- Perfil y manifiesto MCP versionados.
- Pruebas de comportamiento permitido y prohibido.
- Revisión trimestral y ante cambios materiales.
- Métricas de uso, excepciones e incidentes.
- Revocación inmediata ante compromiso.
- Plan de retiro para agentes sin soporte.

Desplegar progresivamente: piloto → repositorios de bajo riesgo → expansión → cargas reguladas.

---

## Hoja de ruta para el banco

| Fase | Entregables | Criterio de salida |
| --- | --- | --- |
| 1. Base | Dueños, riesgos, reglas e inventario | Responsabilidades y prohibiciones documentadas |
| 2. Catálogo | Agentes, MCP, versiones y revisiones | Capacidades aprobadas descubribles |
| 3. Barreras | Identidad, endpoint, secretos y contexto | Configuraciones inseguras bloqueadas o detectadas |
| 4. Repositorios | Ramas, scans, CODEOWNERS y plantilla PR | Cambios con controles normales |
| 5. Observabilidad | Auditoría, métricas, excepciones e incidentes | Actividad reconstruible |
| 6. Escala | Activación por organización y riesgo | Adopción sin expansión de permisos |

---

## Métricas de gobierno

### Adopción

- Repositorios con la línea base aprobada.
- Agentes activos provenientes del catálogo.
- Tiempo desde aprobación hasta disponibilidad.

### Seguridad

- Agentes o MCP locales no aprobados detectados.
- Secretos bloqueados por push protection.
- PR con evidencia completa.
- Excepciones vencidas.
- Herramientas fuera de fecha de revisión.
- Acciones de alto riesgo aprobadas versus intentos de bypass.

### Calidad y resiliencia

- Hallazgos por cambio asistido por agente.
- Tiempo para revocar o remediar una capacidad comprometida.
- Fallos repetidos de políticas.
- Disponibilidad, latencia y errores del agente.

**Medir productividad gobernada, no solo automatización.**

---

## Lista de decisión

Antes de habilitar un agente local:

- [ ] Dueño, propósito, alcance y riesgo documentados.
- [ ] Perfil central aprobado o excepción vigente.
- [ ] Herramientas y MCP incluidos en listas permitidas.
- [ ] Lectura como valor predeterminado.
- [ ] Secretos gestionados; nunca valores en código.
- [ ] Datos sensibles excluidos, enmascarados o aislados.
- [ ] Aprobaciones para producción y acciones destructivas.
- [ ] Pruebas, scans y protección de ramas activos.
- [ ] Logs y evidencia del PR retenidos correctamente.
- [ ] Fechas de revisión, revocación y retiro definidas.

---

# Recomendación final

## Hacer que el camino seguro sea el más fácil

- **Centralizar** perfiles, registros, políticas y responsables.
- **Localizar** la ejecución donde se necesita velocidad.
- **Restringir** herramientas, datos, redes y credenciales.
- **Verificar** con controles deterministas de ingeniería y seguridad.
- **Exigir personas** para decisiones irreversibles o de alto impacto.
- **Medir y recertificar** continuamente.

> La pregunta no es si se permiten agentes locales, sino si cada uno está **aprobado, limitado, observable y revocable**.

---

## Referencias

- [GitHub — Gestión empresarial de agentes](https://docs.github.com/en/copilot/concepts/agents/enterprise-management)
- [GitHub — Preparar agentes personalizados](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents)
- [GitHub — Agentes personalizados](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-cli/about-custom-agents)
- [GitHub — Uso empresarial de servidores MCP](https://docs.github.com/en/copilot/concepts/mcp-management)
- [GitHub — Configurar acceso a MCP](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access)
- [GitHub — Enforcement de listas MCP](https://docs.github.com/en/copilot/reference/mcp-allowlist-enforcement)
- [NIST — Marco de gestión de riesgos de IA](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP — Top 10 para aplicaciones LLM](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Repositorio — Ecosistema de agentes y MCP](../agent-ecosystem.md)
- [Repositorio — Catálogo MCP](../../mcp/README.md)
