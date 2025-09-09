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

/*==================Calculadora=======================*/

function calcularPorcentaje() {
  var ciudad = document.getElementById('ciudad').value;
  var monto = parseFloat(document.getElementById('monto').value);
  var porcentaje = 0;

  // Obtener el valor seleccionado de inicio en Aeropuerto o Muelle
  var inicio = document.querySelector('input[name="inicio"]:checked');

  // Calcular el porcentaje según la ciudad seleccionada
  switch (ciudad) {
      case 'Miami':
          porcentaje = 39.69;
          break;
      case 'Indianapolis':
          porcentaje = 19.70;
          break;
      case 'Tampa':
          porcentaje = 29.69;
          break;
      case 'Tallahassee':
          porcentaje = 29.69;
          break;
      // Agrega más casos 
      default:
          break;
  }

  var comision = monto * (porcentaje / 100);

  // Restar 2 al monto si el viaje inició en Aeropuerto o Muelle
  if (inicio && inicio.value === 'si') {
      monto -= 2;
  }

  var resultado = monto - comision;

  // Mostrar el resultado de la comisión
  document.getElementById('resultado').innerHTML = `Menos ${porcentaje}% de Comisión = $ ${comision.toFixed(2)}`;
  // Mostrar el resultado después de restar la comisión
  document.getElementById('resultadoDespues').innerHTML = `Pago = $${resultado.toFixed(2)}`;
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