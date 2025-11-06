// Validação Front-End
const errorMessageNome = document.querySelector('.errorNome');
const errorMessageEmail = document.querySelector('.errorEmail');
const errorMessageSenha = document.querySelector('.errorSenha');
const errorMessageTelefone = document.querySelector('.errorTel');

function isNomeValid(nome) {
    return nome.length >= 1;
}

function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isSenhaValid(senha) {
    return senha.length >= 3;
}

function isTelefoneValid(telefone) {
    return telefone.length = 12;
}

function exibirErrorMessage(errorElement) {
    if (errorElement) {
        // errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function desexibirErrorMessage(errorElement) {
    if (errorElement) {
        errorElement.style.display = 'none';
        // errorElement.textContent = "";
    }
}

// Validação inputs 

function validarLogin() {
    let isValid = true;

    // Validação do email
    if (!IemailLogin || !isEmailValid(IemailLogin.value)) {
        exibirErrorMessage(errorMessageEmail);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageEmail);
    }

    // Validação da senha
    if (!IsenhaLogin || !isSenhaValid(IsenhaLogin.value)) {
        exibirErrorMessage(errorMessageSenha);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageSenha);
    }

    return isValid;
}

function validarCadastro() {
    let isValid = true;

    // Validação do nome
    if (!InomeCad || !isNomeValid(InomeCad.value) || InomeCad.value.trim() === "") {
        exibirErrorMessage(errorMessageNome);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageNome);
    }

    // Validação do email
    if (!IemailCad || !isEmailValid(IemailCad.value)) {
        exibirErrorMessage(errorMessageEmail);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageEmail);
    }

    // Validação da senha
    if (!IsenhaCad || !isSenhaValid(IsenhaCad.value)) {
        exibirErrorMessage(errorMessageSenha);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageSenha);
    }

    // Validação do telefone
    if (!ItelCad || ItelCad.value.trim() === "" || !isTelefoneValid(ItelCad.value)) {
        exibirErrorMessage(errorMessageTelefone);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageTelefone);
    }

    return isValid;
}

// CADASTRO
const formularioCadastro = document.getElementById("formCadastro");

const InomeCad = document.getElementById("nomeCad");
const IemailCad = document.getElementById("emailCad");
const IsenhaCad = document.getElementById("senhaCad");
const ItelCad = document.getElementById("telCad");

function cadastrar() {
    if (!formularioCadastro) return;

    validarCadastro();

    fetch("http://localhost:8080/usuarios",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: InomeCad.value,
                email: IemailCad.value,
                senha: IsenhaCad.value,
                telefone: ItelCad.value
            })
        })
        .then(function (res) {
            console.log(res);
            if (res.status === 201) {
                console.log('Cadastro realizado com sucesso!');
                alert('Cadastro realizado com sucesso!');
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 500);
            } else {
                console.log('Erro ao cadastrar! \nVerifique os dados.');
            }
        })
        .catch(function (res) { console.log(res) })
};

function limparCad() {
    if (!formularioCadastro) return;

    InomeCad.value = "";
    IemailCad.value = "";
    IsenhaCad.value = "";
    ItelCad.value = "";

    desexibirErrorMessage(errorMessageNome);
    desexibirErrorMessage(errorMessageEmail);
    desexibirErrorMessage(errorMessageSenha);
    desexibirErrorMessage(errorMessageTelefone);
}

if (formularioCadastro) {
    formularioCadastro.addEventListener('submit', function (event) {
        event.preventDefault();

        cadastrar();
        limparCad();
    });
}

// LOGIN
const formularioLogin = document.getElementById("formLogin");

const IemailLogin = document.getElementById("emailLogin");
const IsenhaLogin = document.getElementById("senhaLogin");

function logar() {
    if (!formularioLogin) return;

    if (!validarLogin()) return;

    fetch("http://localhost:8080/usuarios/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email: IemailLogin.value,
                senha: IsenhaLogin.value
            })
        })
        .then(function (res) {
            console.log(res);
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 403) {
                exibirErrorMessage(errorMessageSenha, "Email ou senha incorretos!");
                throw new Error("Credenciais inválidas!");
            } else {
                console.log('Erro ao cadastrar! \nVerifique os dados.');
            }
        })
        .then(function (data) {
            localStorage.setItem("authToken", data.token);
            alert('Login realizado com sucesso!');
            setTimeout(() => {
                window.location.replace('/assets/pages/menu-logado/menu.html');
            }, 1000);
        })
        .catch(function (res) {
            console.error(error);
            limparLogin();
        })
};

function limparLogin() {
    if (!formularioCadastro && !IemailLogin && !IsenhaLogin) return;

    IemailLogin.value = "";
    IsenhaLogin.value = "";

    desexibirErrorMessage(errorMessageEmail);
    desexibirErrorMessage(errorMessageSenha);
}

if (formularioLogin) {
    formularioLogin.addEventListener('submit', function (event) {
        event.preventDefault();

        logar();
    });
}

// LOGOUT
function logout() {
    // alert('Deseja mesmo finalizar a sessão?')

    localStorage.removeItem("authToken");
    alert('Sessão encerrada!');
    window.location.replace('/index.html');
}