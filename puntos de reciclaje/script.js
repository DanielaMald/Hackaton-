// Coordenadas de los puntos de reciclaje
const locations = [
    { name: "Melo Tulancingo", lat: 20.083876427801226, lng: -98.38269786105826, address: "Santa Ana 43642 Tulancingo, Hidalgo.", description: "Reciclaje de plásticos y papel." },
    { name: "Emhsa", lat: 19.87395190776258, lng: -98.65003611720431, address: "Supermanzana 43838 Acelotla de Ocampo, Hidalgo.", description: "Reciclaje de metales y electrónicos." },
    { name: "Acopio Pachuca Petstar", lat: 20.014864997939334, lng: -98.71735584616403, address: "San Miguel Nopala 43586 Epazoyucan, Hidalgo.", description: "Especializado en vidrio." },
  ];
  
  let map, directionsService, directionsRenderer;
  
  // Inicializa el mapa
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 20.1, lng: -98.4 },
      zoom: 10,
    });
  
    // Servicio de direcciones y renderizador para mostrar rutas
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
  
    // Añade marcadores al mapa
    locations.forEach((location) => {
      new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
      });
    });
  
    // Agrega información emergente a los contenedores
    const infoContainers = document.getElementById("info-containers");
    infoContainers.innerHTML = ""; // Esto asegura que no se dupliquen

    locations.forEach((location, index) => {
      const item = document.createElement("div");
      item.className = "info-item";
      item.dataset.index = index;

       // Contenido del contenedor
    item.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${location.name}</h5>
      <p class="card-text">${location.address}</p>
      <p class="card-text"><small class="text-muted">${location.description}</small></p>
    </div>
  `;
  

  
      // Contenido del contenedor
      item.innerHTML = `<h3>${location.name}</h3>`;
      item.addEventListener("mouseenter", () => showPopup(item, location));
      item.addEventListener("mouseleave", () => hidePopup(item));
      infoContainers.appendChild(item);
    });
  }
   // Evento del botón "Trazar Ruta Más Cercana"
   document.getElementById("route-button").addEventListener("click", () => {
    getUserLocation((userLocation) => {
      const closest = findClosestLocation(userLocation, locations);
      calculateRoute(userLocation, closest);
    });
  });

  // Muestra la ventana emergente
  function showPopup(item, location) {
    let popup = item.querySelector(".popup");
    if (!popup) {
      popup = document.createElement("div");
      popup.className = "popup card shadow-sm p-3"; // Popup con estilo card
      popup.innerHTML = `
      <div class="popup-container">
        <strong>${location.name}</strong><br>
        <span class="address">Dirección: ${location.address}</span><br>
        <span class="description">${location.description}</span>
      </div>
    `;
      item.appendChild(popup);
    }
    popup.style.display = "block";
  }
  
  // Oculta la ventana emergente
  function hidePopup(item) {
    const popup = item.querySelector(".popup");
    if (popup) {
      popup.style.display = "none";
    }
  }
  
  // Encuentra el punto de reciclaje más cercano
  function findClosestLocation(user, locations) {
    let minDistance = Infinity;
    let closest = null;
  
    locations.forEach((location) => {
      const distance = haversineDistance(user, location);
      if (distance < minDistance) {
        minDistance = distance;
        closest = location;
      }
    });
  
    return closest;
  }
  
  // Calcula y muestra la ruta más corta
  function calculateRoute(start, end) {
    const request = {
      origin: { lat: start.lat, lng: start.lng },
      destination: { lat: end.lat, lng: end.lng },
      travelMode: "DRIVING",
    };
  
    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
         // Obtener la duración de la ruta
      const duration = result.routes[0].legs[0].duration.text;
      
      // Realizar la síntesis de voz para decir la duración y el destino
      const message = `La duración estimada del viaje es de ${duration}. Tu lugar de destino es ${end.name}.`;
      speak(message);
      } else {
        alert("No se pudo calcular la ruta. Intenta nuevamente.");
      }
    });
  }
  
  // Obtiene la ubicación actual del usuario
  function getUserLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          callback(userLocation);
        },
        () => {
          alert("No se pudo obtener tu ubicación.");
        }
      );
    } else {
      alert("La Geolocalización no está soportada en tu navegador.");
    }
  }
  
  // Calcula la distancia entre dos coordenadas (en km)
  function haversineDistance(coords1, coords2) {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Radio de la Tierra en km
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLng = toRad(coords2.lng - coords1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.lat)) *
        Math.cos(toRad(coords2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  // Función para realizar la síntesis de voz
function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "es-ES"; // Establece el idioma en español
  speechSynthesis.speak(speech);
}
// Agrega una clase cuando se hace scroll en la página
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('navbar-logo');
  const navbarText = document.getElementById('navbar-text');

  if (window.scrollY > 50) { // Cuando el desplazamiento es mayor a 50px
    navbar.classList.add('scrolled'); // Aplica la clase que cambia el fondo y el tamaño
  } else {
    navbar.classList.remove('scrolled'); // Elimina la clase cuando no se hace scroll
  }
});

  // Inicializa el mapa al cargar la página
  window.onload = initMap;
  