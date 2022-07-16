let login_usuarios;
let nome_usuarios;

function redirecionar_login() {
    window.location.href = 'cadastro-user.html';
}

function verificar_autenticacao() {
    login_usuarios = sessionStorage.login_usuario_meuapp;
    nome_usuarios = sessionStorage.nome_usuario_meuapp;

    if (login_usuarios != undefined) {
        b_usuario.innerHTML = nome_usuarios;
        validar_sessao();
    }
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/equipe/sessao/${login_usuarios}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                logoff();
            }
        });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuarios}`, { cache: 'no-store' });
}