# Diseño de telemetría y KPI para agentes automatizados y utilización de MCP

**Repositorio:** `whsalazar-org/banco-chile-demo`  
**Estado:** Propuesta de diseño  
**Audiencia:** Equipos de producto, plataforma, SRE, seguridad e ingeniería

## 1. Propósito

Este documento define un modelo de telemetría y un marco de KPI para medir:

- La utilización de agentes automatizados.
- El uso de servidores y herramientas MCP.
- La eficiencia, calidad, confiabilidad y costo de los agentes.
- Los resultados para usuarios y negocio, no solo la actividad.

El diseño puede implementarse detrás de un pequeño adaptador de telemetría, sin acoplar la interfaz de usuario a un proveedor específico de observabilidad.

> [“Un SLI es un indicador de nivel de servicio: una medida cuantitativa cuidadosamente definida.”](https://sre.google/sre-book/service-level-objectives/)

## 2. Principios de diseño

1. **Medir primero los resultados.** La actividad del agente no equivale al éxito. Las medidas principales son los objetivos completados, la corrección, la seguridad, la latencia y el costo.
2. **Usar trazas para la causalidad.** Una solicitud de usuario debe producir una traza que contenga los pasos del agente, las llamadas al modelo, las llamadas MCP, los reintentos, las aprobaciones y el resultado final.
3. **Usar métricas para la agregación.** Los contadores, histogramas y medidores deben responder preguntas operativas sin consultar eventos sin procesar.
4. **Usar registros/eventos para la auditabilidad.** Registrar eventos estructurados para investigaciones, reproducción, análisis de calidad y cumplimiento.
5. **Preservar la privacidad.** No emitir por defecto prompts, tokens, números de cuenta, credenciales, cadenas de conexión ni payloads de herramientas. Usar enmascaramiento, hashing, muestreo y controles de acceso.
6. **Controlar la cardinalidad.** Usar dimensiones acotadas como `agent_name`, `agent_version`, `environment`, `mcp_server`, `tool_name`, `outcome` y `error_type`.
7. **Conectar métricas con trazas.** Los exemplars de OpenTelemetry pueden asociar valores métricos con el contexto de una traza, permitiendo pasar de un KPI a una ejecución representativa.

## 3. Modelo de medición

### 3.1 Jerarquía de entidades

```text
Sesión de usuario
└── Ejecución / traza del agente
    ├── Paso de planificación
    ├── Invocación del modelo
    ├── Llamada a herramienta MCP
    │   ├── Solicitud
    │   ├── Autorización / aprobación
    │   └── Resultado o error
    ├── Paso de validación / recuperación
    └── Respuesta final
```

### 3.2 Identificadores requeridos

| Identificador | Propósito |
|---|---|
| `trace_id` | Correlaciona una ejecución completa del agente |
| `span_id` | Identifica una operación dentro de una traza |
| `session_id` | Agrupa interacciones de usuario relacionadas |
| `agent_run_id` | Identificador empresarial estable de una ejecución del agente |
| `agent_name` / `agent_version` | Facilita el análisis de despliegues y regresiones |
| `mcp_server` / `tool_name` | Identifica la capacidad externa utilizada |
| `policy_decision_id` | Correlaciona una autorización, aprobación o denegación |

Nunca usar identificadores de usuario sin procesar como etiquetas de métricas. Preferir un identificador seudónimo revisado desde el punto de vista de privacidad únicamente en los registros.

## 4. Señales de telemetría

### 4.1 Trazas

Crear spans para:

- `agent.run`
- `agent.plan`
- `model.invoke`
- `mcp.tool.call`
- `mcp.tool.approval`
- `agent.validation`
- `agent.retry`
- `agent.handoff`
- `agent.finalize`

Atributos de span recomendados:

```text
agent.name
agent.version
agent.mode                  # interactivo, segundo plano, programado
agent.goal_type
agent.step_index
agent.step_count
model.provider
model.name
model.requested_output_tokens
model.actual_input_tokens   # solo si está disponible de forma segura
model.actual_output_tokens  # solo si está disponible de forma segura
mcp.server
mcp.tool
mcp.transport
mcp.operation
mcp.approval_required
mcp.approval_result
outcome                     # éxito, fallo, tiempo de espera, denegado, cancelado
error.type
retry.count
```

No almacenar por defecto prompts completos, respuestas completas del modelo ni argumentos MCP en los spans. Si la depuración requiere capturar payloads, usar muestreo explícito con enmascaramiento y retención breve.

### 4.2 Métricas

Usar contadores, histogramas y medidores compatibles con OpenTelemetry. Se prefieren histogramas para distribuciones de latencia, tokens y costos, porque los promedios pueden ocultar el comportamiento de cola.

| Métrica | Tipo | Dimensiones sugeridas |
|---|---|---|
| `agent_runs_total` | Contador | agente, versión, modo, resultado |
| `agent_run_duration_ms` | Histograma | agente, versión, resultado |
| `agent_active_runs` | Medidor | agente, entorno |
| `agent_success_total` | Contador | agente, tipo de objetivo, tipo de éxito |
| `agent_user_corrections_total` | Contador | agente, tipo de corrección |
| `agent_escalations_total` | Contador | agente, motivo |
| `agent_steps_total` | Contador | agente, tipo de paso |
| `agent_retries_total` | Contador | agente, motivo del reintento |
| `mcp_calls_total` | Contador | servidor, herramienta, resultado |
| `mcp_call_duration_ms` | Histograma | servidor, herramienta, resultado |
| `mcp_timeouts_total` | Contador | servidor, herramienta |
| `mcp_denials_total` | Contador | servidor, herramienta, política |
| `mcp_result_validation_failures_total` | Contador | servidor, herramienta, tipo de validación |
| `model_invocations_total` | Contador | modelo, proveedor, resultado |
| `model_tokens_total` | Contador | modelo, proveedor, tipo de token |
| `agent_estimated_cost_usd` | Contador | agente, modelo, servidor MCP |
| `agent_quality_score` | Histograma | agente, evaluador, banda de puntuación |

### 4.3 Eventos estructurados

Emitir eventos estructurados para las transiciones de estado importantes:

```json
{
  "event_name": "mcp.tool.completed",
  "event_version": 1,
  "timestamp": "2026-08-05T00:00:00Z",
  "trace_id": "redacted-or-generated-id",
  "agent_name": "account-assistant",
  "agent_version": "1.3.0",
  "mcp_server": "customer-data",
  "tool_name": "get_account_summary",
  "duration_ms": 184,
  "outcome": "success",
  "result_size_bytes": 420,
  "redaction_applied": true
}
```

Los eventos deben tener versionado. Los consumidores deben tolerar campos adicionales y conservar los campos desconocidos al reenviarlos.

## 5. Marco de KPI

### 5.1 KPI de utilización

| KPI | Fórmula | Interpretación |
|---|---|---|
| **Usuarios activos del agente** | Usuarios activos distintos por período | Adopción y alcance |
| **Ejecuciones del agente** | Cantidad de ejecuciones iniciadas | Volumen de demanda |
| **Tasa de finalización** | Ejecuciones completadas / ejecuciones iniciadas | Confiabilidad básica |
| **Utilización recurrente** | Usuarios con 2 o más ejecuciones / usuarios activos | Formación de hábito |
| **Utilización de capacidades** | Ejecuciones que usan una capacidad / ejecuciones totales | Qué herramientas aportan valor |
| **Concurrencia máxima** | Máximo de ejecuciones simultáneas | Planificación de capacidad |
| **Tasa de derivación humana** | Objetivos elegibles completados sin transferencia humana / objetivos elegibles | Cobertura de automatización |

La utilización debe segmentarse por `goal_type`, recorrido del usuario y entorno. Un alto número de llamadas con baja finalización no representa una utilización saludable.

### 5.2 KPI de llamadas MCP

| KPI | Fórmula | Interpretación |
|---|---|---|
| **Llamadas por ejecución** | Llamadas MCP / ejecuciones del agente | Dependencia de herramientas y eficiencia del plan |
| **Herramientas únicas por ejecución** | Herramientas distintas / ejecución | Amplitud del flujo de trabajo |
| **Tasa de éxito de herramientas** | Llamadas exitosas / llamadas totales | Confiabilidad de MCP |
| **Tasa de tiempo de espera de herramientas** | Llamadas con tiempo agotado / llamadas totales | Problemas de dependencias o tiempos de espera |
| **Tasa de denegación de herramientas** | Llamadas denegadas por política / llamadas intentadas | Fricción de seguridad y autorización |
| **Amplificación por reintentos** | Llamadas totales, incluidos reintentos / llamadas iniciales | Desperdicio causado por reintentos |
| **Proporción de llamadas útiles** | Llamadas que contribuyen a un resultado validado / llamadas totales | Efectividad de la herramienta |
| **Contribución de latencia MCP** | Duración MCP / duración completa de la ejecución | Impacto de la dependencia |
| **Tasa de fallos de validación de resultados** | Resultados inválidos / llamadas completadas | Problemas de contratos y calidad de datos |

La especificación de MCP define las herramientas como capacidades que los modelos pueden invocar contra sistemas externos; por lo tanto, la telemetría de llamadas debe distinguir entre estados solicitados, autorizados, ejecutados y validados, en lugar de registrar únicamente una solicitud de red.

### 5.3 KPI de eficiencia del agente

| KPI | Fórmula | Interpretación |
|---|---|---|
| **Tasa de éxito del objetivo** | Ejecuciones que cumplen los criterios de aceptación / ejecuciones elegibles | Medida principal de efectividad |
| **Éxito al primer intento** | Ejecuciones exitosas sin reintento, corrección ni transferencia / ejecuciones exitosas | Calidad de planificación y ejecución |
| **Pasos por objetivo exitoso** | Pasos del agente / objetivos exitosos | Eficiencia del razonamiento |
| **Tokens por objetivo exitoso** | Tokens / objetivos exitosos | Eficiencia del modelo |
| **Costo por objetivo exitoso** | Costo total estimado / objetivos exitosos | Eficiencia económica |
| **Tiempo hasta un resultado útil** | Tiempo hasta el primer resultado útil validado | Velocidad percibida por el usuario |
| **Latencia p95 de extremo a extremo** | Percentil 95 de la duración de la ejecución | Experiencia de usuario en cola |
| **Tasa de recuperación** | Fallos recuperados / fallos recuperables | Resiliencia |
| **Tasa de transferencia humana** | Transferencias / ejecuciones iniciadas | Limitaciones de automatización |
| **Tasa de corrección del usuario** | Ejecuciones que requieren corrección / ejecuciones completadas | Brecha de calidad |
| **Tasa de intervención de seguridad** | Acciones riesgosas bloqueadas o escaladas / intentos riesgosos | Efectividad de controles |

Un menor número de pasos no es automáticamente mejor. Optimizar el **costo y la latencia por objetivo exitoso**, asegurando que la corrección y la seguridad permanezcan por encima de sus SLO.

## 6. SLO y umbrales de alerta recomendados

Los objetivos iniciales deben tratarse como hipótesis y recalibrarse después de obtener datos de referencia.

| SLO / alerta | Objetivo inicial |
|---|---:|
| Tasa de finalización de ejecuciones | ≥ 99% |
| Tasa de éxito del objetivo | ≥ 95% para tipos de objetivo estables |
| Latencia de extremo a extremo | p95 ≤ 10 segundos para flujos interactivos |
| Tasa de éxito de herramientas MCP | ≥ 99%, excluyendo denegaciones por política |
| Tasa de tiempo de espera MCP | ≤ 1% |
| Éxito al primer intento | ≥ 80% |
| Tasa de transferencia humana | ≤ 15% para flujos elegibles |
| Tasa de corrección del usuario | ≤ 10% |
| Eventos de datos sensibles sin enmascarar | 0 |

Usar objetivos separados para flujos interactivos, por lotes y de alto riesgo. Realizar seguimiento de presupuestos de error para los SLO de confiabilidad; la disponibilidad no debe ser la única medida de calidad del agente.

## 7. Diseño de paneles

### Panel ejecutivo

- Usuarios activos y utilización recurrente semanal.
- Tasa de éxito de objetivos y tasa de corrección del usuario.
- Tasa de derivación humana.
- Costo por objetivo exitoso.
- Tiempo p95 hasta un resultado útil.
- Intervenciones de seguridad e incidentes sin resolver.

### Panel operativo

- Volumen de ejecuciones y concurrencia.
- Tasas de finalización y fallos.
- Latencia p50/p95/p99 del agente.
- Llamadas MCP por servidor/herramienta.
- Tasas de error, tiempo de espera, denegación y reintento de MCP.
- Tendencias de tokens del modelo y costo estimado.
- Principales tipos de error y versiones de agente afectadas.

### Vista de investigación

- Cascada de trazas para un `agent_run_id`.
- Versión del agente y grupo de despliegue.
- Secuencia de llamadas a herramientas y decisiones de política.
- Cadena de reintentos y alternativas.
- Resultados de validación.
- Enlaces desde exemplars métricos a trazas representativas.

## 8. Contrato de instrumentación para la demostración React

Agregar una interfaz pequeña e independiente del proveedor, por ejemplo:

```javascript
export function createAgentTelemetry(transport) {
  return {
    startRun(context) {
      return transport.startSpan('agent.run', context);
    },
    recordMcpCall(event) {
      transport.increment('mcp_calls_total', {
        server: event.server,
        tool: event.tool,
        outcome: event.outcome,
      });
    },
    recordOutcome(event) {
      transport.increment('agent_success_total', {
        agent: event.agent,
        goalType: event.goalType,
        successType: event.successType,
      });
    },
  };
}
```

El adaptador de producción podrá exportar datos de OpenTelemetry posteriormente. El adaptador de demostración debe escribir únicamente eventos sanitizados en la consola o en un recolector en memoria. Nunca enviar secretos, credenciales, cadenas de conexión, datos completos de cuentas ni payloads de herramientas sin restricciones desde el navegador.

## 9. Gobierno de datos y seguridad

- Clasificar prompts, salidas, argumentos de herramientas y resultados antes de recopilarlos.
- Usar telemetría basada únicamente en metadatos por defecto.
- Enmascarar datos de pagos, identidad, autenticación y cuentas.
- Aplicar hashing o tokenización a identificadores cuando se requiera correlación.
- Cifrar la telemetría en tránsito y en reposo.
- Restringir las trazas sin procesar a operadores autorizados.
- Definir la retención por señal: retención breve para trazas de depuración con payloads y más prolongada para KPI agregados.
- Auditar el acceso a telemetría sensible.
- Incluir `redaction_applied`, `sampling_rate` y `data_classification` en los metadatos del evento.
- Tratar los eventos de autorización y denegación de herramientas como telemetría de seguridad, no solo como errores de aplicación.

## 10. Fases de implementación

### Fase 1: Línea base

1. Definir tipos de objetivos y criterios de aceptación.
2. Agregar `trace_id`, `agent_run_id`, versión del agente, resultado y duración.
3. Registrar cantidad de ejecuciones, tasa de finalización, histogramas de latencia y cantidad de llamadas MCP.
4. Construir el panel operativo.

### Fase 2: Eficiencia y calidad

1. Agregar contabilidad de tokens y costos del modelo.
2. Agregar reintentos, alternativas, fallos de validación y transferencias humanas.
3. Agregar éxito al primer intento, costo por objetivo exitoso y KPI de corrección del usuario.
4. Vincular métricas con trazas mediante exemplars.

### Fase 3: Gobierno y optimización

1. Agregar telemetría de decisiones de política y KPI de seguridad.
2. Introducir controles de muestreo y retención.
3. Establecer SLO y presupuestos de error por clase de flujo de trabajo.
4. Ejecutar experimentos controlados sobre prompts, modelos, selección de herramientas y estrategias de orquestación.

## 11. Cadencia de revisión operativa

- **Diaria:** confiabilidad, latencia, fallos MCP y alertas de seguridad.
- **Semanal:** utilización, costo por objetivo exitoso, utilidad de herramientas y regresiones por versión.
- **Mensual:** adopción, cobertura de automatización, tendencias de calidad, revisión de SLO/presupuesto de error y auditorías de retención/acceso.

## 12. Referencias

1. [Modelo de datos de métricas de OpenTelemetry](https://opentelemetry.io/docs/specs/otel/metrics/data-model/) — métricas, histogramas y exemplars.
2. [Model Context Protocol: Tools](https://modelcontextprotocol.io/specification/2024-11-05/server/tools) — descubrimiento, invocación, resultados y errores de herramientas.
3. [Google SRE: Objetivos de nivel de servicio](https://sre.google/sre-book/service-level-objectives/) — SLI, SLO, percentiles, corrección y presupuestos de error.
4. [Google SRE: Mejores prácticas de servicios](https://sre.google/sre-book/service-best-practices/) — medición centrada en el usuario y resultados de monitoreo.
5. [Google SRE: Fallos en cascada](https://sre.google/sre-book/addressing-cascading-failures/) — latencia de cola, límites de tiempo, reintentos y agotamiento de recursos.

> El KPI central no es “¿cuántas veces actuó el agente?”, sino “¿con qué confiabilidad, seguridad, rapidez y eficiencia económica completó el agente un objetivo valioso para el usuario?”.
