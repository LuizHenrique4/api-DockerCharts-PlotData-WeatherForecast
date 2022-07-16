	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Empresa = sequelize.define('Empresa',{
		idEmpresa: {
			field: 'idEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nomeEmpresa: {
			field: 'nomeEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},
		cnpjEmpresa: {
			field: 'cnpjEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},

		emailEmpresa: {
			field: 'emailEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefoneEmpresa: {
			field: 'telefoneEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},}, 
	{
		tableName: 'empresa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Empresa;
};
