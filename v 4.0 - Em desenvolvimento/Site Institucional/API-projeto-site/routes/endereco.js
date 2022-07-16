var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Endereco = require('../models').Endereco;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.post('/selecionar', function (req, res, next) {
	console.log('Recuperando endereço');

    let idEndereco = req.body.idEndereco;

	let instrucaoSql = `select * from endereco order by idEndereco = ${idEndereco} desc;`;
	
    console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Endereco
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.idEndereco );
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