# Plan empresarial para implementar un Centro de Excelencia de SDLC agéntico

## 1. Misión

Crear un **Centro de Excelencia (CoE)** que escale de forma segura los agentes de IA en todo el ciclo de vida del desarrollo de software: planificación, diseño, codificación, pruebas, seguridad, despliegue y operación, manteniendo la responsabilidad humana sobre las decisiones de negocio y producción.

El CoE debe utilizar el ciclo de vida de gestión de riesgos de IA del NIST —**Gobernar, Mapear, Medir y Gestionar**— como base de gobernanza.

## 2. Modelo operativo objetivo

### Patrocinador ejecutivo

Designar a un ejecutivo responsable, idealmente el **CIO, CTO o Chief Digital Officer**, con autoridad transversal sobre:

- Ingeniería
- Producto
- Seguridad
- Riesgo y cumplimiento
- Legal y privacidad
- Arquitectura
- Experiencia del desarrollador
- Operaciones

### Equipo central del CoE

Comenzar con un equipo reducido:

| Rol | Responsabilidad principal |
|---|---|
| Director del CoE | Estrategia, presupuesto, adopción y reportes ejecutivos |
| Product manager | Hoja de ruta y priorización de casos de uso del SDLC agéntico |
| Arquitecto empresarial | Arquitectura de referencia y estándares de plataforma |
| Líder de seguridad de IA | Modelado de amenazas, controles de acceso y permisos de agentes |
| Líder de experiencia del desarrollador | Herramientas, plantillas, capacitación y adopción |
| Líder de ingeniería de calidad | Automatización de pruebas y estándares de evaluación |
| Representante legal/privacidad | Datos, propiedad intelectual, regulación y evaluación de proveedores |
| Líder de gestión del cambio | Comunicaciones, capacitación y comunidad de práctica |

Cada dominio de producto debe incorporar **referentes de IA** que apliquen localmente los estándares del CoE.

## 3. Principios de gobernanza

Adoptar los siguientes principios como política empresarial:

1. La responsabilidad humana sigue siendo obligatoria.
2. Los agentes reciben acceso con el principio de mínimo privilegio.
3. Ningún agente puede aprobar y desplegar de forma independiente cambios de alto riesgo en producción.
4. Todas las acciones de los agentes deben ser atribuibles, registradas y auditables.
5. Los datos sensibles y secretos no deben enviarse a modelos no aprobados.
6. El código generado se considera no confiable hasta que sea revisado y probado.
7. Las verificaciones de seguridad, privacidad, accesibilidad y cumplimiento siguen formando parte del SDLC.
8. Los agentes deben evaluarse mediante resultados medibles, no por novedad.
9. Los equipos pueden extender la plataforma solo dentro de controles aprobados.
10. Las políticas deben versionarse y revisarse periódicamente para evitar desviaciones de gobernanza.

## 4. Modelo de referencia del SDLC agéntico

### Planificar

Los agentes pueden:

- Convertir solicitudes de negocio en épicas, historias y criterios de aceptación.
- Identificar dependencias y sistemas afectados.
- Detectar requisitos duplicados o contradictorios.
- Elaborar estimaciones y planes iniciales de implementación.

**Control humano:** el product owner aprueba el alcance, la prioridad y los criterios de aceptación.

### Diseñar

Los agentes pueden:

- Generar alternativas de arquitectura.
- Identificar impactos en API, datos e integraciones.
- Preparar modelos de amenazas y registros de decisiones.
- Verificar los diseños frente a los estándares empresariales.

**Control humano:** el arquitecto y el responsable de seguridad aprueban las decisiones de diseño relevantes.

### Construir

Los agentes pueden:

- Generar código y pruebas.
- Refactorizar dentro de ámbitos acotados.
- Actualizar dependencias.
- Explicar código desconocido.
- Crear pull requests y borradores de documentación.

**Control humano:** revisión de código obligatoria y protección de ramas.

### Verificar

Los agentes pueden:

- Generar pruebas unitarias, de integración y regresión.
- Analizar fallos de pruebas.
- Ejecutar análisis estático.
- Detectar posibles problemas de seguridad y accesibilidad.
- Resumir evidencias de prueba.

**Control humano:** las puertas de calidad deben seguir siendo deterministas y basadas en herramientas; los agentes no pueden certificar su propio trabajo.

### Liberar

Los agentes pueden:

