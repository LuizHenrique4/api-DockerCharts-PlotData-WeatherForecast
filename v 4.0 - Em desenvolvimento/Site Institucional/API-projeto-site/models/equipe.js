'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Equipe = sequelize.define('Equipe',{
		idUsuario: {
			field: 'idUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nomeUsuario: {
			field: 'nomeUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		loginUsuario: {
			field: 'loginUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		senhaUsuario: {
			field: 'senhaUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		tipoUsuario: {
			field: 'tipoUsuario',
			type: DataTypes.STRING,
			allowNull: false
		}}, 
	{
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Equipe;
};
