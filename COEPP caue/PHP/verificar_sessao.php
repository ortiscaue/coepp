<?php
session_start();

if (isset($_SESSION["admin_id"])) {
    echo json_encode(["tipo" => "admin", "id" => $_SESSION["admin_id"]]);
} elseif (isset($_SESSION["aluno_id"])) {
    echo json_encode(["tipo" => "aluno", "id" => $_SESSION["aluno_id"]]);
} elseif (isset($_SESSION["paciente_id"])) {
    echo json_encode(["tipo" => "paciente", "id" => $_SESSION["paciente_id"]]);
} else {
    http_response_code(401);
    echo json_encode(["erro" => "Usuário não autenticado"]);
}
?>
