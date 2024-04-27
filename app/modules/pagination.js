const paginationModule = {
    initializePagination: function (data, itemsPerPage, renderFunction, mostrarDatos) {
        // Calcula el número total de páginas
        const totalPages = Math.ceil(data.length / itemsPerPage);

        // Muestra la primera página por defecto
        renderFunction(1);

        // Agrega event listeners a los botones de paginación
        document.getElementById("pagePrevius").addEventListener("click", () => {
            paginationModule.changePage(-1, totalPages, renderFunction, mostrarDatos);
        });

        document.getElementById("pageNext").addEventListener("click", () => {
            paginationModule.changePage(1, totalPages, renderFunction, mostrarDatos);
        });

        // Agrega event listeners para cada página
        for (let i = 1; i <= totalPages; i++) {
            document.getElementById(`page0${i}`).addEventListener("click", () => {
                currentPage = i;
                mostrarDatos();
            });
        }
    },


       // Agrega event listeners para cada página
       for (let i = 1; i <= totalPages; i++) {

        document.getElementById("page01").addEventListener("click", () => {
            currentPage = 1;
            mostrarDatos();
        });

        document.getElementById("page02").addEventListener("click", () => {
            currentPage = 2;
            mostrarDatos();
        });

        document.getElementById("page03").addEventListener("click", () => {
            currentPage = 3;
            mostrarDatos();
        });

        document.getElementById("page04").addEventListener("click", () => {
            currentPage = 4;
            mostrarDatos();
        });

        document.getElementById("page05").addEventListener("click", () => {
            currentPage = 5;
            mostrarDatos();
        });

        document.getElementById("page06").addEventListener("click", () => {
            currentPage = 6;
            mostrarDatos();
        });
    },

    changePage: function (direction, totalPages, renderFunction) {
        // Obtiene la página actual
        let currentPage = parseInt(document.querySelector(".active.page-item").innerText);

        // Calcula la nueva página
        let newPage = currentPage + direction;

        // Verifica los límites de la paginación
        if (newPage < 1) {
            newPage = 1;
        } else if (newPage > totalPages) {
            newPage = totalPages;
        }

        // Renderiza la nueva página
        renderFunction(newPage);
        mostrarDatos(); // Llama a mostrarDatos después de cambiar de página
    }
};

export default paginationModule;




