document.addEventListener('DOMContentLoaded', function () {
  const videoLinkInput = document.getElementById('videoLink');
  const loadVideoButton = document.getElementById('loadVideo');
  const videoContainer = document.getElementById('videoContainer');
  const apiKey = 'TU_API_KEY'; // Reemplaza 'TU_API_KEY' con la API Key que obtuviste de la Consola de Desarrolladores de Google.

  loadVideoButton.addEventListener('click', function () {
    const videoLink = videoLinkInput.value;
    const videoId = extractVideoIdFromUrl(videoLink);
    if (videoId) {
      loadYouTubeVideo(videoId);
    } else {
      showErrorMessage();
    }
  });

  function showErrorMessage() {
    // Creamos un elemento para mostrar el mensaje de error
    const errorContainer = document.createElement('div');
    errorContainer.id = 'errorContainer';
    errorContainer.textContent = 'URL de video de YouTube inválida';

    // Ocultamos el input y el botón
    videoLinkInput.style.display = 'none';
    loadVideoButton.style.display = 'none';

    // Agregamos el elemento de mensaje de error al componente
    videoContainer.innerHTML = '';
    videoContainer.appendChild(errorContainer);
  }

  function hideElements() {
    videoLinkInput.style.display = 'none';
    loadVideoButton.style.display = 'none';
  }

  function extractVideoIdFromUrl(url) {
    const regExpShort = /(?:youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/;
    const regExpRegular = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;

    if (regExpShort.test(url)) {
      const match = url.match(regExpShort);
      return (match && match[1]) ? match[1] : null;
    } else {
      const match = url.match(regExpRegular);
      return (match && match[2].length === 11) ? match[2] : null;
    }
  }

  function loadYouTubeVideo(videoId) {
    const isShort = isShortVideo(videoId);
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = isShort ? '190' : '390';
    iframe.height = isShort ? '390' : '190';
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);

    // Ajustar el tamaño del contenedor según el tipo de video
    videoContainer.style.width = isShort ? '190px' : '390px';
    videoContainer.style.height = isShort ? '390px' : '190px';

    hideElements(); // Llamamos a la función para ocultar elementos
  }

  function isShortVideo(videoId) {
    // Verificar si el ID del video tiene una longitud de 20 caracteres, que es la longitud de los YouTube Shorts
    return videoId.length === 20;
  }
});
