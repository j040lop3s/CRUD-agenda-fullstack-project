import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import styles from './styles/Form.module.css';
import { supabase } from './supabase';

/* Esquema de validação usando Zod, que define as regras para os campos 
de entrada - tarefa, descrição e data.

.string() - estabelece que o campo deve ser uma string 

.min(stringLength, mensagemError) - garante que o campo tenha pelo menos 
o número especificado de caracteres e que nenhum esteja vazio.

.transform(arrowFunction) - é um método que permite transformar o valor do campo
antes de ser retornado. Aqui ele converte a string da data em um objeto Date, adicionando 'T00:00:00' 
para garantir que seja interpretada como meia-noite do dia selecionado, 
evitando problemas de fuso horário.

.refine(arrowFunction, objetoMensagem) - é um método de lógica personalizada,
que recebe o valor e retorna um boolean true ou false. Neste código, verifica
se a data é hoje ou no futuro.*/

const schema = z.object({
    tarefa: z.string().min(1,"O campo deve estar preenchido!"),
    descricao: z.string().min(1,"O campo deve estar preenchido!"),
    data: z.string()
        .min(1, "Selecione uma data!")
        .transform((d) => new Date(d + 'T00:00:00'))
        .refine((d) => {
            const dataHoje = new Date(); // Cria um objeto Date para a data atual;
            dataHoje.setHours(0, 0, 0, 0); // Zera as horas, minutos, segundos e milissegundos para comparar apenas a data (sem considerar o horário);
            return d >= dataHoje; // Se a data da tarefa for hoje ou no futuro, retorna true; caso contrário, retorna false;
        }, { 
            message: "A data deve ser hoje ou no futuro" 
        })
        
});

/* Aqui é criado o componente de formulário, que vai receber três props
do componente renderizador App.jsx;

Dentro do componente é utilizada a desestruturação de objetos para extrair
as funções e variáveis necessárias do hook useForm. A função especial recebe
um objeto resolver que é configurado para usar o zodResolver, passando o 
esquema de validação criado anteriormente.


UseEffect é utilizado e acionado sempre que a prop de estado tarefaParaEditar (definida em App.jsx) for alterada.
Caso não seja um valor falsy, o formulário será preenchido com os dados da tarefa a ser editada.*/

function Form({ aoSucesso, tarefaParaEditar, limparEdicao }) {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ 
        resolver: zodResolver(schema) 
    });

    useEffect(() => {
        
        if (tarefaParaEditar) {
            // Obtém a data do objeto, converte em string padronizada no formato ISO, divide essa string em um array a partir do "T" como delimitador e armazena o primeiro item desse array (YYYY-MM-DD);
            const dataFormatada = tarefaParaEditar.data.toISOString().split('T')[0];
            
            reset({
                tarefa: tarefaParaEditar.tarefa, // reseta os campos do formulário com os valores da tarefa a ser editada;
                descricao: tarefaParaEditar.descricao,
                data: dataFormatada
            });
    
    }}, [tarefaParaEditar, reset]);

    
    const onSubmit = async (dados) => {
        const ehEdicao = !!tarefaParaEditar;
        let resultado;

        if (ehEdicao) {
            resultado = await supabase
                .from('lista_tarefas')
                .update(dados)
                .eq('id', tarefaParaEditar.id);
        } else {
            resultado = await supabase
                .from('lista_tarefas')
                .insert([dados]);
        }

        if (!resultado.error) {
            aoSucesso();
            reset();
            if (ehEdicao) limparEdicao();
        }
    };

    return (
    
    <div className={styles.addTaskCard}>
        <div className={styles.cardTitle}>
            {tarefaParaEditar ? "Editar Tarefa" : "Nova Tarefa"}
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formBody}>
            <div className={styles.formField}>
                <label>Título da Tarefa</label>
                <input {...register("tarefa")} placeholder="Ex: Estudar React" />
                {errors.tarefa && <span className="error">{errors.tarefa.message}</span>}
            </div>

            <div className={styles.formField}>
                <label>Descrição Detalhada</label>
                <textarea {...register("descricao")} placeholder="O que precisa ser feito?" />
                {errors.descricao && <span className="error">{errors.descricao.message}</span>}
            </div>

            <div className={styles.formField}>
                <label>Data de Entrega</label>
                <input type="date" {...register("data")} />
                {errors.data && <span className="error">{errors.data.message}</span>}
            </div>

            <button type="submit" className={styles.addButton}>
                {tarefaParaEditar ? "Salvar Alterações" : "Criar Tarefa"}
            </button>
        </form>
    </div>
    )
};

export default Form;