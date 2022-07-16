var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Equipe = require('../models').Equipe;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var loginUsuario = req.body.emailEmpresa_login;
	var senhaUsuario = req.body.senhaEmpresa_login; // depois de .body, use o nome (name) do campo em seu formulário de login

	let instrucaoSql = `select * from Usuario where loginUsuario='${loginUsuario}' and senhaUsuario='${senhaUsuario}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Equipe
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.loginUsuario);
			console.log('sessoes: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function (req, res, next) {
	console.log('Criando um usuário');

	Equipe.create({
		nomeUsuario: req.body.nomeUsuario,
		loginUsuario: req.body.loginUsuario,
		tipoUsuario: req.body.tipoUsuario,
		senhaUsuario: req.body.senhaUsuario
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* Verificação de usuário */
router.get('/sessao/:cadastro-user', function (req, res, next) {
	let loginUsuario = req.params.loginUsuario;
	console.log(`Verificando se o usuário ${loginUsuario} tem sessão`);

	let tem_sessao = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == loginUsuario) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${loginUsuario} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});


/* Logoff de usuário */
router.get('/sair/:cadastro-user', function (req, res, next) {
	let loginUsuario = req.params.loginUsuario;
	console.log(`Finalizando a sessão do usuário ${loginUsuario}`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != loginUsuario) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${loginUsuario} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os usuários');
	Equipe.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/cadastro-user/:loginUsuario', function (req, res, next) {
	console.log('Recuperando usuario');

	//var codigoServidor = req.body.codigoServidor; // depois de .body, use o nome (name) do campo em seu formulário de login
	var loginUsuario = req.params.loginUsuario;

	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql =
			`select * from usuario where loginUsuario = ${loginUsuario} 
		and senhaUsuario = ${senhaUsuario} desc;`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select * from usuario where loginUsuario = ${loginUsuario} 
		and senhaUsuario = ${senhaUsuario} desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}

	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});


module.exports = router;
