import styles from './Lista.module.css';

function Lista({itens,remove}) {
    
    const grupo = itens.reduce((objAcc,objAtual) => {
        
        const data = objAtual.data.toLocaleDateString('pt-BR');
        
        if (!objAcc[data]) {
            objAcc[data] = [];
        }
        
        objAcc[data].push(objAtual);
        
        return objAcc;
    
    },{});

    const chavesData = Object.keys(grupo);

    return (
        <ul>
            {chavesData.map((d) => 
            <li key={d}>{d}
            {grupo[d].map((l) => 
            <ul>
                <li key={l.id}>{l.nome}</li><button onClick={() => remove(l.id)} class={styles.botaoRemover}>X</button>
            </ul>
            )}
            </li>
            )}
        </ul>
    )

}

export default Lista;