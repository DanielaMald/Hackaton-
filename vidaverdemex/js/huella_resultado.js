document.addEventListener('DOMContentLoaded', function() {
    // Recuperar la huella de carbono guardada en el localStorage
    const huellaCarbono = parseFloat(localStorage.getItem('huellaCarbono'));
  
    // Mostrar el resultado en la página
    document.getElementById('resultado').textContent = huellaCarbono.toFixed(2);
  
    // Inicializar los mensajes de feedback y sugerencias
    let feedbackMessage = '';
    let sugerenciasMessage = '';
  
    if (huellaCarbono < 4) {
      feedbackMessage = '¡Excelente! Tu huella de carbono es baja. Sigue así, tu estilo de vida está ayudando al planeta.';
      sugerenciasMessage = `
        Tu huella de carbono es excelente. ¡Estás haciendo un gran trabajo! Aquí tienes algunas recomendaciones para seguir reduciendo tu impacto:
        - Reducir aún más el consumo de carne: Si bien tu consumo es bajo, una dieta más basada en plantas siempre es una opción excelente para el medio ambiente.
        - Optar por energías renovables: Si puedes, considera el uso de paneles solares o comprar energía renovable para tu hogar.
        - Continuar utilizando transporte público o modos de transporte más sostenibles: Caminar, andar en bicicleta o utilizar transporte eléctrico son opciones aún más ecológicas.
        - Revisa tus electrodomésticos: Asegúrate de que estén eficientes en cuanto a consumo energético.
        <br><br>Para conocer más, visita la comunidad.
        <br><button onclick="window.location.href='comunidad.html'">Ir a Comunidad</button>`;
    } else if (huellaCarbono >= 4 && huellaCarbono <= 10) {
      feedbackMessage = 'Tu huella de carbono es media. Hay margen para mejorar.';
      sugerenciasMessage = `
        Aunque tu huella de carbono no es alta, todavía hay áreas en las que podrías reducir tu impacto. Aquí te dejamos algunas recomendaciones:
        - Reducir el uso del coche: Considera alternativas como el transporte público, caminar o usar la bicicleta para distancias cortas.
        - Usar menos energía: Apaga los electrodomésticos cuando no los estés utilizando y revisa la eficiencia energética de tu hogar. Considera cambiar a bombillas LED.
        - Reducir el consumo de carne y productos animales: Optar por dietas basadas en plantas puede disminuir significativamente tu huella de carbono.
        - Revisar tus vuelos: Si viajas con frecuencia en avión, intenta reducir la cantidad de vuelos o considera alternativas como el tren para trayectos más cortos.
        <br><br>Para conocer más, visita la comunidad.
        <br><button onclick="window.location.href='comunidad.html'">Ir a Comunidad</button>`;
    } else {
      feedbackMessage = 'Tu huella de carbono es alta. ¡Es hora de tomar acción!';
      sugerenciasMessage = `
        Tu huella de carbono es alta, pero no te preocupes, ¡hay muchas maneras de mejorar! Aquí tienes algunas sugerencias para reducir tu impacto ambiental:
        - Usar transporte público o modos de transporte compartido: Si tienes que usar un coche, opta por un coche eléctrico o compartido.
        - Adoptar energías renovables: Si aún no lo has hecho, considera cambiarte a un proveedor de energía renovable o instalar paneles solares en tu hogar.
        - Reducir el consumo de carne: La producción de carne es una de las principales causas del cambio climático. Considera reducir su consumo o probar una dieta basada en plantas.
        - Optar por productos de bajo impacto: Compra productos con menor huella de carbono, como aquellos con empaques reciclables o productos locales.
        <br><br>Para conocer más, visita la comunidad.
        <br><button onclick="window.location.href='comunidad.html'">Ir a Comunidad</button>`;
    }
  
    // Mostrar los mensajes en la página
    document.getElementById('feedback').innerHTML = feedbackMessage;
    document.getElementById('sugerencias').innerHTML = sugerenciasMessage;
  });
  
  // Función para volver a la pantalla anterior o calcular nuevamente
  function volver() {
    window.location.href = "huella_carbono.html"; // Redirigir a la página de huella_carbono para un nuevo cálculo
  }
  