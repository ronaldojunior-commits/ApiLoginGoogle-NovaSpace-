
import { supabase } from "./supabase.js";

const loginForm = document.getElementById("loginForm");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");
const googleButton = document.getElementById("googleButton");

// Mostrar ou ocultar senha
togglePassword.addEventListener("click", () => {
    const hidden = password.type === "password";

    password.type = hidden ? "text" : "password";
    togglePassword.textContent = hidden ? "Ocultar" : "Mostrar";
});

// Login com email e senha
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = password.value;

    if (!email || !senha) {
        message.textContent = "Preencha todos os campos.";
        return;
    }

    message.textContent = "Entrando...";

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: senha
    });

    if (error) {
        message.textContent = "Erro ao entrar: " + error.message;
        return;
    }

    message.textContent = "Login realizado com sucesso!";

    window.location.href = "dashboard.html";
});

// Login com Google pelo Supabase
async function loginGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + "/dashboard.html"
        }
    });

    if (error) {
        message.textContent = "Erro no login Google: " + error.message;
    }
}

// Criar botão Google
if (googleButton) {
    googleButton.innerHTML = `
        <button type="button" id="googleLogin">
            Continuar com Google
        </button>
    `;

    document.getElementById("googleLogin").addEventListener("click", loginGoogle);
}

// Recuperação de senha
document.getElementById("forgotPassword").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "recuperar-senha.html";
});

// Cadastro
document.getElementById("registerLink").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "cadastro.html";
});

// Verificar sessão existente
const { data: { session } } = await supabase.auth.getSession();

if (session) {
    window.location.href = "dashboard.html";
}
