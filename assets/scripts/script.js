const body = document.querySelector('body');

// Spin
const rotation = document.getElementById('rotation');

function ativarRotacao() {
    if (rotation) {
        rotation.style.opacity = '1';
        rotation.style.pointerEvents = 'visible';
        body.style.pointerEvents = 'none';
    }
}

function desativarRotacao() {
    if (rotation) {
        rotation.style.opacity = '0';
        rotation.style.pointerEvents = 'none';
        body.style.pointerEvents = 'visible';
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
    return telefone.length === 11;
}

function exibirErrorMessage(errorElement) {
    if (errorElement) {
        // errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.style.pointerEvents = 'visible';
    }
}

function desexibirErrorMessage(errorElement) {
    if (errorElement) {
        errorElement.style.display = 'none';
        errorElement.style.pointerEvents = 'none';
        // errorElement.textContent = "";
    }
}

// Validação inputs 

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

function validarEdicao() {
    let isValid = true;

    // Validação do nome
    if (!InomeEdit || !isNomeValid(InomeEdit.value) || InomeEdit.value.trim() === "") {
        exibirErrorMessage(errorMessageNome);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageNome);
    }

    // Validação do email
    if (!IemailEdit || !isEmailValid(IemailEdit.value)) {
        exibirErrorMessage(errorMessageEmail);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageEmail);
    }

    // Validação da senha
    if (!IsenhaEdit || !isSenhaValid(IsenhaEdit.value)) {
        exibirErrorMessage(errorMessageSenha);
        isValid = false;
    } else {
        desexibirErrorMessage(errorMessageSenha);
    }

    // Validação do telefone
    if (!ItelEdit || ItelEdit.value.trim() === "" || !isTelefoneValid(ItelEdit.value)) {
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

    ativarRotacao();

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
                window.location.href = '/index.html';

            } else if (res.status === 409) {
                alert('ERRO: Este email já está cadastrado!');
            } else {
                console.log('Erro ao cadastrar! \nVerifique os dados.');
            }
        })
        .catch(function (res) { console.log(res) })
        .finally(function () {
            desativarRotacao();
        })
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
const formularioCreateNewUser = document.getElementById("formCreateNewUser");

const IemailLogin = document.getElementById("emailLogin");
const IsenhaLogin = document.getElementById("senhaLogin");

const pageMenu = document.getElementById("pageMenu");

const delInput = document.getElementById("delInput");
const delBtn = document.getElementById("delBtn");
const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");

function isLogado() {
    const authToken = localStorage.getItem("authToken");

    return !!authToken;
}

if (pageMenu) {
    if (!isLogado()) {
        window.location.replace('/index.html');

        document.body.style.display = 'none';
        alert('Você precisa estar logado para acessar esta página!');
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            listarUsuarios();
        });
    }

    if (createBtn) {
        createBtn.addEventListener('click', createNewUser);
    }

    if (delBtn) {
        delBtn.addEventListener('click', deletarUsuario);
    }

    const formularioSelect = document.getElementById("formSelect");
    if (formularioSelect) {
        formularioSelect.addEventListener('submit', function (event) {
            event.preventDefault();

            consultarUsuario();
        })
    }

    if (editBtn) {
        editBtn.addEventListener('click', editarUsuario);
    }
}

