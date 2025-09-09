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

/*=====================LOGOUT======================*/
    // JavaScript para cerrar sesión
    document.addEventListener('DOMContentLoaded', function() {
      const logoutButton = document.getElementById('logout-btn');

      logoutButton.addEventListener('click', function(event) {
          event.preventDefault();
          window.location.href = '/logout.php'; // Reemplaza con la ruta correcta
      });
  });