## Description
Se solicita desarrollar una página web que permita realizar la inscripción de alumnos a distintos cursos que se dictan.

Cada alumno deberá completar, mediante un formulario, sus datos personales para realizar la inscripción:
* Nombre (*)
* Apellido (*)
* DNI (*)
* Número de Celular
* Email (*)

(*) Campos obligatorios

A su vez, deberá seleccionar el curso al que desea inscribirse, el cual puede solicitar datos específicos para su correcta inscripción (**el curso es obligatorio para la inscripción**):

Algebra:
* Turno (Mañana, Tarde, Noche)
* Modalidad (En línea, Presencial)
* Sede (Debe aparecer si es presencial)
* Titular (Profesor/a de la materia)
* Auxiliar

Inglés:
* Turno (Mañana, Tarde, Noche)
* Modalidad (En línea, Presencial)
* Sede (Debe aparecer si es presencial)
* Titular (Profesor/a de la materia)

Informática:
* Turno (Mañana, Tarde, Noche)
* Modalidad (En línea, Presencial)
* Sede (Debe aparecer si es presencial)
* Titular (Profesor/a de la materia)
* Lenguaje (Lenguaje de programación que se enseña)

La aplicación deberá permitir visualizar el listado de estudiantes inscriptos (Nombre Completo, email, curso), con una cabecera con filtros para aplicar al listado (curso, turno, modalidad).

Cada una de las filas del listado tendrá dos botones para editar y eliminar, al editar se podría cargar la información en el formulario de alta y luego dar la posibilidad de actualizar ese registro.

Al pasar el mouse sobre el “Nombre Completo” deberá aparecer un tooltip con la información del DNI y Número de Celular.

Al pasar el mouse sobre el curso deberá aparecer un tooltip con la información del turno, modalidad y sede.

El formulario posee varios campos obligatorios (*), los cuales, si no se completan, no se debería permitir la inscripción al curso.

Tener en cuenta que la web debe poder accederse desde PC o desde dispositivos móviles.
