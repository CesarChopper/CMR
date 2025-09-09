// ===== Toggle de menú lateral =====
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

if (toggle && navigation && main) {
  toggle.onclick = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
  };
}

// ===== Estado activo en el menú =====
let list = document.querySelectorAll('.navigation li');
list.forEach(item => {
  item.addEventListener('mouseover', function() {
    list.forEach(i => i.classList.remove('hovered'));
    this.classList.add('hovered');
  });
});

// ===== Logout (si existe el botón) =====
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    // aquí puedes limpiar storage / tokens si usas auth
    window.location.href = '/public_html/home/Home.html';
  });
}

// ===== Saludo por horario (con guardas para evitar null) =====
window.addEventListener('load', () => {
  const currentHour = new Date().getHours();
  const day = document.getElementById('greetingDay');
  const aft = document.getElementById('greetingAfternoon');
  const night = document.getElementById('greetingNight');

  if (!day && !aft && !night) return; // si no existen, salir

  const show = (el) => { if (el) el.style.display = 'block'; };
  const hide = (el) => { if (el) el.style.display = 'none'; };

  if (currentHour >= 0 && currentHour < 12) {
    show(day); hide(aft); hide(night);
  } else if (currentHour >= 12 && currentHour < 18) {
    hide(day); show(aft); hide(night);
  } else {
    hide(day); hide(aft); show(night);
  }
});
