/* Início da comunicação com back-end Supabase, importando as libs e instância necessárias;
express - framework para criar a API;
cors - middleware para lidar com cross-origin requests (front e back em portas diferentes); 
dotenv - carrega variáveis de ambiente .env (que guarda informações sensíveis de conexão com Banco de Dados);
createClient - método que faz a comunicação direta com o servidor;

Neste projeto, optei por utilizar a chave pública Anon Key;*/
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Configura as variáveis de ambiente do arquivo .env para que possam ser usadas no código.
dotenv.config();

const app = express(); // Cria a instância do Express para configurar a API;
const PORT = process.env.PORT || 3000; // Define a porta em que o servidor vai rodar, usando a variável de ambiente PORT ou 3000 como padrão.

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey); // Cria a instância do cliente Supabase usando a URL e a chave de acesso, permitindo que o servidor se comunique com o banco de dados Supabase.

app.use(cors()); // Habilita o CORS para permitir que o front-end (que roda em outra porta) faça requisições para este servidor.
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições, permitindo que o servidor receba dados em formato JSON do front-end.

// Rotas da API;

// Rota que busca as tarefas (READ);
app.get('/lista_tarefas', async (req, res) => {
    const { data, error } = await supabase
        .from('lista_tarefas')
        .select('*')
        .order('data', { ascending: true }); // Ordena as tarefas por data em ordem crescente (mais antigas primeiro).
    if (error) return res.status(400).json(error);
    res.json(data);
});

// Rota que cria uma nova tarefa (CREATE);
app.post('/lista_tarefas', async (req, res) => {

    console.log("Dados recebidos do formulário:", req.body);

    const { data, error } = await supabase
        .from('lista_tarefas')
        .insert([req.body]);

    if (error) return res.status(400).json(error);
    res.status(201).json(data);
});

// Rota que exclui uma tarefa (DELETE);
app.delete('/lista_tarefas/:id', async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from('lista_tarefas')
        .delete()
        .eq('id', id);

    if (error) {
        return res.status(400).json({ mensagem: "Erro ao excluir", detalhe: error });
    }

    res.status(200).json({ mensagem: "Tarefa removida com sucesso!" });
});

// Rota que edita uma tarefa (UPDATE);
app.put('/lista_tarefas/:id', async (req, res) => {
    const { id } = req.params;
    const { tarefa, descricao, data } = req.body;

    const { data: dataOutput, error } = await supabase
        .from('lista_tarefas')
        .update({ tarefa, descricao, data })
        .eq('id', id)
        .select();

    if (error) return res.status(400).json(error);
    res.json(dataOutput);
});

// Inicia o servidor na porta definida e exibe uma mensagem no console para confirmar que está rodando.
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});