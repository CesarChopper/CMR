<?php
session_start();

// Datos de conexión a la base de datos (ya tienes este bloque)
$host = 'bvy81vxo9zmqqnwjrehe-mysql.services.clever-cloud.com';
$dbname = 'bvy81vxo9zmqqnwjrehe';
$username = 'urr4mxgcifdixwo8';
$password = 'Sot15XtfizkTdVS33gPw';
$port = 3306;

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error: No se pudo conectar. " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['user'];
    $password = $_POST['password'];
    
    // BASE DE DATOS
    $query = "SELECT * FROM usuarios WHERE user = :user AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->execute(array(':user' => $user, ':password' => $password));
    
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        // Iniciar sesión y almacenar datos en sesión
        $_SESSION['user'] = $user['user'];
        $_SESSION['nombre'] = $user['nombre'];

        // Redireccionar al usuario después del login
        header("Location:home/Home.php");
        exit();
    } else {
        echo "<script>alert('Usuario o contraseña incorrectos'); window.location.href='index.php';</script>";
        exit();
    }
}
?>