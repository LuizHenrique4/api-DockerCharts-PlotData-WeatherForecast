"use strict";

module.exports = (sequelize, DataTypes) => {
  let Status_de_clima = sequelize.define(
    "Status_de_clima",
    {
      idStatus: {
        field: "idStatus",
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      velocidade_do_vento: {
        field: "velocidade_do_vento",
        type: DataTypes.REAL,
        allowNull: false,
      },
      probabilidade_chuva: {
        field: "probabilidade_chuva",
        type: DataTypes.REAL,
        allowNull: false,
      },
      umidade: {
        field: "umidade",
        type: DataTypes.REAL,
        allowNull: false,
      },
      temperatura: {
        field: "temperatura",
        type: DataTypes.REAL,
        allowNull: false,
      },
      data_hora: {
        field: "data_hora",
        type: DataTypes.DATE,
        allowNull: false,
      },
      momento_grafico: {
        type: DataTypes.VIRTUAL,
        allowNull: true,
      },
    },
    {
      tableName: "status_de_clima",
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  return Status_de_clima;
};
