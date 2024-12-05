document.addEventListener("DOMContentLoaded", () => {
    const webcamBtn = document.getElementById("webcam-btn");
    const dropdown = document.getElementById("dropdown-options");
    const imagePreview = document.getElementById("image-preview");
    const webcamPreview = document.getElementById("webcam-preview");
  
    // Mostrar/Ocultar el menú desplegable al presionar "Activar Webcam"
    webcamBtn.addEventListener("click", () => {
      dropdown.classList.toggle("show");
    });
  
    // Función para activar la cámara
    document.getElementById("camera-option").addEventListener("click", async () => {
      try {
        dropdown.classList.remove("show"); // Oculta el menú
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        imagePreview.style.display = "none"; // Oculta vista previa de imagen
        webcamPreview.style.display = "block"; // Muestra vista previa de cámara
        webcamPreview.srcObject = stream;
      } catch (error) {
        alert("No se pudo acceder a la cámara. Verifica los permisos.");
      }
    });
  
    // Función para subir una imagen
    document.getElementById("upload-option").addEventListener("click", () => {
      dropdown.classList.remove("show"); // Oculta el menú
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();
  
      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            webcamPreview.style.display = "none"; // Oculta vista previa de cámara
            imagePreview.style.display = "flex"; // Muestra vista previa de imagen
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Imagen subida" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
          };
          reader.readAsDataURL(file);
        }
      });
    });
  
    // Ocultar menú desplegable al hacer clic fuera del botón
    document.addEventListener("click", (event) => {
      if (!webcamBtn.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  });
  

  const URL = "./my_model/";

  let model, webcam, labelContainer, maxPredictions;
  
  // Inicializar modelo y cámara
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
  
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
  
    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
  }
  
  // Manejar opción "Usar Cámara"
  document.getElementById("camera-option").addEventListener("click", async () => {
    await init();
    document.getElementById("webcam-preview").style.display = "block";
    document.getElementById("uploaded-image").style.display = "none";
  
    await webcam.play();
    window.requestAnimationFrame(loop);
  
    document.getElementById("webcam-preview").srcObject = webcam.stream;
  });
  
  // Manejar opción "Subir Imagen"
  document.getElementById("upload-option").addEventListener("click", () => {
    const imageInput = document.getElementById("image-input");
    imageInput.click();
  
    imageInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (file) {
        const imgElement = document.getElementById("uploaded-image");
        imgElement.src = URL.createObjectURL(file);
        imgElement.style.display = "block";
        document.getElementById("webcam-preview").style.display = "none";
  
        const image = new Image();
        image.src = imgElement.src;
        image.onload = async () => {
          const prediction = await model.predict(image);
          displayPrediction(prediction);
        };
      }
    });
  });
  
  // Bucle de predicción para la cámara
  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }
  
  // Realizar predicción
  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    displayPrediction(prediction);
  }
  
  // Mostrar resultados de predicción
  function displayPrediction(prediction) {
    const resultContainer = document.getElementById("classification-result");
    resultContainer.innerHTML = prediction
      .map(
        (p) => `<p>${p.className}: ${p.probability.toFixed(2)}</p>`
      )
      .join("");
  }
  



// Agregar un evento de clic al ícono del menú
menuIcon.addEventListener('click', () => {
  // Alternar la visibilidad del menú
  menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
});

// Seleccionar el ícono del menú y el contenedor del menú
const menuIcon = document.querySelector('.menu-icon');
const menuContent = document.querySelector('.menu-content');

// Agregar un evento de clic al ícono del menú
menuIcon.addEventListener('click', () => {
  // Cambiar el estado de visibilidad del menú
  if (menuContent.style.display === 'block') {
    // Ocultar el menú
    menuContent.style.display = 'none';
    menuContent.style.opacity = '0';
    menuContent.style.visibility = 'hidden';
  } else {
    // Mostrar el menú
    menuContent.style.display = 'block';
    menuContent.style.opacity = '1';
    menuContent.style.visibility = 'visible';
  }
});
  