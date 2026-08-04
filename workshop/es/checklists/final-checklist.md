# Lista de verificación final del taller (escenario de agente + MCP)

## Finalización principal
- [ ] Completé los Ejercicios 1–5 en orden (≤45 minutos en total).
- [ ] Mantuve todos los cambios únicamente bajo `/workshop/es`.
- [ ] Mantuve el alcance de prototipo ficticio/estático (no software bancario real).

## Mapeo de la entrega del escenario

### Orquestación del agente principal
- [ ] Definí el alcance de implementación directa en las notas de `workshop/es/exercises/01-triage-and-plan.md`.
- [ ] Identifiqué los límites de delegación para los especialistas de frontend/pruebas/seguridad/documentación.
- [ ] Evité cambios innecesarios o no relacionados.

Guía relacionada:
- [README.md](../../../README.md)
- [docs/agent-ecosystem.md](../../../docs/agent-ecosystem.md)

### Calidad de la implementación acotada
- [ ] Implementé/refiné la interfaz ficticia de Apoyo Comunitario en `workshop/es/starter/app.js`.
- [ ] Mantuve los componentes funcionales, pequeños y accesibles para principiantes.
- [ ] Preservé una estructura accesible y legible en los archivos de inicio.

Guía relacionada:
- [.github/instructions/react-webapp.instructions.md](../../../.github/instructions/react-webapp.instructions.md)

### Gobernanza de MCP y puertas de aprobación
- [ ] Usé `mcp/catalog` y la política de herramientas aprobadas como fuente de verdad.
- [ ] Apliqué el pensamiento de privilegio mínimo y de solo lectura primero.
- [ ] Identifiqué correctamente las acciones que necesitan aprobación humana.

Guía relacionada:
- [mcp/README.md](../../../mcp/README.md)
- [mcp/policies/approved-tools.md](../../../mcp/policies/approved-tools.md)

### Seguridad y entrega final
- [ ] Confirmé que no hay secretos, tokens, contraseñas, cadenas de conexión ni datos personales.
- [ ] Agregué Notas de validación y Notas de entrega concisas en `workshop/es/references/example-solution.md`.
- [ ] Dejé un paquete final fácil de revisar.

## Trabajo adicional opcional (fuera de la ruta principal de 45 minutos)
- [ ] Agregué una acción adicional del escenario y volví a ejecutar el mapeo de decisiones de delegación y gobernanza.
- [ ] Agregué un ejemplo adicional de operación riesgosa y su justificación de puerta de aprobación.