function logar() {
    if (!formularioLogin) return;

    if (!validarLogin()) return;

    ativarRotacao();

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
                // exibirErrorMessage(errorMessageSenha, "Email ou senha incorretos!");

                if (!isEmailValid) {
                    exibirErrorMessage(errorMessageEmail);
                }

                if (isSenhaValid) {
                    exibirErrorMessage(errorMessageSenha);
                }
                throw new Error("Credenciais inválidas!");
            } else {
                console.log('Erro ao cadastrar! \nVerifique os dados.');
            }
        })
        .then(function (data) {
            console.log('Dados de login recebidos', data);

            localStorage.setItem("authToken", data.token);
            if (data.id) {
                localStorage.setItem("userLoggedId", data.id);
            }
            // alert('Login realizado com sucesso!');
            window.location.replace('/assets/pages/menu.html');
        })
        .catch(function (error) {
            console.error(error);
            // limparLogin();
        })
        .finally(function () {
            desativarRotacao();
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
    localStorage.removeItem("userLoggedId");

    if (!confirm(`Tem certeza que deseja encerrar a sessão?`)) {
        return;
    }

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
                'Authorization': `Bearer ${token}`
            }
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            } else if (res.status === 403) {
                logout();
            }
        })
        .then(function (data) {
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
                    <td id="tel">${user.telefone}</td>
                `

                tbody.appendChild(row);
            });
        })
        .catch(function (res) {
            console.log(res)
        })
};

function createNewUser() {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    validarCadastro();

    ativarRotacao();

    fetch("http://localhost:8080/usuarios",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
                alert('Novo usuário cadastrado com sucesso!');
                listarUsuarios();
            } else {
                console.log('Erro ao cadastrar! \nVerifique os dados.');
            }
        })
        .catch(function (res) { console.log(res) })
        .finally(function () {
            desativarRotacao();
        })
};

function limparCNU() {

    InomeCad.value = "";
    IemailCad.value = "";
    IsenhaCad.value = "";
    ItelCad.value = "";

    desexibirErrorMessage(errorMessageNome);
    desexibirErrorMessage(errorMessageEmail);
    desexibirErrorMessage(errorMessageSenha);
    desexibirErrorMessage(errorMessageTelefone);
}

if (formularioCreateNewUser) {
    formularioCreateNewUser.addEventListener('submit', function (event) {
        event.preventDefault();

        createNewUser();
        limparCNU();
    });
}

function deletarUsuario() {
    const token = localStorage.getItem("authToken");
    const userLoggedId = localStorage.getItem("userLoggedId");

    const idValue = delInput.value;
    const idToDelete = parseInt(idValue);

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    if (!idValue || isNaN(idToDelete) || idToDelete <= 0) {
        alert('O ID é inválido! Tente novamente!');
        delInput.value = '';
        return;
    }

    const loggedUserIdNum = parseInt(userLoggedId);
    if (loggedUserIdNum && idToDelete === loggedUserIdNum) {
        alert("ERROR: Você não pode deletar você mesmo, ao estar logado!");
        delInput.value = '';
        return;
    }

    if (!confirm(`Tem certeza que deseja deletar o usuário com ID ${idToDelete}?`)) {
        return;
    }

    ativarRotacao();

    fetch(`http://localhost:8080/usuarios/${idToDelete}`,
        {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(function (res) {
            if (res.status === 204) {
                alert('Usuário deletado com sucesso!');

                delInput.value = "";
                listarUsuarios();
            } else if (res.status === 403) {
                logout();
            } else if (res.status === 404) {
                alert(`Usuário com ID ${idToDelete} não encontrado!`);
            }
        })
        .then(function (data) {
            if (!data) {
                return;
            }
        })
        .catch(function (res) {
            console.log(res)
        })
        .finally(function () {
            desativarRotacao();
        })
};

// SELECIONAR
const formularioSelect = document.getElementById("formSelect");
const idConsult = document.getElementById("idConsult");

function consultarUsuario() {
    const token = localStorage.getItem("authToken");

    const id = idConsult.value;

    if (!id || isNaN(id)) {
        alert('O ID é inválido! Tente novamente!');
        return;
    }

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    ativarRotacao();

    fetch(`http://localhost:8080/usuarios`,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(function (res) {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 403) {
                logout();
            } else {
                return null;
            }
        })
        .then(function (data) {
            if (!data) return;

            const idNumber = parseInt(id);
            const user = data.find(u => u.id === idNumber)

            if (user) {
                renderizarUsuarioConsultado(user);
                // idConsult.value = "";
            } else {
                alert(`Usuário com ID ${id} não encontrado!`);

                const tbody = document.querySelector('#formSelect table tbody');
                if (tbody && tbody.rows.length > 0) {
                    const headerRow = tbody.rows[0].outerHTML;
                    tbody.innerHTML = headerRow;
                }
            }
        })
        .catch(function (res) {
            console.log(res)
        })
        .finally(function () {
            desativarRotacao();
        })
};

function renderizarUsuarioConsultado(user) {
    const table = document.querySelector('#formSelect table');
    const tbody = document.querySelector('#formSelect table tbody');
    if (!tbody) {
        return;
    }

    while (tbody.rows.length > 1) {
        tbody.deleteRow(1);
    }

    if (user) {
        table.style.opacity = '1';
        table.style.pointerEvents = 'visible';

        const row = document.createElement('tr');
        row.innerHTML = `
            <th id="ID">${user.id}</th>
            <td id="name">${user.nome}</td>
            <td id="email">${user.email}</td>
            <td id="tel">${user.telefone}</td>
        `

        tbody.appendChild(row);
    }
}

// EDITAR
const formularioEdit = document.getElementById("formEdit");

const IidEdit = document.getElementById("id");
const InomeEdit = document.getElementById("nomeEdit");
const IemailEdit = document.getElementById("emailEdit");
const IsenhaEdit = document.getElementById("senhaEdit");
const ItelEdit = document.getElementById("telEdit");

function editarUsuario() {
    const token = localStorage.getItem("authToken");

    desexibirErrorMessage(errorMessageNome);
    desexibirErrorMessage(errorMessageEmail);
    desexibirErrorMessage(errorMessageSenha);
    desexibirErrorMessage(errorMessageTelefone);

    const id = IidEdit.value;

    if (!id || isNaN(id)) {
        alert('O ID é inválido! Tente novamente!');
        return;
    }

    if (!token) {
        window.location.replace('/index.html');
        return;
    }

    // if (!validarEdicao()) {
    //     return;
    // }

    if (!confirm(`Tem certeza que deseja editar o usuário?`)) {
        return;
    }

    ativarRotacao();

    fetch("http://localhost:8080/usuarios",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: "PUT",
            body: JSON.stringify({
                id: id,
                nome: InomeEdit.value,
                email: IemailEdit.value,
                senha: IsenhaEdit.value,
                telefone: ItelEdit.value
            })
        })
        .then(function (res) {
            console.log(res);
            if (res.status === 200 || res.status === 204) {
                alert('Edição realizado com sucesso!');
                listarUsuarios();
                limparEdit();
            } else if (res.status === 403) {
                logout();
            } else {
                console.log('Erro ao editar! \nVerifique os dados.');
            }
        })
        .catch(function (res) { console.log(res) })
        .finally(function () {
            desativarRotacao();
        })
};

if (formularioEdit) {
    formularioEdit.addEventListener('submit', function (event) {
        event.preventDefault();

        editarUsuario();
    });
}

function limparEdit() {
    IidEdit.value = "";
    InomeEdit.value = "";
    IemailEdit.value = "";
    IsenhaEdit.value = "";
    ItelEdit.value = "";

    desexibirErrorMessage(errorMessageNome);
    desexibirErrorMessage(errorMessageEmail);
    desexibirErrorMessage(errorMessageSenha);
    desexibirErrorMessage(errorMessageTelefone);
}