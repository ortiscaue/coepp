document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("custom-body");

    let container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    let doutores = ["Dr. Fabio", "Dr. Bruna", "Dr. Caue", "Dr. Diego"];
    let agendamentos = {};

    doutores.forEach(doutor => {
        agendamentos[doutor] = {};

        let card = document.createElement("div");
        card.classList.add("card");

        let titulo = document.createElement("h3");
        titulo.textContent = doutor;
        card.appendChild(titulo);

        let calendario = document.createElement("input");
        calendario.type = "date";
        calendario.classList.add("calendario");
        calendario.addEventListener("change", function () {
            gerarHorarios(doutor, calendario.value, horariosDiv);
        });
        card.appendChild(calendario);

        let horariosDiv = document.createElement("div");
        card.appendChild(horariosDiv);

        container.appendChild(card);
    });

    function gerarHorarios(doutor, data, horariosDiv) {
        if (!data) return;

        let dataFormatada = new Date(data + "T00:00:00");
        let dia = String(dataFormatada.getDate()).padStart(2, '0');
        let mes = String(dataFormatada.getMonth() + 1).padStart(2, '0');
        let ano = dataFormatada.getFullYear();
        let dataFormatadaTexto = `${dia}/${mes}/${ano}`;

        horariosDiv.innerHTML = `<h4>Horários para ${dataFormatadaTexto}</h4>`;
        let horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

        if (!agendamentos[doutor][data]) {
            agendamentos[doutor][data] = {};
        }

        horarios.forEach(hora => {
            let btn = document.createElement("button");
            btn.innerText = hora;
            btn.classList.add("btn-horario");
            if (agendamentos[doutor][data][hora]) {
                btn.classList.add("ocupado");
            }

            let spanPaciente = document.createElement("span");
            spanPaciente.classList.add("paciente");
            spanPaciente.innerText = agendamentos[doutor][data][hora] ? `Paciente: ${agendamentos[doutor][data][hora]}` : "";

            btn.onclick = function () {
                if (!agendamentos[doutor][data][hora]) {
                    let nomePaciente = prompt("Digite o nome do paciente:");
                    if (nomePaciente) {
                        agendamentos[doutor][data][hora] = nomePaciente;
                        alert(`Agendado com ${doutor} para ${dataFormatadaTexto} às ${hora} - Paciente: ${nomePaciente}`);
                        btn.classList.add("ocupado");
                        spanPaciente.innerText = `Paciente: ${nomePaciente}`;
                    }
                } else {
                    let opcao = prompt(`Horário ${hora} já está agendado para: ${agendamentos[doutor][data][hora]}\n\nDigite:\n1 - Editar nome\n2 - Remover agendamento`);
                    if (opcao === "1") {
                        let novoNome = prompt("Digite o novo nome do paciente:");
                        if (novoNome) {
                            agendamentos[doutor][data][hora] = novoNome;
                            spanPaciente.innerText = `Paciente: ${novoNome}`;
                            alert(`Nome do paciente atualizado para: ${novoNome}`);
                        }
                    } else if (opcao === "2") {
                        let confirmar = confirm(`Tem certeza que deseja remover o agendamento das ${hora}?`);
                        if (confirmar) {
                            delete agendamentos[doutor][data][hora];
                            btn.classList.remove("ocupado");
                            spanPaciente.innerText = "";
                            alert(`Agendamento das ${hora} removido.`);
                        }
                    }
                }
            };

            horariosDiv.appendChild(btn);
            horariosDiv.appendChild(spanPaciente);
        });
    }
});