- Preparar notas de versión.
- Validar requisitos previos de despliegue.
- Generar planes de reversión.
- Analizar el riesgo de los cambios.
- Recomendar ventanas de despliegue.

**Control humano:** aprobación de producción, segregación de funciones y autorización del cambio.

### Operar

Los agentes pueden:

- Clasificar incidentes.
- Correlacionar registros y alertas.
- Sugerir remediaciones.
- Preparar informes posteriores a incidentes.
- Detectar problemas operativos recurrentes.

**Control humano:** inicialmente, la remediación autónoma debe limitarse a acciones reversibles y de bajo riesgo.

## 5. Capacidades de la plataforma empresarial

### Registro de agentes

Para cada agente se debe registrar:

- Responsable y propósito de negocio.
- Repositorios y entornos aprobados.
- Dependencias de modelos y herramientas.
- Clasificación de datos.
- Permisos.
- Nivel de riesgo.
- Resultados de evaluación.
- Historial de versiones.
- Fecha de retiro.

### Entorno de ejecución seguro

Debe proporcionar:

- Ejecución aislada.
- Credenciales de corta duración.
- Listas permitidas de repositorios y entornos.
- Controles de salida de red.
- Integración con un gestor de secretos.
- Puntos de aprobación humana.
- Registro completo de auditoría.

### Controles estándar de repositorios

Publicar plantillas reutilizables para:

- Protección de ramas.
- Revisiones de pull requests.
- Puertas de calidad en CI/CD.
- Análisis de dependencias.
- Detección de secretos.
- Análisis de composición de software.
- Generación de SBOM.
- Verificaciones de políticas de infraestructura.
- Pruebas de accesibilidad.
- Instrucciones para agentes y estándares de contribución.

### Marco de evaluación

Todo agente de producción debe evaluarse en:

- Tasa de finalización de tareas.
- Precisión.
- Tasa de regresiones.
- Hallazgos de seguridad.
- Tasa de cambios no sustentados o alucinaciones.
- Costo por tarea completada.
- Tasa de intervención humana.
- Tiempo medio de resolución.
- Satisfacción de los desarrolladores.

Incluir riesgos como inyección de prompts, manejo inseguro de salidas, agencia excesiva y divulgación de información sensible.

## 6. Hoja de ruta de implementación

### Fase 0 — Movilizar
**17 de agosto–11 de septiembre de 2026**

Entregables:

- Estatuto ejecutivo.
- Integrantes del CoE y derechos de decisión.
- Evaluación del estado actual.
- Inventario de herramientas, agentes, modelos y proveedores de IA.
- Modelo de clasificación de riesgos.
- Candidatos aprobados para pilotos.
- Métricas iniciales.

Utilizar **`whsalazar-org/banco-chile-demo`** como piloto inicial de bajo riesgo. Es una aplicación web pequeña de React/JavaScript con HTML y CSS. Comenzar con documentación, generación de pruebas, verificaciones de accesibilidad, revisión de dependencias y asistencia en pull requests; no iniciar con despliegue autónomo en producción.

### Fase 1 — Establecer controles
**14 de septiembre–30 de octubre de 2026**

Entregables:

- Política empresarial de IA y agentes.
- Reglas de clasificación de datos.
- Modelo de control de acceso de agentes.
- Catálogo de modelos y proveedores aprobados.
- Registro de agentes.
- Requisitos de registro y auditoría.
- Controles estándar de pull requests y CI/CD.
- Plan de capacitación para desarrolladores.

### Fase 2 — Pilotar agentes controlados
**2 de noviembre de 2026–29 de enero de 2027**

Ejecutar entre tres y cinco pilotos:

1. Agente de mantenimiento de código: gestiona incidencias pequeñas y crea pull requests en borrador.
2. Agente de generación de pruebas: agrega pruebas sujeto a cobertura y pruebas de mutación.
3. Agente de clasificación de seguridad: clasifica hallazgos y propone correcciones sin ocultarlos.
4. Agente de documentación: mantiene sincronizada la documentación de API, arquitectura e incorporación.
5. Agente de asistencia ante incidentes: resume la telemetría y propone remediaciones para aprobación humana.

Cada piloto debe tener una línea base, nivel de riesgo, alcance limitado, responsable humano, mecanismo de reversión, umbral de éxito y decisión documentada de escalar, modificar o detener.

### Fase 3 — Escalar por dominio
**1 de febrero–30 de abril de 2027**

Entregables:

