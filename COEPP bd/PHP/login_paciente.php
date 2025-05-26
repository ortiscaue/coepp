<?php
session_start();
require 'conexao.php';

$dados = json_decode(file_get_contents("php://input"), true);
$email = $conn->real_escape_string($dados["email"]);
$senha = $dados["senha"];

$result = $conn->query("SELECT * FROM pacientes WHERE email = '$email'");

if ($result->num_rows === 1) {
    $paciente = $result->fetch_assoc();
    if (password_verify($senha, $paciente["senha"])) {
        $_SESSION["paciente_id"] = $paciente["id"];
        echo json_encode(["sucesso" => true]);
        exit;
    }
}

http_response_code(401);
echo json_encode(["erro" => "Credenciais inválidas."]);
?>
