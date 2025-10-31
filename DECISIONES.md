Proyecto: Mini Liga Express (Seed)

Autor: J. Litardo
Descripción: Implementación de un sistema mínimo funcional para gestión de una mini liga de fútbol (equipos, partidos, resultados y tabla de posiciones).
Tecnologías: Laravel (backend) + Angular (frontend).

Decisiones de diseño

1.- Arquitectura general

Se usó Laravel 11 para el backend por su rapidez de scaffolding, validaciones robustas y ORM (Eloquent) para manipular datos fácilmente.

Se expone una API RESTful con endpoints /teams, /matches y /standings.

El frontend se desarrollará en Angular 17, estructurado bajo /web, con componentes por feature (teams, standings) y servicio centralizado api.service.ts.

No se incluye autenticación; el objetivo es un MVP funcional con flujo completo de datos.

2.- Base de datos

Se utiliza MySQL (aunque compatible con SQLite en local).

Tablas:

teams: equipos con goles a favor/en contra.

games: partidos con referencia a dos equipos.

La tabla de posiciones se genera dinámicamente a partir de los resultados registrados.

3.- API / Endpoints
Endpoint	                Método	    Descripción
/api/teams	                GET	        Lista todos los equipos
/api/teams	                POST	    Crea un nuevo equipo
/api/matches/{id}/result	POST	    Registra o actualiza resultado de un partido
/api/standings	            GET	        Devuelve tabla de posiciones

4.- Trade-offs

Simplicidad sobre complejidad: se evitó sobreingeniería (no se implementó autenticación ni control avanzado de fixtures).

Sin migraciones automáticas: se priorizó la claridad sobre el uso de factories/seeders avanzados.

Validación básica: el backend valida los datos mínimos requeridos para el MVP; no incluye reglas de negocio avanzadas (p.ej., evitar duplicidad de partidos).

Frontend liviano: Angular fue usado solo con lo necesario (sin ngrx, sin módulos adicionales).

5.- Flujo de desarrollo Git

Rama principal: main → contiene backend Laravel estable.

Rama feature: feature/frontend-init → contiene Angular + integración API.

Se planean 2 Pull Requests:

MVP backend + endpoints

Frontend funcional + tabla y resultados

