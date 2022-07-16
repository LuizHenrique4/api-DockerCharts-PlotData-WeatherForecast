'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('Leitura',{	
		idDados: {
			field: 'idDados',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		cpu: {
			field: 'cpu',
			type: DataTypes.REAL,
			allowNull: false
		},
		memoriaRam: {
			field: 'memoriaRam',
			type: DataTypes.REAL,
			allowNull: false
		},
		disco: {
			field: 'disco',
			type: DataTypes.REAL,
			allowNull: false
		},
		dataHora: {
			field: 'dataHora',
			type: DataTypes.DATE, 
			allowNull: false

		}}, 
	{
		tableName: 'dados', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};
