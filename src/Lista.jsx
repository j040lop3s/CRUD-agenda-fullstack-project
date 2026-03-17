import styles from './styles/Lista.module.css';

/* Componente que exibe as tarefas salvas no banco de dados. Recebe 
três props do componente pai App.jsx 

.reduce() cria um objeto de tarefas agrupadas por data. */

function Lista({ itens, remove, aoEditar }) {
    
    const grupo = itens.reduce((objAcc,objAtual) => {
        
        const data = objAtual.data.toLocaleDateString('pt-BR'); // Converte a data para o formato brasileiro (DD/MM/YYYY) para exibição e agrupamento.
        
        if (!objAcc[data]) {
            objAcc[data] = [];
        }
        
        objAcc[data].push(objAtual);
        
        return objAcc;
    
    },{});

    const chavesData = Object.keys(grupo); // Extrai as datas para um único array.

    return (
    <div className={styles.listContainer}>
        {chavesData.map((d) => (
            <div key={d}>
                <h3 className={styles.dateHeader}>{d}</h3>
                <div className={styles.taskList}>
                    {grupo[d].map((l) => (
                        <div key={l.id} className={styles.taskCard}>
                            <div className={styles.taskContent}>
                                <h4 className={styles.taskTitle}>{l.tarefa}</h4>
                                <p className={styles.taskDesc}>{l.descricao}</p>
                            </div>

                            <div className={styles.taskDetails}>
                                <span className={styles.taskDate}>{d}</span>
                                <div className={styles.taskActions}>
                                    <button onClick={() => aoEditar(l)} className={styles.botaoEditar}>
                                        Editar
                                    </button>
                                    <button onClick={() => remove(l.id)} className={styles.botaoRemover}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
    );
}

export default Lista;