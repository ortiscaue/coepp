document.addEventListener("DOMContentLoaded", function() {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.backgroundColor = "white";
    document.body.style.textAlign = "center";
    document.body.style.padding = "20px";

    let container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-around";
    container.style.flexWrap = "wrap";
    document.body.appendChild(container);

    let doutores = [];
    let agendamentos = {};

    // Função para atualizar a lista de doutores na tela
    function atualizarDoutores() {
        container.innerHTML = "";  // Limpar o conteúdo atual do container
        doutores.forEach(doutor => {
            agendamentos[doutor] = agendamentos[doutor] || {}; // Garantir que agendamentos existam para o doutor
            criarCardDoutor(doutor);
        });
    }

    // Função para criar o card de cada doutor
    function criarCardDoutor(doutor) {
        let card = document.createElement("div");
        card.style.background = "#9FC6F9";
        card.style.padding = "1px";
        card.style.borderColor = "black";
        card.style.borderRadius = "12px";
        card.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        card.style.width = "250px";
        card.style.margin = "10px";
        
        let titulo = document.createElement("h3");
        titulo.textContent = doutor;
        card.appendChild(titulo);

        let calendario = document.createElement("input");
        calendario.type = "date";
        calendario.style.marginBottom = "10px";
        calendario.addEventListener("change", function() {
            gerarHorarios(doutor, calendario.value, horariosDiv);
        });
        card.appendChild(calendario);

        let horariosDiv = document.createElement("div");
        card.appendChild(horariosDiv);
        
        container.appendChild(card);

        // Gerar horários para o doutor
        if (Object.keys(agendamentos[doutor]).length > 0) {
            // Exibir os horários agendados caso já exista algum agendamento
            Object.keys(agendamentos[doutor]).forEach(data => {
                gerarHorarios(doutor, data, horariosDiv);
            });
        }
    }

    // Função para gerar os horários de agendamento
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
            btn.style.margin = "5px";
            btn.style.padding = "5px";
            btn.style.border = "none";
            btn.style.borderRadius = "5px";
            btn.style.backgroundColor = agendamentos[doutor][data][hora] ? "#ccc" : "#007BFF";
            btn.style.color = "white";
            btn.disabled = agendamentos[doutor][data][hora];
    
            let spanPaciente = document.createElement("span");
            spanPaciente.style.display = "block";
            spanPaciente.style.marginTop = "5px";
            spanPaciente.style.fontSize = "12px";
            spanPaciente.style.color = "#333";
            spanPaciente.innerText = agendamentos[doutor][data][hora] ? `Paciente: ${agendamentos[doutor][data][hora]}` : "";
    
            btn.onclick = function() {
                if (!agendamentos[doutor][data][hora]) {
                    let nomePaciente = prompt("Digite o nome do paciente:");
                    if (nomePaciente) {
                        agendamentos[doutor][data][hora] = nomePaciente;
                        alert(`Agendado com ${doutor} para ${dataFormatadaTexto} às ${hora} - Paciente: ${nomePaciente}`);
                        btn.style.backgroundColor = "#ccc";
                        btn.disabled = true;
                        spanPaciente.innerText = `Paciente: ${nomePaciente}`;
                    }
                }
            };

            // Adicionar botão de remover paciente
            if (agendamentos[doutor][data][hora]) {
                let btnRemover = document.createElement("button");
                btnRemover.innerText = "Remover Paciente";
                btnRemover.style.marginLeft = "5px";
                btnRemover.style.padding = "5px";
                btnRemover.style.border = "none";
                btnRemover.style.borderRadius = "5px";
                btnRemover.style.backgroundColor = "#FF6347";
                btnRemover.style.color = "white";

                btnRemover.onclick = function() {
                    if (confirm(`Você tem certeza que deseja remover o paciente ${agendamentos[doutor][data][hora]} de ${hora}?`)) {
                        delete agendamentos[doutor][data][hora];
                        spanPaciente.innerText = "";
                        btn.style.backgroundColor = "#007BFF";
                        btn.disabled = false;
                    }
                };

                horariosDiv.appendChild(btnRemover);
            }

            horariosDiv.appendChild(btn);
            horariosDiv.appendChild(spanPaciente);
        });
    }

    // Função para adicionar um novo doutor
    function adicionarDoutor() {
        let nomeDoutor = prompt("Digite o nome do novo doutor:");
        if (nomeDoutor && !doutores.includes(nomeDoutor)) {
            doutores.push(nomeDoutor);
            atualizarDoutores();
        } else {
            alert("Doutor já existe ou nome inválido.");
        }
    }

    // Função para remover um doutor
    function removerDoutor() {
        let nomeDoutor = prompt("Digite o nome do doutor a ser removido:");
        if (nomeDoutor && doutores.includes(nomeDoutor)) {
            doutores = doutores.filter(doutor => doutor !== nomeDoutor);
            atualizarDoutores();
        } else {
            alert("Doutor não encontrado.");
        }
    }

    // Botões para adicionar e remover doutores
    let btnAdicionar = document.createElement("button");
    btnAdicionar.innerText = "Adicionar Doutor";
    btnAdicionar.style.padding = "8px"
    btnAdicionar.style.color = "white";
    btnAdicionar.style.borderRadius = "14px";
    btnAdicionar.style.borderStyle = "none";
    btnAdicionar.style.margin = "30px";
    btnAdicionar.style.backgroundColor = "black"
    btnAdicionar.onclick = adicionarDoutor;
    btnAdicionar.style.position = "fixed";
    btnAdicionar.style.bottom = "20px";
    btnAdicionar.style.left = "630px";

    let btnRemover = document.createElement("button");
    btnRemover.innerText = "Remover Doutor";
    btnRemover.style.padding = "8px"
    btnRemover.style.color = "white";
    btnRemover.style.borderRadius = "14px";
    btnRemover.style.borderStyle = "none";
    btnRemover.style.margin = "30px";
    btnRemover.style.backgroundColor = "black"
    btnRemover.onclick = removerDoutor;
    btnRemover.style.position = "fixed";
    btnRemover.style.bottom = "20px";
    btnRemover.style.right = "630px";


    document.body.appendChild(btnAdicionar);
    document.body.appendChild(btnRemover);


    // Inicializar a lista de doutores
    atualizarDoutores();
});
