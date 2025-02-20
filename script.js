// Seleccionar elementos del DOM
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const listaSeleccionados = document.getElementById('lista-seleccionados');
const totalElement = document.getElementById('total');

// Variables para almacenar los productos seleccionados y el total
let seleccionados = [];
let total = 0;

// Función para actualizar la lista de productos seleccionados y el total
function actualizarResumen() {
    // Limpiar la lista de seleccionados
    listaSeleccionados.innerHTML = '';

    // Si no hay productos seleccionados, mostrar un mensaje
    if (seleccionados.length === 0) {
        listaSeleccionados.innerHTML = '<p>No has seleccionado ningún producto.</p>';
        totalElement.textContent = '0';
        return;
    }

    // Crear una lista de los productos seleccionados
    const lista = document.createElement('ul');
    seleccionados.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        lista.appendChild(item);
    });

    // Agregar la lista al DOM
    listaSeleccionados.appendChild(lista);

    // Actualizar el total
    totalElement.textContent = total;
}

// Escuchar cambios en las casillas de verificación
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const nombre = event.target.dataset.nombre;
        const precio = parseFloat(event.target.dataset.precio);

        if (isChecked) {
            // Agregar el producto a la lista de seleccionados
            seleccionados.push({ nombre, precio });
            total += precio;
        } else {
            // Eliminar el producto de la lista de seleccionados
            const index = seleccionados.findIndex(producto => producto.nombre === nombre);
            if (index !== -1) {
                total -= seleccionados[index].precio;
                seleccionados.splice(index, 1);
            }
        }

        // Actualizar el resumen
        actualizarResumen();
    });
});