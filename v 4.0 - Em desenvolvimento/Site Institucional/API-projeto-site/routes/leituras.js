var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */
router.get('/ultimas/:codigoServidor', function (req, res, next) {

    // quantas são as últimas leituras que quer? 7 está bom?
    const limite_linhas = 7;

    var codigoServidor = req.params.codigoServidor;

    console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

    let instrucaoSql = "";

    if (env == 'dev') {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `select cpu, 
		memoriaRam, 
		disco, 
		dataHora,
		DATE_FORMAT(dataHora,'%H:%i:%s') 
		as momento_grafico 
		from servidor 
		inner join dados on 
		fkCodigoServidor = ${codigoServidor} 
		order by idDados desc limit ${limite_linhas} ;`;

    } else if (env == 'production') {
        // abaixo, escreva o select de dados para o SQL Server
        instrucaoSql = `select cpu, 
		memoriaRam, 
		disco, 
		dataHora,
		DATE_FORMAT(dataHora,'%H:%i:%s') 
		as momento_grafico 
		from servidor 
		inner join dados on 
		fkCodigoServidor = ${codigoServidor} 
		order by idDados desc limit ${limite_linhas} ;`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
    }

    sequelize.query(instrucaoSql, {
        model: Leitura,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});


router.get('/dashboard-ow/:codigoServidor', function (req, res, next) {
    console.log('Recuperando servidor');

    //var codigoServidor = req.body.codigoServidor; // depois de .body, use o nome (name) do campo em seu formulário de login
    var codigoServidor = req.params.codigoServidor;

    let instrucaoSql = "";

    if (env == 'dev') {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql =
            `select 
        cpu, 
        memoriaRam, 
        disco, 
        dataHora, DATE_FORMAT(dataHora,'%H:%i:%s') 
		as momento_grafico 
        from servidor inner join dados on 
        fkCodigoServidor = ${codigoServidor} 
        order by idDados desc limit 1;`;

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

router.get('/historico-ow/:codigoServidor', function (req, res, next) {

    const limite_linhas = 7;

    var codigoServidor = req.params.codigoServidor;

    console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

    let instrucaoSql = "";

    if (env == 'dev') {
        //    abaixo, escreva o select de dados para o Workbench
        instrucaoSql = ` select
        round(avg(memoriaRam),2) as 'memoriaRam', 
        round(avg(cpu),2) as 'cpu', 
        round(avg(disco),2) as 'disco',
        cast(dataHora as date) as dia
        from dados where fkCodigoServidor = ${codigoServidor}
        group by cast(dataHora as date)
        order by cast(dataHora as date) desc limit ${limite_linhas}`;


    } else if (env == 'production') {
        // abaixo, escreva o select de dados para o SQL Server
        instrucaoSql = `select cpu, 
		memoriaRam, 
		disco, 
		dataHora,
		DATE_FORMAT(dataHora,'%H:%i:%s') 
		as momento_grafico 
		from servidor 
		inner join dados on 
		fkCodigoServidor = ${codigoServidor} 
		order by idDados desc limit ${limite_linhas} ;`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
    }

    sequelize.query(instrucaoSql, {
        model: Leitura,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

});

module.exports = router;