document.addEventListener('DOMContentLoaded', () => {
    // Cargar las recompensas guardadas en el localStorage
    const recompensas = JSON.parse(localStorage.getItem('recompensas')) || [];
    const tablaRecompensas = document.getElementById('tabla-recompensas').getElementsByTagName('tbody')[0];

    // Mostrar las recompensas en la tabla
    function mostrarRecompensas() {
        tablaRecompensas.innerHTML = ''; // Limpiar tabla

        recompensas.forEach((recompensa, index) => {
            const row = tablaRecompensas.insertRow();
            row.innerHTML = `
                <td>${recompensa.recompensa}</td>
                <td>${recompensa.descripcion}</td>
                <td>${recompensa.puntos_necesarios}</td>
                <td><img src="${recompensa.imagen_recompensa}" alt="Imagen" width="50"></td>
            `;
        });
    }

    // Llamar a la función para mostrar las recompensas guardadas
    mostrarRecompensas();

    // Manejar el formulario de agregar recompensa
    document.getElementById('form-agregar-recompensa').addEventListener('submit', (e) => {
        e.preventDefault();

        const recompensa = document.getElementById('recompensa').value;
        const descripcion = document.getElementById('descripcion').value;
        const puntos = document.getElementById('puntos').value;
        const imagenInput = document.getElementById('imagen');
        const imagen = imagenInput.files.length > 0 ? imagenInput.files[0].name : ''; // Si hay archivo, usar su nombre

        // Crear el nuevo objeto de recompensa
        const nuevaRecompensa = {
            recompensa,
            descripcion,
            puntos_necesarios: parseInt(puntos, 10),
            imagen_recompensa: imagen
        };

        // Guardar en el localStorage
        recompensas.push(nuevaRecompensa);
        localStorage.setItem('recompensas', JSON.stringify(recompensas));

        // Volver a mostrar las recompensas
        mostrarRecompensas();

        // Limpiar el formulario
        document.getElementById('form-agregar-recompensa').reset();
    });

    // Botón "Guardar y agregar nueva recompensa"
    document.getElementById('guardar-agregar').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('form-agregar-recompensa').dispatchEvent(new Event('submit'));
    });

    // Botón "Guardar y salir"
    document.getElementById('guardar-salir').addEventListener('click', () => {
        window.location.href = "eventos.html"; // Redirigir a eventos.html
    });
});
