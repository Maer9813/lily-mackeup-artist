const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const appointmentForm = document.querySelector('#appointment-form');
const dateInput = document.querySelector('#appointment-date');

if (dateInput) {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().split('T')[0];
}

appointmentForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#client-name').value.trim();
  const service = document.querySelector('#appointment-service').value;
  const dateValue = document.querySelector('#appointment-date').value;
  const time = document.querySelector('#appointment-time').value;
  const notes = document.querySelector('#appointment-notes').value.trim();
  const formattedDate = new Intl.DateTimeFormat('es-GT', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
  }).format(new Date(`${dateValue}T12:00:00Z`));

  const message = [
    `Hola Lily, soy ${name} y quiero solicitar una cita.`,
    `Servicio: ${service}`,
    `Fecha preferida: ${formattedDate}`,
    `Horario: ${time}`,
    notes ? `Detalles: ${notes}` : ''
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/50236713529?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
