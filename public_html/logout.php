<?php
session_start();
session_unset();
session_destroy();
$_SESSION = array();

// Redireccionar a la página de inicio
header("Location: index.php"); // Ajusta la ruta según la estructura de tu sitio
exit();
?>
