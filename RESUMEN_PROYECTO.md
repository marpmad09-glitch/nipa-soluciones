# Resumen del proyecto — NIPA SOLUCIONES

## Objetivo

Construir una aplicación web local para diagnóstico rápido, registro y seguimiento de mantenimiento de equipos de cómputo.

## Usuario principal

Técnico de soporte o encargado de taller que necesita:

1. Identificar el problema más probable.
2. Consultar causa técnica y protocolo de verificación.
3. Registrar el equipo atendido.
4. Llevar notas y estado del servicio.

## Casos cubiertos

La primera versión incluye los diez casos de la matriz CSV:

- Equipo que no enciende.
- Sobrecalentamiento y apagado súbito.
- Reinicios bajo carga.
- Sin imagen por memoria.
- Bucle de encendido en fuente ATX.
- Puerto de carga sin funcionar.
- Disco o arranque intermitente.
- Puertos USB afectados por sobrevoltaje.
- BSOD relacionado con suministro eléctrico.
- Ruido y suciedad en sistema térmico.

## Arquitectura inicial

- HTML: estructura semántica y modales.
- CSS: diseño responsive sin dependencias.
- JavaScript: datos, filtros, registros y almacenamiento local.
- Persistencia: `localStorage` del navegador.
- Exportación: JSON descargable.

## Modelo de datos

### Equipo

- Identificador.
- Nombre o etiqueta.
- Marca y modelo.
- Número de serie.
- Propietario.
- Tipo y estado.
- Notas.
- Fecha de actualización.

### Evento de seguimiento

- Identificador.
- Equipo relacionado.
- Nombre del equipo.
- Nota de intervención.
- Fecha y hora.

## Límites conocidos

- No existe backend ni autenticación.
- Los datos permanecen en el navegador donde se crean.
- No sincroniza entre dispositivos.
- La matriz diagnóstica es orientativa y no reemplaza mediciones técnicas.
