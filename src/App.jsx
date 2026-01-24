import Form from './Form.jsx';
import Lista from './Lista.jsx';
import { useState } from 'react';

function App() {
    const [lembretes,setLembretes] = useState([]);

    function add(obj) {
        setLembretes([...lembretes,obj]);
    }

    function del(objID) {
        setLembretes(ModLista => ModLista.filter(item => item.id !== objID));
    }

    function comparar(a,b) {
        return a.data - b.data;
    }

    const ListaEmOrdem = [...lembretes].sort(comparar);

    return (
        <>
        <h1>Lembretes</h1>
        <Form  adiciona={add}/>

        <h2>Lista</h2>
        <Lista itens={ListaEmOrdem} remove={del}/>
        </>
    )
}

export default App;

