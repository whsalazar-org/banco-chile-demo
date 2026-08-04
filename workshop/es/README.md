# Taller de 45 minutos: flujo de trabajo real con agentes + MCP (Banco Vecinal ficticio)

> **Importante:** Este taller crea un **prototipo estático ficticio** y una simulación de flujo de trabajo. **No** es una aplicación bancaria real.

Este taller se centra en un escenario de entrega realista: eres el **agente principal** que entrega una pequeña actualización ficticia de un sitio web, usando correctamente especialistas personalizados y la gobernanza de MCP.

## Escenario

Recibiste una solicitud para publicar una página sencilla de “Apoyo Comunitario” para el **Banco Vecinal** ficticio. Debes entregar la página de forma rápida, segura y con la delegación/gobernanza adecuada:
- Mantén la implementación pequeña y accesible para principiantes.
- Delega tareas específicas a los especialistas correctos.
- Usa la política/catálogo de MCP como fuente de verdad.
- Evita operaciones inseguras y capacidades no aprobadas.

## Requisitos previos

### Aprendiz
- Clon local de este repositorio.
- Capacidad de leer/editar archivos.
- Lee estos documentos fuente de verdad:
  - [`README.md`](../../README.md)
  - [`docs/agent-ecosystem.md`](../../docs/agent-ecosystem.md)
  - [`mcp/README.md`](../../mcp/README.md)
  - [`mcp/policies/approved-tools.md`](../../mcp/policies/approved-tools.md)

### Facilitador
- Mantén la sesión en la ruta principal (≤45 minutos).
- Invita a los aprendices a explicar las decisiones de delegación y aprobación, no solo el resultado en pantalla.

---

## Cronograma de la ruta principal (45 minutos en total)

1. Ejercicio 1 — Clasificar la solicitud y diseñar un plan de ejecución (8 min)
2. Ejercicio 2 — Implementar la interfaz acotada como agente principal (10 min)
3. Ejercicio 3 — Delegar en especialistas personalizados (9 min)
4. Ejercicio 4 — Decisiones de política MCP y puertas de aprobación (8 min)
5. Ejercicio 5 — Revisión final de seguridad/documentación y entrega (10 min)

**Duración total estimada: 45 minutos**

---

## Archivos del taller (todos bajo `/workshop/es`)

- [`starter/index.html`](./starter/index.html)
- [`starter/styles.css`](./starter/styles.css)
- [`starter/app.js`](./starter/app.js)
- [`exercises/01-triage-and-plan.md`](./exercises/01-triage-and-plan.md)
- [`exercises/02-primary-agent-implementation.md`](./exercises/02-primary-agent-implementation.md)
- [`exercises/03-specialist-delegation.md`](./exercises/03-specialist-delegation.md)
- [`exercises/04-mcp-governance-gates.md`](./exercises/04-mcp-governance-gates.md)
- [`exercises/05-final-review-and-handoff.md`](./exercises/05-final-review-and-handoff.md)
- [`checklists/final-checklist.md`](./checklists/final-checklist.md)
- [`references/example-solution.md`](./references/example-solution.md)

---

## Uso responsable de Copilot en este escenario

Usa especialistas cuando los límites de la tarea sean claros:
- **frontend-specialist**: mejoras específicas de interfaz/accesibilidad.
- **test-specialist**: estrategia práctica de validación y orientación sobre capacidad de prueba.
- **security-reviewer**: manejo de secretos, permisos y verificaciones de operaciones riesgosas.
- **documentation-specialist**: redacción concisa de la documentación final y la entrega.

Usa las reglas de gobernanza de MCP antes de actuar:
- Verifica el ámbito de servidores/herramientas aprobados en [`mcp/catalog/`](../../mcp/catalog/).
- Confirma las restricciones de la política en [`mcp/policies/approved-tools.md`](../../mcp/policies/approved-tools.md).
- Prefiere el privilegio mínimo y las operaciones de solo lectura de forma predeterminada.
- Exige aprobación humana para operaciones de escritura, destructivas o con impacto en producción.

---

## Ejecuta el taller

Complétalo en orden:
1. [Ejercicio 1: Clasificar y planificar](./exercises/01-triage-and-plan.md)
2. [Ejercicio 2: Implementación como agente principal](./exercises/02-primary-agent-implementation.md)
3. [Ejercicio 3: Delegación en especialistas](./exercises/03-specialist-delegation.md)
4. [Ejercicio 4: Puertas de gobernanza de MCP](./exercises/04-mcp-governance-gates.md)
5. [Ejercicio 5: Revisión final y entrega](./exercises/05-final-review-and-handoff.md)

Luego finaliza:
- [Lista de verificación final](./checklists/final-checklist.md)
- [Resultado de referencia](./references/example-solution.md)

---

## Trabajo adicional opcional (fuera de la ruta principal de 45 minutos)

- Agrega una segunda sección de página ficticia y justifica nuevamente los límites de delegación.
- Amplía las notas de puertas de aprobación con un ejemplo adicional de acción de alto riesgo.
- Mejora la redacción de la entrega con la retroalimentación del documentation-specialist.
