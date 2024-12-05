
    // Función para cargar los eventos desde LocalStorage
    function cargarEventos() {
        const eventoJSON = localStorage.getItem('evento'); // Obtener el evento guardado
        const eventosContainer = document.getElementById('eventosContainer');
  
        if (eventoJSON) {
          // Parsear el JSON
          const evento = JSON.parse(eventoJSON);
  
          // Crear una card para el evento
          const eventCard = document.createElement('div');
          eventCard.classList.add('event-card');
  
          // Si no hay imagen, usamos una imagen predeterminada
          const imagen = evento.imagen || '/public/default-image.jpg';  // Ruta de imagen predeterminada
  
          // Estructura de la card
          eventCard.innerHTML = `
            <h3>${evento.titulo}</h3>
            <p><strong>Objetivo:</strong> ${evento.cuerpo}</p>
            <p><strong>Fecha de Inicio:</strong> ${evento.fechaInicio}</p>
            <p><strong>Fecha de Finalización:</strong> ${evento.fechaFin}</p>
            <img src="${imagen}" alt="Imagen del Evento" />
            <div class="buttons">
              <button onclick="agregarRecompensas()">Agregar Recompensas</button>
            </div>
          `;
  
          // Agregar la card al contenedor de eventos
          eventosContainer.appendChild(eventCard);
        } else {
          eventosContainer.innerHTML = '<p>No hay eventos guardados.</p>';
        }
      }
  
      // Función para redirigir a la página de modificar evento
      // Función para redirigir a la página de modificar evento
  function modificarEvento(index) {
      // Obtener el evento desde el localStorage
      const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
      const evento = eventos[index];
  
      if (evento) {
          // Crear la URL con todos los parámetros del evento
          const url = `modificar_evento.html?index=${index}&titulo=${encodeURIComponent(evento.titulo)}&cuerpo=${encodeURIComponent(evento.cuerpo)}&fechaInicio=${encodeURIComponent(evento.fechaInicio)}&fechaFin=${encodeURIComponent(evento.fechaFin)}&imagen=${encodeURIComponent(evento.imagen || '')}`;
          
          // Redirigir a la página de modificar evento
          window.location.href = url;
      } else {
          console.log("Evento no encontrado.");
      }
  }
  
  
      // Función para redirigir a la página de agregar recompensas
      function agregarRecompensas() {
        window.location.href = "agregar_recompensas.html";  // Redirige a la página de recompensas
      }
  
      // Cargar los eventos cuando se cargue la página
      window.onload = cargarEventos;

      // Función para mostrar/ocultar el sidebar
// Obtener el botón y el sidebar
const toggleSidebarButton = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

// Manejar el clic en el botón para mostrar/ocultar el sidebar
toggleSidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

