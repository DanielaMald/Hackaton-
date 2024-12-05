document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
  
    // Obtener los datos del evento desde la URL
    const index = urlParams.get('index');
    const titulo = urlParams.get('titulo');
    const cuerpo = urlParams.get('cuerpo');
    const fechaInicio = urlParams.get('fechaInicio');
    const fechaFin = urlParams.get('fechaFin');
    const imagen = urlParams.get('imagen');
  
    // Verificar si los parámetros existen antes de llenar el formulario
    if (index && titulo && cuerpo && fechaInicio && fechaFin) {
        // Llenar el formulario con los valores actuales
        document.getElementById('titulo').value = titulo;
        document.getElementById('cuerpo').value = cuerpo;
        document.getElementById('fechaInicio').value = fechaInicio;
        document.getElementById('fechaFin').value = fechaFin;
      
        // Si hay una imagen, se puede mostrar o manejar de alguna manera, por ahora solo mostramos el path
        if (imagen) {
            console.log('Imagen:', imagen);
        }
    } else {
        console.log('Faltan parámetros en la URL');
    }
  
    // Manejo del formulario
    document.getElementById('form-modificar-evento').addEventListener('submit', (e) => {
        e.preventDefault();
  
        const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
  
        // Actualizar el evento
        eventos[index] = {
            titulo: document.getElementById('titulo').value,
            cuerpo: document.getElementById('cuerpo').value,
            fechaInicio: document.getElementById('fechaInicio').value,
            fechaFin: document.getElementById('fechaFin').value,
            imagen: imagen || ''  // Si no se seleccionó imagen, mantiene la imagen original
        };
  
        // Guardar los eventos actualizados en el LocalStorage
        localStorage.setItem('eventos', JSON.stringify(eventos));
  
        // Redirigir a la página de eventos
        window.location.href = 'eventos.html'; // Cambia la ruta según sea necesario
    });
});
