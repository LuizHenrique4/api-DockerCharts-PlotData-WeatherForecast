'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	let Endereco = sequelize.define('Endereco', {
		idEndereco: {
			field: 'idEndereco',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		logradouro: {
			field: 'logradouro',
			type: DataTypes.STRING,
			allowNull: false
		},
		complemento: {
			field: 'complemento',
			type: DataTypes.STRING,
			allowNull: false
		},
		cep: {
			field: 'cep',
			type: DataTypes.STRING,
			allowNull: false
		},
		numero: {
			field: 'numero',
			type: DataTypes.STRING,
			allowNull: false
		},
		bairro: {
			field: 'bairro',
			type: DataTypes.STRING,
			allowNull: false
		},
		uf: {
			field: 'uf',
			type: DataTypes.STRING,
			allowNull: false
		}},
		{
			tableName: 'endereco',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Endereco;
};
