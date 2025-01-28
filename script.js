let codigoEnviado = '';
let tarefas = [];
let tarefaEditando = null;

// Carregar tarefas do localStorage quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        atualizarListaTarefas();
    }
});

function adicionarTarefa() {
    const descricao = document.getElementById('descricaoTarefa').value;
    const data = document.getElementById('dataTarefa').value;

    if (descricao && data) {
        const tarefa = {
            id: Date.now(),
            descricao: descricao,
            data: data,
            concluida: false
        };

        tarefas.push(tarefa);
        salvarTarefas();
        atualizarListaTarefas();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function editarTarefa(id) {
    tarefaEditando = tarefas.find(t => t.id === id);
    if (tarefaEditando) {
        document.getElementById('descricaoEdicao').value = tarefaEditando.descricao;
        document.getElementById('dataEdicao').value = tarefaEditando.data;
        document.getElementById('formularioEdicao').style.display = 'block';
        document.getElementById('formularioTarefa').style.display = 'none';
    }
}

function salvarEdicao() {
    const descricao = document.getElementById('descricaoEdicao').value;
    const data = document.getElementById('dataEdicao').value;

    if (descricao && data) {
        tarefaEditando.descricao = descricao;
        tarefaEditando.data = data;
        salvarTarefas();
        atualizarListaTarefas();
        cancelarEdicao();
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}

function cancelarEdicao() {
    tarefaEditando = null;
    document.getElementById('formularioEdicao').style.display = 'none';
    document.getElementById('formularioTarefa').style.display = 'block';
}

function toggleTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        atualizarListaTarefas();
    }
}

function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarTarefas();
    atualizarListaTarefas();
}

function atualizarListaTarefas() {
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = '';

    tarefas.sort((a, b) => new Date(a.data) - new Date(b.data));

    tarefas.forEach(tarefa => {
        const div = document.createElement('div');
        div.className = `tarefa ${tarefa.concluida ? 'concluida' : ''}`;
        div.innerHTML = `
            <h3 onclick="editarTarefa(${tarefa.id})">${tarefa.descricao}</h3>
            <p>Data: ${formatarData(tarefa.data)}</p>
            <div class="botoes">
                <button onclick="toggleTarefa(${tarefa.id})">
                    ${tarefa.concluida ? 'Reabrir' : 'Concluir'}
                </button>
                <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
}

function limparFormulario() {
    document.getElementById('descricaoTarefa').value = '';
    document.getElementById('dataTarefa').value = '';
}

function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
