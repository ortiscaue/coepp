document.addEventListener("DOMContentLoaded", function () {
    const container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    const botoesDiv = document.createElement("div");
    botoesDiv.classList.add("botao-container");

    let doutores = [];
    let agendamentos = {};

    function atualizarDoutores() {
        container.innerHTML = "";

        doutores.forEach(doutor => {
            if (!agendamentos[doutor]) agendamentos[doutor] = {};

            const card = document.createElement("div");
            card.classList.add("card");

            const nome = document.createElement("h3");
            nome.textContent = doutor;
            card.appendChild(nome);

            const calendario = document.createElement("input");
            calendario.type = "date";
            calendario.classList.add("calendario");

            const horariosDiv = document.createElement("div");
            horariosDiv.classList.add("horarios-div");

            calendario.addEventListener("change", () => {
                gerarHorarios(doutor, calendario.value, horariosDiv);
            });

            card.appendChild(calendario);
            card.appendChild(horariosDiv);
            container.appendChild(card);
        });
    }

    function gerarHorarios(doutor, data, horariosDiv) {
        if (!data) return;

        const dataFormatada = new Date(data + "T00:00:00");
        const dataTexto = dataFormatada.toLocaleDateString("pt-BR");
        horariosDiv.innerHTML = `<h4>Horários para ${dataTexto}</h4>`;

        const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
        if (!agendamentos[doutor][data]) agendamentos[doutor][data] = {};

        horarios.forEach(hora => {
            const linha = document.createElement("div");
            linha.classList.add("linha-horario");

            const btn = document.createElement("button");
            btn.innerText = hora;
            btn.classList.add("btn-horario");

            const pacienteSpan = document.createElement("span");
            pacienteSpan.classList.add("paciente");
            if (agendamentos[doutor][data][hora]) {
                btn.classList.add("ocupado");
                pacienteSpan.textContent = `Paciente: ${agendamentos[doutor][data][hora]}`;
            }

            btn.onclick = () => {
                if (!agendamentos[doutor][data][hora]) {
                    const nome = prompt("Digite o nome do paciente:");
                    if (nome) {
                        agendamentos[doutor][data][hora] = nome;
                        pacienteSpan.textContent = `Paciente: ${nome}`;
                        btn.classList.add("ocupado");
                    }
                } else {
                    const opcao = prompt(`Já agendado para ${agendamentos[doutor][data][hora]}\n\n1 - Editar\n2 - Remover`);
                    if (opcao === "1") {
                        const novoNome = prompt("Novo nome:");
                        if (novoNome) {
                            agendamentos[doutor][data][hora] = novoNome;
                            pacienteSpan.textContent = `Paciente: ${novoNome}`;
                        }
                    } else if (opcao === "2") {
                        if (confirm("Confirmar remoção?")) {
                            delete agendamentos[doutor][data][hora];
                            pacienteSpan.textContent = "";
                            btn.classList.remove("ocupado");
                        }
                    }
                }
            };

            linha.appendChild(btn);
            linha.appendChild(pacienteSpan);
            horariosDiv.appendChild(linha);
        });
    }

    function adicionarDoutor() {
        const nome = prompt("Nome do doutor:");
        if (nome && !doutores.includes(nome)) {
            doutores.push(nome);
            atualizarDoutores();
        }
    }

    function removerDoutor() {
        const nome = prompt("Nome do doutor a remover:");
        if (nome && doutores.includes(nome)) {
            doutores = doutores.filter(d => d !== nome);
            atualizarDoutores();
        }
    }

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Adicionar Doutor";
    btnAdd.onclick = adicionarDoutor;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover Doutor";
    btnRemover.onclick = removerDoutor;

    botoesDiv.appendChild(btnAdd);
    botoesDiv.appendChild(btnRemover);

    const header = document.querySelector(".cabecalho");
    header.insertAdjacentElement("afterend", botoesDiv);

    const rodape = document.createElement("div");
    rodape.classList.add("rodape");

    const btnSair = document.createElement("button");
    btnSair.textContent = "Sair";
    btnSair.onclick = () => {
        window.location.href = "/clinica-psicologia/login/login.html";
    };
});
