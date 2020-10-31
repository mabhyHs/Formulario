/*Hidden Forms*/
function optionsPlaces() {
    let sedeForm = document.getElementById('modality');
    let hiddenForm = document.getElementById('sedeHidden');
    if (sedeForm.value === "presencial") {
        hiddenForm.style.display = "block";
    } else {
        hiddenForm.style.display = "none"
    }
}


function showOptionsHidden() {
    let avaialableCourses = document.getElementById('courses').value;

    let codeLanguaje = document.getElementById('codeLanguaje');
    let teacherIt = document.getElementById('itTeacher');
    let algebraTeachers = document.getElementById('algebraTeacher');
    let englishTeacher = document.getElementById('englishTeacher');

    if (avaialableCourses === "Informática") {
        codeLanguaje.style.display = "block";
        teacherIt.style.display = "block";

    } else {
        codeLanguaje.style.display = "none";
        teacherIt.style.display = "none";
    }

    if (avaialableCourses === "Álgebra") {
        algebraTeachers.style.display = "block";

    } else {
        algebraTeachers.style.display = "none";
    }

    if (avaialableCourses === "Inglés") {
        englishTeacher.style.display = "block";
    } else {
        englishTeacher.style.display = "none";
    }

}

// Campos del formulario
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const telephoneInput = document.querySelector('#telephone');
const dniInput = document.querySelector('#dni');
const mailInput = document.querySelector('#mail');

const coursesInput = document.querySelector('#courses');
const shiftInput = document.querySelector('#shift');
const modalityInput = document.querySelector('#modality');
const sedeInput = document.querySelector('#sede');




// UI
const formulario = document.querySelector('#applicationForm');
const contenedorenrolled = document.querySelector('#enrolled');
const heading = document.querySelector('#listEnrolledTitle');

let DB;
let editing;

window.onload = () => {
    eventListeners();

    createDB();
}

function eventListeners() {
    firstNameInput.addEventListener('input', dataRegistered);
    lastNameInput.addEventListener('input', dataRegistered);
    telephoneInput.addEventListener('input', dataRegistered);
    dniInput.addEventListener('input', dataRegistered);
    mailInput.addEventListener('input', dataRegistered);

    coursesInput.addEventListener('change', dataRegistered);
    shiftInput.addEventListener('change', dataRegistered);
    modalityInput.addEventListener('change', dataRegistered);
    sedeInput.addEventListener('change', dataRegistered);

    formulario.addEventListener('submit', newRegistration);
}

// Objeto con la información del inscripto 
const inscriptionObj = {
    firstName: '',
    lastName: '',
    telephone: '',
    dni: '',
    mail: '',
    courses: '',
    shift: '',
    modality: '',
    sede: ''

}


// Agrega datos al objeto enrolled
function dataRegistered(e) {
    inscriptionObj[e.target.name] = e.target.value;
}

class Student {
    constructor() {
        this.enrolled = [];
    }

    addEnroll(enroll) {
        this.enrolled = [...this.enrolled, enroll];
    }

    deleteEnrolled(id) {
        this.enrolled = this.enrolled.filter(enroll => enroll.id !== id)
    }

    editEnrolled(updatedRegistration) {
        this.enrolled = this.enrolled.map(enroll => enroll.id === updatedRegistration.id ? updatedRegistration : enroll);
    }

}

class UI {
    constructor({ enrolled }) {
        this.textoHeading(enrolled);
    }

    printAlert(message, tipo) {
        // Crear el div
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMessage.classList.add('alert-danger');
        } else {
            divMessage.classList.add('alert-success');
        }

        // Mensaje de error
        divMessage.textContent = message;

        // Agregar al DOM
        document.querySelector('#container').insertBefore(divMessage, document.querySelector('.inscriptionMessage'));

        // Quitar la alerta después de 3 segundos
        setTimeout(() => {
            divMessage.remove();
        }, 3000);
    }

    printEnrolled() {

        this.limpiarHTML();

        this.textoHeading(enrolled);

        const objectStore = DB.transaction('enrolled').objectStore('enrolled');

        const fnTextoHeading = this.textoHeading;

        const total = objectStore.count();
        total.onsuccess = function() {
            fnTextoHeading(total.result)
        }

        objectStore.openCursor().onsuccess = function(e) {

            const cursor = e.target.result;

            if (cursor) {
                const { firstName, lastName, telephone, dni, mail, id, courses, shift, modality, sede } = cursor.value;

                const divRegistration = document.createElement('div');
                divRegistration.classList.add('enrolled', 'p-3');
                divRegistration.dataset.id = id;

                // Scripting de los elementos enrolled
                const fullName = document.createElement('h2');
                fullName.innerHTML = `
               <span class="font-weight-bolder" data-toggle="tooltip" data-placement="top" title="DNI:${dni} Teléfono:${telephone}">
                ${lastName} ${firstName}
                </span>
            `;
                const courseParrafo = document.createElement('p');
                courseParrafo.innerHTML = `
               <span  class="font-weight-bolder">Curso:</span><span data-toggle="tooltip" data-placement="top" title="Turno: ${shift}\n Modalidad: ${modality}\n Sede: ${sede}">
                ${courses}
               </span>
            `;
                const mailParrafo = document.createElement('p');
                mailParrafo.innerHTML = `
                <span class="font-weight-bolder">E-mail:</span>${mail} 
            
            `;




                // Boton para eliminar esta inscripcion
                const btnEliminar = document.createElement('button');
                btnEliminar.onclick = () => deleteEnrolled(id);
                btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
                btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';


                // Añade un botón para editar
                const btnEdit = document.createElement('button');
                const enrolled = cursor.value;
                btnEdit.onclick = () => loadEdition(enrolled);

                btnEdit.classList.add('btn', 'btn-info');
                btnEdit.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';



                // Agregar los parrafos al divRegistration
                divRegistration.appendChild(fullName);
                divRegistration.appendChild(courseParrafo);
                divRegistration.appendChild(mailParrafo);
                divRegistration.appendChild(btnEliminar);
                divRegistration.appendChild(btnEdit);

                // agregar las inscripciones al HTML
                contenedorenrolled.appendChild(divRegistration);

                cursor.continue();
            }
        }
    }
    textoHeading(resultado) {
        if (resultado > 0) {
            heading.textContent = 'Lista de Inscriptos '
        } else {
            heading.textContent = 'No hay inscriptos aún, Inscribite'
        }
    }

    limpiarHTML() {
        while (contenedorenrolled.firstChild) {
            contenedorenrolled.removeChild(contenedorenrolled.firstChild)
        }
    }
}
const manageEnrolled = new Student();
const ui = new UI(manageEnrolled);



