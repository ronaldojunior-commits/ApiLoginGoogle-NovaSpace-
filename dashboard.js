
import { supabase } from "./supabase.js";

const nomeUsuario = document.getElementById("nomeUsuario");
const nomeCompleto = document.getElementById("nomeCompleto");
const emailUsuario = document.getElementById("emailUsuario");
const btnSair = document.getElementById("btnSair");

async function carregarPainel() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        window.location.href = "index.html";
        return;
    }

    const usuario = data.session.user;
    const nome = usuario.user_metadata?.nome || "Usuário";

    nomeUsuario.textContent = nome.split(" ")[0];
    nomeCompleto.textContent = nome;
    emailUsuario.textContent = usuario.email;
}

btnSair.addEventListener("click", async () => {
    btnSair.disabled = true;
    btnSair.textContent = "Saindo...";

    const { error } = await supabase.auth.signOut();

    if (error) {
        alert("Não foi possível sair da conta: " + error.message);
        btnSair.disabled = false;
        btnSair.textContent = "Sair da conta ↗";
        return;
    }

    window.location.href = "index.html";
});

carregarPainel();
