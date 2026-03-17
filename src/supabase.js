import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/* Este arquivo cria uma instância do cliente Supabase, que será utilizada 
para interagir com o banco de dados. 

Obtém as credenciais do servidor a partir de 'import.meta.env'

exporta um objeto com métodos: .from() / .select() / .insert() / .update() / .delete()
que execução chamadas fetch internamente. */