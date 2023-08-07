document.addEventListener('DOMContentLoaded', function () {
  const videoLinkInput = document.getElementById('videoLink');
  const loadVideoButton = document.getElementById('loadVideo');
  const videoContainer = document.getElementById('videoContainer');
  const apiKey = 'AIzaSyD0BOBtjO-s-aT_pz2l8ey9VxsIol87KdY'; // Reemplaza 'TU_API_KEY' con la API Key que obtuviste de la Consola de Desarrolladores de Google.

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
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function loadYouTubeVideo(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.width = '400';
    iframe.height = '200';
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);

    hideElements(); // Llamamos a la función para ocultar elementos
  }
});
