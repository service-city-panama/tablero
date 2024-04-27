let data = []; // Aquí deberías tener tus datos de tabla
let currentPage = 1;
let rowsPerPage = 10;

function displayData() {
    const table = document.getElementById("tableroChorrera");
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);
    table.innerHTML = "";
    paginatedData.forEach(item => {
        const row = table.insertRow();
        // Aquí deberías insertar las celdas de la fila según tus datos
    });
}

function goToPage(page) {
    currentPage = page;
    displayData();
}

function changeRowsPerPage(value) {
    rowsPerPage = value;
    displayData();
}

document.addEventListener("DOMContentLoaded", function () {
    // Llama a la función displayData solo cuando el DOM esté completamente cargado
    displayData();
});


export { data, displayData, goToPage, changeRowsPerPage };
