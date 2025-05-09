document.addEventListener("DOMContentLoaded", function () {
    // ========== MODAL ==========
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3 id="modal-title">Título</h3>
            <div id="modal-message"></div>
            <input type="text" id="modal-input" placeholder="Digite aqui..." />
            <div class="modal-buttons">
                <button id="modal-confirm">✅ Confirmar</button>
                <button id="modal-cancel">❌ Cancelar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement("style");
    style.innerHTML = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #fff;
        margin: 15% auto;
        padding: 20px;
        border-radius: 12px;
        width: 320px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: Arial, sans-serif;
    }

    .modal-content h3 {
        margin: 0;
        font-size: 1.2rem;
        color: #333;
    }

    .modal input {
        padding: 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 14px;
    }

    .modal-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .modal-buttons button {
        padding: 8px 14px;
        font-size: 14px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.3s;
    }

    #modal-confirm {
        background-color: #4CAF50;
        color: white;
    }

    #modal-confirm:hover {
        background-color: #45a049;
    }

    #modal-cancel {
        background-color: #f44336;
        color: white;
    }

    #modal-cancel:hover {
        background-color: #d32f2f;
    }

    #modal-message {
        font-size: 14px;
        color: #444;
    }

    #modal-message ul {
        padding-left: 20px;
        margin-top: 0;
    }
    `;
    document.head.appendChild(style);

    function abrirModal(titulo, mensagem = "", valorAtual = "", callback) {
        const input = document.getElementById("modal-input");
        const title = document.getElementById("modal-title");
        const msg = document.getElementById("modal-message");
        const btnConfirm = document.getElementById("modal-confirm");
        const btnCancel = document.getElementById("modal-cancel");

        title.textContent = titulo;
        msg.innerHTML = mensagem;
        input.value = valorAtual;
        input.style.display = valorAtual !== null ? "block" : "none";
        modal.style.display = "block";
        if (input.style.display !== "none") input.focus();

        const fecharModal = () => {
            modal.style.display = "none";
            btnConfirm.onclick = null;
            btnCancel.onclick = null;
        };

        btnConfirm.onclick = () => {
            callback(input.value.trim());
            fecharModal();
        };

        btnCancel.onclick = fecharModal;
    }

    // ========== AGENDA ==========
    const container = document.createElement("div");
    container.classList.add("container");
    document.body.appendChild(container);

    const botoesDiv = document.createElement("div");
    botoesDiv.classList.add("botao-container");

    let alunos = [];
    let agendamentos = {};

    function atualizarAlunos() {
        container.innerHTML = "";

        alunos.forEach(aluno => {
            if (!agendamentos[aluno]) agendamentos[aluno] = {};

            const card = document.createElement("div");
            card.classList.add("card");

            const nome = document.createElement("h3");
            nome.textContent = aluno;
            card.appendChild(nome);

            const calendario = document.createElement("input");
            calendario.type = "date";
            calendario.classList.add("calendario");

            const horariosDiv = document.createElement("div");
            horariosDiv.classList.add("horarios-div");

            calendario.addEventListener("change", () => {
                gerarHorarios(aluno, calendario.value, horariosDiv);
            });

            card.appendChild(calendario);
            card.appendChild(horariosDiv);
            container.appendChild(card);
        });
    }

    function gerarHorarios(aluno, data, horariosDiv) {
        if (!data) return;

        const dataFormatada = new Date(data + "T00:00:00");
        const dataTexto = dataFormatada.toLocaleDateString("pt-BR");
        horariosDiv.innerHTML = `<h4>Horários para ${dataTexto}</h4>`;

        const horarios = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
        if (!agendamentos[aluno][data]) agendamentos[aluno][data] = {};

        horarios.forEach(hora => {
            const linha = document.createElement("div");
            linha.classList.add("linha-horario");

            const btn = document.createElement("button");
            btn.innerText = hora;
            btn.classList.add("btn-horario");

            const pacienteSpan = document.createElement("span");
            pacienteSpan.classList.add("paciente");
            if (agendamentos[aluno][data][hora]) {
                btn.classList.add("ocupado");
                pacienteSpan.textContent = `Paciente: ${agendamentos[aluno][data][hora]}`;
            }

            btn.onclick = () => {
                if (!agendamentos[aluno][data][hora]) {
                    abrirModal("Agendar horário", "", "", (nome) => {
                        if (nome) {
                            agendamentos[aluno][data][hora] = nome;
                            pacienteSpan.textContent = `Paciente: ${nome}`;
                            btn.classList.add("ocupado");
                        }
                    });
                } else {
                    abrirModal(
                        `Paciente: ${agendamentos[aluno][data][hora]}`,
                        `<ul><li>Digite <strong>1</strong> para editar</li><li>Digite <strong>2</strong> para remover</li></ul>`,
                        "",
                        (opcao) => {
                            if (opcao === "1") {
                                abrirModal("Novo nome do paciente:", "", agendamentos[aluno][data][hora], (novoNome) => {
                                    if (novoNome) {
                                        agendamentos[aluno][data][hora] = novoNome;
                                        pacienteSpan.textContent = `Paciente: ${novoNome}`;
                                    }
                                });
                            } else if (opcao === "2") {
                                if (confirm("Confirmar remoção?")) {
                                    delete agendamentos[aluno][data][hora];
                                    pacienteSpan.textContent = "";
                                    btn.classList.remove("ocupado");
                                }
                            }
                        }
                    );
                }
            };

            linha.appendChild(btn);
            linha.appendChild(pacienteSpan);
            horariosDiv.appendChild(linha);
        });
    }

    function adicionarAluno() {
        abrirModal("Nome do aluno:", "", "", (nome) => {
            if (nome && !alunos.includes(nome)) {
                alunos.push(nome);
                atualizarAlunos();
            }
        });
    }

    function removerAluno() {
        abrirModal("Nome do aluno a remover:", "", "", (nome) => {
            if (nome && alunos.includes(nome)) {
                alunos = alunos.filter(a => a !== nome);
                atualizarAlunos();
            }
        });
    }

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Adicionar Aluno";
    btnAdd.onclick = adicionarAluno;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover Aluno";
    btnRemover.onclick = removerAluno;

    botoesDiv.appendChild(btnAdd);
    botoesDiv.appendChild(btnRemover);

    const header = document.querySelector(".cabecalho");
    if (header) {
        header.insertAdjacentElement("afterend", botoesDiv);
    } else {
        document.body.insertBefore(botoesDiv, container);
    }

    const rodape = document.createElement("div");
    rodape.classList.add("rodape");

    
    

    rodape.appendChild(btnSair);
    document.body.appendChild(rodape);
});