- Manual de incorporación de dominios.
- Plantillas reutilizables de agentes.
- Integraciones de herramientas aprobadas.
- Conjuntos de datos de evaluación compartidos.
- Catálogo interno de agentes.
- Comunidad de práctica.
- Objetivos de nivel de servicio del CoE.
- Revisiones trimestrales de riesgo y valor.

Escalar únicamente los agentes que demuestren mejoras medibles sin degradación inaceptable de seguridad, calidad o cumplimiento.

### Fase 4 — Optimizar e institucionalizar
**3 de mayo–6 de agosto de 2027**

Entregables:

- Revisión del portafolio empresarial de agentes.
- Optimización de costos y modelos.
- Evaluación continua en CI/CD.
- Reportes automatizados de cumplimiento de políticas.
- Proceso de retiro de agentes.
- Marco actualizado de roles y habilidades.
- Evaluación anual independiente de seguridad.
- Reportes de riesgo y valor para la dirección.

## 7. Modelo de niveles de riesgo

| Nivel | Ejemplo | Controles requeridos |
|---|---|---|
| 1 — Asistivo | Documentación y explicación de código | Revisión del usuario y registro estándar |
| 2 — Cambio acotado | Pull requests en borrador y generación de pruebas | Aislamiento, puertas de CI y revisión obligatoria |
| 3 — Sensible | Correcciones de seguridad y sistemas con datos regulados | Aprobación de seguridad, auditoría ampliada y datos restringidos |
| 4 — Alto impacto | Cambios en producción y decisiones financieras o de clientes | Autorización humana explícita, segregación de funciones y validación independiente |
| 5 — Inicialmente prohibido | Despliegue autónomo no revisado o acciones empresariales irreversibles | No permitido durante la implementación inicial |

## 8. Métricas y puertas de decisión

### Productividad

- Tiempo de entrega de cambios.
- Tiempo de ciclo de pull requests.
- Frecuencia de despliegue.
- Tasa de retrabajo.
- Tiempo de desarrollo ahorrado.

### Calidad

- Tasa de defectos escapados.
- Tasa de fallos de cambios.
- Cobertura de pruebas y puntuación de mutación.
- Frecuencia de reversiones.
- Tasa de rechazo en revisiones.

### Seguridad y cumplimiento

- Vulnerabilidades introducidas por cambios de agentes.
- Incidentes de secretos y datos sensibles.
- Excepciones de políticas.
- Llamadas no autorizadas a herramientas.
- Integridad de los registros de auditoría.

### Adopción y economía

- Usuarios y equipos activos.
- Tareas completadas por agentes.
- Costo por tarea.
- Tasa de intervención humana.
- Satisfacción de usuarios.
- Finalización de capacitaciones.

Utilizar métricas de entrega al estilo DORA como indicadores de resultados, pero no considerar un aumento del rendimiento como éxito si empeoran la calidad, la confiabilidad o el bienestar de los desarrolladores.

## 9. Backlog recomendado para los primeros 90 días

1. Aprobar el estatuto del CoE.
2. Definir niveles de riesgo empresarial y usos prohibidos.
3. Inventariar herramientas y agentes de IA.
4. Establecer políticas de datos y modelos aprobados.
5. Crear un ámbito seguro de GitHub para pilotos.
6. Agregar instrucciones para agentes y estándares de contribución al repositorio.
7. Configurar protección de ramas y verificaciones de CI obligatorias.
8. Pilotar agentes de documentación, pruebas, accesibilidad y dependencias en `banco-chile-demo`.
9. Establecer métricas iniciales de entrega y calidad.
10. Realizar una revisión de seguridad usando NIST AI RMF y la guía de OWASP.
11. Publicar un curso de capacitación para desarrolladores.
12. Presentar una decisión de escalar o detener ante el comité directivo.

## 10. Definición de éxito después de un año

El CoE será exitoso cuando:

- Los agentes estén disponibles mediante una plataforma empresarial gobernada.
- Cada agente de producción tenga responsable, nivel de riesgo, permisos, registro de evaluación y trazabilidad.
- Los equipos puedan incorporar un agente aprobado en días, no meses.
- Los pilotos demuestren mejoras medibles sin aumentar los defectos escapados ni los incidentes de seguridad.
- Los desarrolladores sepan cuándo utilizar agentes y cuándo es obligatorio el criterio humano.
- El comportamiento autónomo de alto riesgo esté técnicamente restringido, no solo prohibido mediante políticas.
