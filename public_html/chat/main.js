// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};



window.onload = function() {
  // Obtén la hora actual
  var currentHour = new Date().getHours();
  
  // Muestra u oculta los mensajes según la hora
  if (currentHour >= 0 && currentHour < 12) {
      // Mañana (12 AM - 12 PM)
      document.getElementById('greetingDay').style.display = 'block';
      document.getElementById('greetingAfternoon').style.display = 'none';
      document.getElementById('greetingNight').style.display = 'none';
  } else if (currentHour >= 12 && currentHour < 18) {
      // Tarde (12 PM - 6 PM)
      document.getElementById('greetingDay').style.display = 'none';
      document.getElementById('greetingAfternoon').style.display = 'block';
      document.getElementById('greetingNight').style.display = 'none';
  } else {
      // Noche (8 PM - 12 AM)
      document.getElementById('greetingDay').style.display = 'none';
      document.getElementById('greetingAfternoon').style.display = 'none';
      document.getElementById('greetingNight').style.display = 'block';
  }
}


/*=====================LOGOUT======================*/
    // JavaScript para cerrar sesión
    document.addEventListener('DOMContentLoaded', function() {
        const logoutButton = document.getElementById('logout-btn');

        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = '/logout.php'; // Reemplaza con la ruta correcta
        });
    });


    