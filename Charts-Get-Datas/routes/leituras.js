var express = require("express");
var router = express.Router();
var sequelize = require("../models").sequelize;
var Leitura = require("../models").Leitura;
var env = process.env.NODE_ENV || "development";

/* Recuperar as últimas N leituras */
router.get("/ultimas/:idcaminhao", function (req, res, next) {
  // quantas são as últimas leituras que quer? 7 está bom?
  const limite_linhas = 7;

  var idcaminhao = req.params.idcaminhao;

  console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

  let instrucaoSql = "";

  if (env == "dev") {
    // abaixo, escreva o select de dados para o Workbench
    instrucaoSql = `select velocidade_do_vento, probabilidade_chuva, temperatura,
	umidade,data_hora, fkCidade from status_de_clima where fkCidade = 4 order by idStatus desc limit 1`;
  } else {
    console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n");
  }

  sequelize
    .query(instrucaoSql, {
      model: Leitura,
      mapToModel: true,
    })
    .then((resultado) => {
      console.log(`Encontrados: ${resultado.length}`);
      res.json(resultado);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

router.get("/tempo-real/:idcaminhao", function (req, res, next) {
  console.log("Recuperando caminhões");

  //var idcaminhao = req.body.idcaminhao; // depois de .body, use o nome (name) do campo em seu formulário de login
  var idcaminhao = req.params.idcaminhao;

  let instrucaoSql = "";

  if (env == "dev") {
    // abaixo, escreva o select de dados para o Workbench
    instrucaoSql = `select velocidade_do_vento, probabilidade_chuva, temperatura,
	umidade,data_hora, fkCidade from status_de_clima where fkCidade = 4 order by idStatus desc limit 1`;
  } else {
    console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n");
  }

  console.log(instrucaoSql);

  sequelize
    .query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
    .then((resultado) => {
      res.json(resultado[0]);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).send(erro.message);
    });
});

module.exports = router;
