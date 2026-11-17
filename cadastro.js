
import { supabase } from "./supabase.js";

const cadastroForm = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagem");
const btnCadastrar = document.getElementById("btnCadastrar");

cadastroForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        return;
    }

    if (senha.length < 6) {
        mensagem.textContent = "A senha precisa ter pelo menos 6 caracteres.";
        return;
    }

    btnCadastrar.disabled = true;
    btnCadastrar.textContent = "Criando conta...";
    mensagem.textContent = "";

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
            data: {
                nome: nome
            },
            emailRedirectTo: window.location.origin + "/index.html"
        }
    });

    btnCadastrar.disabled = false;
    btnCadastrar.textContent = "Criar minha conta →";

    if (error) {
        mensagem.textContent = "Erro: " + error.message;
        return;
    }

    if (data.session) {
        mensagem.textContent = "Conta criada com sucesso! Redirecionando...";

        window.location.href = "dashboard.html";
    } else {
        mensagem.textContent =
            "Cadastro realizado! Verifique seu e-mail para confirmar sua conta.";
        
        cadastroForm.reset();
    }
});
