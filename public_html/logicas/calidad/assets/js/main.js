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

function mostrarCuadro(tipo) {
  // Ocultar todos los cuadros de texto primero
  var cuadros = document.getElementsByClassName('recuadroDatosPlantillas');
  for (var i = 0; i < cuadros.length; i++) {
      cuadros[i].style.display = 'none';
  }

  // Mostrar el cuadro de texto correspondiente al tipo seleccionado
  if (tipo === 'pasajero') {
      document.getElementById('cuadroPasajero').style.display = 'block';
      document.getElementById('cuadroPasajero').classList.add('recuadroPasajero'); // Aplicar clase específica
  } else if (tipo === 'conductor') {
      document.getElementById('cuadroConductor').style.display = 'block';
      document.getElementById('cuadroConductor').classList.add('recuadroConductor'); // Aplicar clase específica
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