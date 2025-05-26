<?php
session_start();
require 'conexao.php';
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de Login</title>
    <link rel="stylesheet" href="login.css">

</head>
<body>

    <div class="login-container">
        <h2>Bem vindo(a)!</h2>
         <form name="login" action="processa.php" method="POST">
            <input type="text" class="input-field" name="username" placeholder="Usuário" required>
            <input type="password" class="input-field" name="password" placeholder="Senha" required>
            <a href="/agendamento/agendamento.html">
            <button type="submit" class="btn-login">Entrar</button></a>
    
        </form>
        <div class="footer">
            <p><a href="/cadastro/cadastro.html">Criar uma conta</a></p>
            
        </div>
    </div>

</body>
</html>
