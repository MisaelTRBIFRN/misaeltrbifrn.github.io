// Spin
const rotation = document.getElementById('rotation');

function ativarRotacao() {
    if (rotation) {
        rotation.style.display = 'block';
    }
}

function desativarRotacao() {
    if (rotation) {
        rotation.style.display = 'none';
    }
}

// Validação Front-End
// const errorMessageId = document.querySelector('.errorId');
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
    return telefone.length === 12;
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
                // alert('Cadastro realizado com sucesso!');
                ativarRotacao();
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 1500);
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

const pageMenu = document.getElementById("pageMenu");

function isLogado() {
    const authToken = localStorage.getItem("authToken");

    return !!authToken;
}

if (pageMenu) {
    document.addEventListener('DOMContentLoaded', function() {
        if (!isLogado()) {
            window.location.replace('/index.html');
    
            document.body.style.display = 'none';
            // alert('Você precisa estar logado para acessar esta página!');
        } else {
            listarUsuarios();
        }
    });

    if (delBtn) {
        delBtn.addEventListener('click', deletarUsuario);
    }
}

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
            // alert('Login realizado com sucesso!');
            ativarRotacao();
            setTimeout(() => {
                window.location.replace('/assets/pages/menu.html');
            }, 1500);
        })
        .catch(function (error) {
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
    ativarRotacao();
    window.location.replace('/index.html');
}

// fetchs
function listarUsuarios() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    fetch("http://localhost:8080/usuarios",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            } else if (res.status === 403) {
                logout();
            }
        })
        .then(function(data) {
            if (!data) return;

            const tbody = document.querySelector('.box-get table tbody');
            if (!tbody) {
                return;
            }

            const headerRow = tbody.rows[0].outerHTML;
            tbody.innerHTML = headerRow;

            data.forEach(user => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <th id="ID">${user.id}</th>
                    <td id="name">${user.nome}</td>
                    <td id="email">${user.email}</td>
                    <td id="password">${user.senha}</td>
                    <td id="tel">${user.telefone}</td>
                `

                tbody.appendChild(row);
            });
        })
        .catch(function (res) { 
            console.log(res) 
        })
};

function deletarUsuario() {
    const token = localStorage.getItem("authToken");

    const id = delInput.value;

    if (!id || isNaN(id)) {
        alert('O ID é inválido! Tente novamente!');
        return;
    }

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    if (!confirm(`Tem certeza que deseja deletar o usuário com ID ${id}?`)) {
        return;
    }

    fetch(`http://localhost:8080/usuarios/${id}`,
        {
            method: "DELETE",
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then(function (res) {
            if (res.status === 204) {
                alert('Usuário deletado com sucesso!');

                delInput.value = "";
                listarUsuarios();
            } else if (res.status === 403) {
                logout();
            }
        })
        .then(function(data) {
            if (!data) return;

            
        })
        .catch(function (res) { 
            console.log(res) 
        })
};

// EDITAR
/*
const formularioEdit = document.getElementById("formEdit");

const InomeEdit = document.getElementById("nomeEdit");
const IemailEdit = document.getElementById("emailEdit");
const IsenhaEdit = document.getElementById("senhaEdit");
const ItelEdit = document.getElementById("telEdit");

function editarUsuario() {
    const token = localStorage.getItem("authToken");

    const id = delInput.value;

    if (!id || isNaN(id)) {
        alert('O ID é inválido! Tente novamente!');
        return;
    }

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    validarCadastro();

    if (!confirm(`Tem certeza que deseja editar o usuário?`)) {
        return;
    }

    fetch("http://localhost:8080/usuarios",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                id: id.value,
                nome: InomeEdit.value,
                email: IemailEdit.value,
                senha: IsenhaEdit.value,
                telefone: ItelEdit.value
            })
        })
        .then(function (res) {
            console.log(res);
            if (res.status === 201) {
                alert('Edição realizado com sucesso!');
            } else {
                console.log('Erro ao cadastrar! \nVerifique os dados.');
            }
        })
        .catch(function (res) { console.log(res) })
};
*/