// Valida y agrega un inscripto a la clase
function newRegistration(e) {
    e.preventDefault();

    // Extraer la información del objeto inscription
    const { firstName, lastName, telephone, dni, mail, courses } = inscriptionObj;

    // validar
    if (firstName === '' || lastName === '' || telephone === '' || dni === '' || mail === '' || courses === '') {
        ui.printAlert('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editing) {
        ui.printAlert('Editado Correctamente');

        // Pasar el objeto inscription a edición
        manageEnrolled.editEnrolled({...inscriptionObj });

        // Edita en IndexDB
        const transaction = DB.transaction(['enrolled'], 'readwrite');
        const objectStore = transaction.objectStore('enrolled');

        objectStore.put(inscriptionObj);

        transaction.oncomplete = () => {
            ui.printAlert('Guardado Correctamente');

            formulario.querySelector('button[type="submit"]').textContent = 'Inscribirse';

            // Quitar modo edición
            editing = false;
        }
        transaction.onerror = () => {
            console.log('Hubo un error');
        }

    } else {
        // generar un id único
        inscriptionObj.id = Date.now();

        // Creando una nueva inscripcion.
        manageEnrolled.addEnroll({...inscriptionObj });

        // Insertar Registro en IndexedDB
        const transaction = DB.transaction(['enrolled'], 'readwrite');

        // Habilitar el objectstore
        const objectStore = transaction.objectStore('enrolled');
        // Insertar en la BD
        objectStore.add(inscriptionObj);

        transaction.oncomplete = function() {
            console.log('inscripto agregado');

            ui.printAlert('Se agregó correctamente');
        }

    }
    // Mostrar en el HTML los inscriptos
    ui.printEnrolled();

    // Reiniciar el objeto para la validación
    reiniciarObjeto();

    // Reiniciar el formulario
    formulario.reset();


}

function reiniciarObjeto() {
    inscriptionObj.firstName = '';
    inscriptionObj.lastName = '';
    inscriptionObj.telephone = '';
    inscriptionObj.dni = '';
    inscriptionObj.mail = '';
    inscriptionObj.courses = '';
    inscriptionObj.shift = '';
    inscriptionObj.modality = '';
    inscriptionObj.sede = '';

}


function deleteEnrolled(id) {
    const transaction = DB.transaction(['enrolled'], 'readwrite');
    const objectStore = transaction.objectStore('enrolled');

    objectStore.delete(id);

    transaction.oncomplete = () => {
        console.log(`Inscripto ${id} eliminado...`);
        ui.printEnrolled();
    }

    transaction.onerror = () => {
        console.log('Hubo un error');
    }
}

// Carga los datos y el modo edición
function loadEdition(enrolled) {
    const { firstName, lastName, telephone, dni, mail, id, courses, shift, modality, sede } = enrolled;

    // Llenar los inputs
    firstNameInput.value = firstName;
    lastNameInput.value = lastName;
    telephoneInput.value = telephone;
    dniInput.value = dni;
    mailInput.value = mail;
    coursesInput.value = courses;
    shiftInput.value = shift;
    modalityInput.value = modality;
    sedeInput.value = sede;



    // Llenar el objeto
    inscriptionObj.firstName = firstName;
    inscriptionObj.lastName = lastName;
    inscriptionObj.telephone = telephone;
    inscriptionObj.dni = dni;
    inscriptionObj.mail = mail;
    inscriptionObj.id = id;
    inscriptionObj.courses = courses;
    inscriptionObj.shift = shift;
    inscriptionObj.modality = modality;
    inscriptionObj.sede = sede;


    // Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editing = true;

}

function createDB() {
    // crear bd version 1.0
    const createDB = window.indexedDB.open('enrolled', 1);

    // Si hay un error
    createDB.onerror = function() {
        console.log('Hubo un error');
    }

    // si todo sale bien
    createDB.onsuccess = function() {
        console.log('BD Creada');

        DB = createDB.result;

        // Mostrar inscriptos al cargar
        ui.printEnrolled();
    }

    // schema
    createDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('enrolled', {
            keyPath: 'id',
            autoIncrement: true
        });

        // Definir todas las columnas
        objectStore.createIndex('firstName', 'firstName', { unique: false });
        objectStore.createIndex('lastName', 'lastName', { unique: false });
        objectStore.createIndex('telephone', 'telephone', { unique: false });
        objectStore.createIndex('dni', 'dni', { unique: true });
        objectStore.createIndex('mail', 'mail', { unique: true });
        objectStore.createIndex('courses', 'courses', { unique: false });
        objectStore.createIndex('shift', 'shift', { unique: false });
        objectStore.createIndex('modality', 'modality', { unique: false });
        objectStore.createIndex('sede', 'sede', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log('DB Creada y Lista');
    }


}