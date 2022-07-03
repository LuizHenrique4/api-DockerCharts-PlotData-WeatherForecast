create database banco_clima_tempo;

use banco_clima_tempo;

create table status_de_clima(
	velocidade_do_vento decimal(4,2),
    probabilidade_chuva decimal(4,2),
    umidade decimal(4,2),
    temperatura decimal(4,2),
    data_hora datetime
);

select * from status_de_clima;