
import { supabase } from "./supabase.js";

const recuperarForm = document.getElementById("recuperarForm");
const mensagem = document.getElementById("mensagem");
const btnRecuperar = document.getElementById("btnRecuperar");

recuperarForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    btnRecuperar.disabled = true;
    btnRecuperar.textContent = "Enviando...";
    mensagem.textContent = "";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/redefinir-senha.html"
    });

    btnRecuperar.disabled = false;
    btnRecuperar.textContent = "Enviar link de recuperação →";

    if (error) {
        mensagem.textContent = "Não foi possível enviar o e-mail: " + error.message;
        return;
    }

    mensagem.textContent =
        "Se o endereço estiver cadastrado, você receberá um e-mail com as instruções para redefinir sua senha.";
});
