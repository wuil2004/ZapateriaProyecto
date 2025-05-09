<?php
// Configuración de la base de datos
$servername = "localhost";  // Cambia según tu configuración
$username = "root";         // Tu usuario de MySQL
$password = "root123";      // Tu contraseña de MySQL
$dbname = "punto_venta";    // El nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar si la conexión fue exitosa
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Si la conexión es exitosa, puedes mostrar un mensaje o continuar
// echo "Conexión exitosa";  // Descomenta esta línea para comprobar si la conexión es correcta

?>
