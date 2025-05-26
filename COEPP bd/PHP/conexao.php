<?php
$host = "localhost";
$usuario = "root"; // ou seu usuário MySQL
$senha = "";       // ou sua senha MySQL
$banco = "sistema_saude"; // nome do banco

$mysqli = new mysqli($host, $usuario, $senha, $banco);

if ($mysqli->connect_error) {
    die("Erro de conexão: " . $mysqli->connect_error);
} else {
    echo "Conexão bem-sucedida!";
}
?>