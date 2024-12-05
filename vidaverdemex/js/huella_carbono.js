document.getElementById('huellaForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtener los valores del formulario
    const energia = parseFloat(document.getElementById('energia').value);
    const km = parseFloat(document.getElementById('km').value);
    const carne = parseFloat(document.getElementById('carne').value);
    const vuelos = parseFloat(document.getElementById('vuelos').value);
  
    // Cálculo de la huella de carbono
    const huellaElectricidad = energia * 0.0004 * 12; // anual
    const huellaTransporte = km * 0.07 / 100 * 12; // anual
    const huellaCarne = carne * 0.02; // anual
    const huellaVuelos = vuelos * 1.5; // anual
  
    const huellaTotal = huellaElectricidad + huellaTransporte + huellaCarne + huellaVuelos;
  
    // Mostrar el resultado
    let mensaje = '';
    if (huellaTotal < 4) {
      mensaje = `¡Excelente! Tu huella de carbono es baja: ${huellaTotal.toFixed(2)} toneladas de CO₂ al año. Sigue así, tu estilo de vida está ayudando al planeta.`;
    } else if (huellaTotal >= 4 && huellaTotal <= 10) {
      mensaje = `Tienes una huella de carbono media: ${huellaTotal.toFixed(2)} toneladas de CO₂ al año. Considera reducir tu consumo de carne, usar transporte público o reducir el uso del coche.`;
    } else {
      mensaje = `Tu huella de carbono es alta: ${huellaTotal.toFixed(2)} toneladas de CO₂ al año. Hay muchas formas en las que puedes reducirla, como optar por energías renovables, reducir tu consumo de carne y usar más transporte público.`;
    }
  
    // Mostrar el mensaje en el HTML
    document.getElementById('resultado').innerHTML = mensaje;
  });
  