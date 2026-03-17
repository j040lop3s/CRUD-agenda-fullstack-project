import Form from './Form.jsx';
import Lista from './Lista.jsx';
import styles from './styles/App.module.css';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

/* Componente pai da aplicação. Ele cria os dois estados que armazenam 
as tarefas e a tarefa selecionada para edição;

A função 'selecionarParaEditar' é quem recebe a tarefa e define o estado;
*/

function App() {
    const [tarefas, setTarefas] = useState([]);
    const [editando, setEditando] = useState(null);

    function selecionarParaEditar(tarefa) {
        
        setEditando(tarefa);

    }

    // useCallback é utilizado para evitar a recriação da função a cada renderização;
    // Fetch obtém o json de tarefas (com tarefa, descrição e data) do banco de dados e as armazena no estado;
    // A conversão de string para Date é necessária porque o Supabase retorna as datas como strings, e precisamos delas como objetos Date para manter a funcionalidade de agrupamento e ordenação.
    const carregarTarefas = useCallback(async () => {
        const { data, error } = await supabase
            .from('lista_tarefas')
            .select('*')
            .order('data', { ascending: true });

        if (error) {
            console.error("Erro ao buscar dados:", error);
            return;
        }

        const dadosTratados = data.map(item => ({
            ...item,
            data: new Date(item.data.split('T')[0] + 'T00:00:00')
        }));
        setTarefas(dadosTratados);
    }, []);

    // Carrega as tarefas do banco de dados uma vez quando o componente é montado;
    useEffect(() => {
        carregarTarefas();
    }, [carregarTarefas]);

    // Função de excluir diretamente do banco de dados.
    async function del(objID) {
        const { error } = await supabase
            .from('lista_tarefas')
            .delete()
            .eq('id', objID);

        if (!error) {
            setTarefas(prev => prev.filter(item => item.id !== objID));
        }
    }

    // Função de comparação para ordenar as tarefas por data. A ordenação é feita antes de passar as tarefas para o componente Lista, garantindo que elas sejam exibidas em ordem cronológica.
    function comparar(a, b) {
        return a.data - b.data;
    }

    const ListaEmOrdem = [...tarefas].sort(comparar); // Cria uma cópia do array de tarefas e o ordena usando a função de comparação.

    return (
    <div className={styles.container}>

        <h1 className={styles.logo}>Agenda Online</h1>

        <main className={styles.mainContent}>
            <aside>
                <Form 
                    aoSucesso={carregarTarefas} 
                    tarefaParaEditar={editando} 
                    limparEdicao={() => setEditando(null)} 
                />
            </aside>
            <section>
                <div className={styles.tasksHeader}>
                    <h2 className={styles.tasksHeaderTitle}>Suas Tarefas</h2>
                </div>
                <Lista itens={ListaEmOrdem} remove={del} aoEditar={selecionarParaEditar} />
            </section>
        </main>
    </div>
    );
}

export default App;