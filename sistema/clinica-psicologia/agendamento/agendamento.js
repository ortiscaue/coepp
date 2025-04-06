document.addEventListener("DOMContentLoaded", function() {
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.backgroundColor = "#00008B";
    document.body.style.textAlign = "center";
    document.body.style.padding = "20px";

    let container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-around";
    container.style.flexWrap = "wrap";
    document.body.appendChild(container);

    let doutores = ["Dr. Fabio", "Dr. Bruna", "Dr. Caue", "Dr. Diego","Dr. Diego","Dr. Diego","Dr. Diego","Dr. Diego","Dr. Diego"];
    let agendamentos = {};

    doutores.forEach(doutor => {
        agendamentos[doutor] = {};
        let card = document.createElement("div");
        card.style.background = "white";
        card.style.padding = "15px";
        card.style.borderRadius = "8px";
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
    
            horariosDiv.appendChild(btn);
            horariosDiv.appendChild(spanPaciente);
        });
    }
})    