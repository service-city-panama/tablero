// Importar las funciones necesarias de Firebase
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Función para mostrar los datos en la tabla
export function mostrarDatos(database, tabla) {
    // Vacía la tabla antes de agregar los nuevos datos
    tabla.innerHTML = "";

    // Obtén los datos de la base de datos
    onValue(ref(database, "unidades"), snapshot => {
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            const row = `
                <tr>
                    <td class="display-flex-center">
                        <button type="submit" class="button edit-btn" data-id="${childSnapshot.key}">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                    </td>
                    <td>${childData.unidad}</td>
                    <td>${childData.estado}</td>
                    <td>
                        <button type="button" class="button delete-btn" data-id="${childSnapshot.key}">
                            <i class="bi bi-journal-x"></i>
                        </button>
                    </td>
                </tr>
            `;
            tabla.innerHTML += row;
        });
    });
}
