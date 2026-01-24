import Lembrete from "./modelo.js";
import { useState } from 'react';
import styles from './Form.module.css';

function Form({adiciona}) {
    const [nome,setNome] = useState("");
    const [data,setData] = useState("");
    const [erro,setErro] = useState("");

    const InputText = (e) => {
        setNome(e.target.value);
    };

    const InputDate = (e) => {
        setData(e.target.value);
    };

    const SubmitHandler = (e) => {
        e.preventDefault();

        try {

            const objLembrete = new Lembrete(nome,data);

            adiciona(objLembrete);
            
            setNome("");
            setData("");
            setErro("");
        } catch (error) {

            setErro(error.message);
        }

    }

    return (
        
        <form onSubmit={SubmitHandler} className={styles.container}>
            <div className={styles.inputGrupo}>
                <label>Nome:</label>
                <input type="text" onChange={InputText} value={nome} className={styles.campo}></input>
            </div>

            <div>
                <label>Data:</label>
                <input type="date" onChange={InputDate} value={data}></input>
            </div>

            
            <p>{erro ? erro : ""}</p>

            <button type="submit" className={styles.botaoCriar}>Criar</button>
        </form>
    )
}

export default Form;