import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, push, ref, remove, onValue, update } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAczBzL80MoEe8qm91CCHHxX-_8iAla-S8",
    authDomain: "service-city-app.firebaseapp.com",
    projectId: "service-city-app",
    storageBucket: "service-city-app.appspot.com",
    messagingSenderId: "1068099519430",
    appId: "1:1068099519430:web:a896e65c893c36d833a8c7",
    databaseURL: "https://service-city-app-default-rtdb.firebaseio.com/",
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const tabla = document.getElementById("tableroChorrera");
    const submitBtn = document.getElementById("submitForm-btn");
    const itemsPerPage = 20; // Número de elementos por página
    let currentPage = 1; // Página actual
    let isSubmitting = false;

    // Evento para enviar el formulario
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        console.log("Evento submit está funcionando"); // Agregar este console.log

        if (!isSubmitting) {
            isSubmitting = true; // Bloquea el formulario

            const unidadInput = document.getElementById("validationCustom01").value;
            const estadoInput = document.getElementById("validationCustom04").value;

            // Verifica que los campos no estén vacíos
            if (unidadInput.trim() !== "" && estadoInput.trim() !== "") {
                // Crear un nuevo objeto con los datos a guardar
                const nuevoRegistro = {
                    unidad: unidadInput,
                    estado: estadoInput
                };

                // Obtener una referencia a la ubicación en la base de datos donde se guardarán los datos
                const referenciaUnidades = ref(database, "unidades");

                // Agregar datos a la base de datos
                push(referenciaUnidades, nuevoRegistro)
                    .then(() => {
                        // Limpia los campos del formulario
                        form.reset();
                        // Desbloquea el formulario después de 5 segundos
                        setTimeout(() => {
                            isSubmitting = false;
                        }, 5000);
                        // Recarga la página después de enviar el formulario
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    })
                    .catch(error => {
                        console.error("Error al enviar datos a la base de datos:", error);
                    });
            } else {
                alert("Por favor completa todos los campos.");
            }
        } else {
            alert("Ya se está enviando un formulario. Por favor espera unos momentos antes de intentar de nuevo.");
        }
    });

    // Función para mostrar los datos en la tabla
    function mostrarDatos() {
        // Vacía la tabla antes de agregar los nuevos datos
        tabla.innerHTML = "";

        // Obtén los datos de la base de datos
        onValue(ref(database, "unidades"), snapshot => {
            const data = [];
            snapshot.forEach(childSnapshot => {
                data.push({ id: childSnapshot.key, ...childSnapshot.val() });
            });

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = data.slice(startIndex, endIndex);

            
        // Inicializa el contador de fila
        let filaNumero = startIndex + 1;

            paginatedData.forEach(childData => {
                const row = `
                <tr>
                    <td>${filaNumero++}</td>
                    <td>${childData.unidad}</td>
                    <td>${childData.estado}</td>
                    <td>
                        <select class="form-select estado-select" data-id="${childData.id}">
                            <option ${childData.estado === 'Pendiente' ? 'selected' : ''}>Espera</option>
                            <option ${childData.estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                            <option ${childData.estado === 'En pesa' ? 'selected' : ''}>En pesa</option>
                            <option ${childData.estado === 'Llenó' ? 'selected' : ''}>Llenó</option>
                            <option ${childData.estado === 'Apoyo' ? 'selected' : ''}>Apoyo</option>
                            <option ${childData.estado === 'Taller' ? 'selected' : ''}>Taller</option>
                            <option ${childData.estado === 'Pidio Permiso' ? 'selected' : ''}>Permiso</option>
                            <option ${childData.estado === 'Revision X' ? 'selected' : ''}>Revision X</option>
                            <option ${childData.estado === 'Revision 2X' ? 'selected' : ''}>Revision 2X</option>
                            <option ${childData.estado === 'Revision 3X' ? 'selected' : ''}>Revision 3X</option>
                            <option ${childData.estado === 'Revision 4X' ? 'selected' : ''}>Revision 4X</option>
                        </select>
                    </td>
                    <td>
                    <button type="button" class="button delete-btn" data-id="${childData.id}">
                        <i class="bi bi-journal-x"></i>
                    </button>
                    </td>
                </tr>
                `;
                tabla.innerHTML += row;
            });
        });
    }

    // Mostrar datos al cargar la página
    mostrarDatos();

    // Evento para actualizar el estado al cambiar el select
    tabla.addEventListener("change", function (event) {
        if (event.target.classList.contains("estado-select")) {
            const confirmar = confirm("¿Estás seguro de que deseas cambiar el estado?");
            if (confirmar) {
                const id = event.target.getAttribute("data-id");
                const nuevoEstado = event.target.value;
                update(ref(database, `unidades/${id}`), { estado: nuevoEstado })
                    .then(() => {
                        console.log("Estado actualizado exitosamente");
                        location.reload(); // Recargar la página después de cambiar el estado
                    })
                    .catch(error => {
                        console.error("Error al actualizar el estado:", error);
                    });
            } else {
                // Volver al estado original si se cancela la operación
                mostrarDatos();
            };
        };
    });

    // Evento para eliminar una entrada
    tabla.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const confirmar = confirm("¿Estás seguro de que deseas eliminar este elemento?");
            if (confirmar) {
                const id = event.target.getAttribute("data-id");
                remove(ref(database, `unidades/${id}`));
                mostrarDatos();
            }
        }
    });
});
console.log(database);
