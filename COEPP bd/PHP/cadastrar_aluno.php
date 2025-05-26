<?php
require 'conexao.php';

$dados = json_decode(file_get_contents("php://input"), true);
$nome = $conn->real_escape_string($dados["nome"]);
$email = $conn->real_escape_string($dados["email"]);
$senha = password_hash($dados["senha"], PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nome, $email, $senha);

if ($stmt->execute()) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["erro" => "Erro ao cadastrar aluno."]);
}
?>
