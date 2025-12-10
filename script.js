let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const form = document.getElementById('customForm');

// MAIN TIMER FUNCTION
function timer(seconds) {
  clearInterval(countdown); // Detener si hay uno activo

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // detener cuando llegue a 0
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      displayTimeLeft(0);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

// mostrar tiempo restante
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  // agregar cero a la izquierda
  const display = `${minutes < 10 ? '0' : ''}${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;

  timerDisplay.textContent = display;
  document.title = display; // para mostrar en la pestaña del navegador
}

// mostrar a qué hora termina el temporizador
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  let hour = end.getHours();
  const minutes = end.getMinutes();

  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const ampm = hour >= 12 ? 'PM' : 'AM';

  endTimeDisplay.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${ampm}`;
}

// listeners para botones rápidos
buttons.forEach(button =>
  button.addEventListener('click', function () {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  })
);

// listener para formulario de minutos personalizados
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (!mins) return;
  timer(mins * 60);
  this.reset();
});
