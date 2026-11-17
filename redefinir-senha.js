
import { supabase } from "./supabase.js";

const redefinirForm = document.getElementById("redefinirForm");
const mensagem = document.getElementById("mensagem");
const btnRedefinir = document.getElementById("btnRedefinir");

const { data } = await supabase.auth.getSession();

if (!data.session) {
    mensagem.textContent =
        "Link inválido ou expirado. Solicite uma nova recuperação de senha.";

    btnRedefinir.disabled = true;
}

redefinirForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha.length < 6) {
        mensagem.textContent =
            "A senha precisa ter pelo menos 6 caracteres.";
        return;
    }

    if (senha !== confirmarSenha) {
        mensagem.textContent = "As senhas não são iguais.";
        return;
    }

    btnRedefinir.disabled = true;
    btnRedefinir.textContent = "Salvando...";
    mensagem.textContent = "";

    const { error } = await supabase.auth.updateUser({
        password: senha
    });

    btnRedefinir.disabled = false;
    btnRedefinir.textContent = "Salvar nova senha →";

    if (error) {
        mensagem.textContent = "Erro: " + error.message;
        return;
    }

    mensagem.textContent =
        "Senha alterada com sucesso! Redirecionando para o login...";

    await supabase.auth.signOut();

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
});
