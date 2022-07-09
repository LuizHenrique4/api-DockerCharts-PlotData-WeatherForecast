create database banco_clima_tempo;

use banco_clima_tempo;

create table pais(
	idPais int primary key auto_increment,
    nomePais varchar(45)
);

insert into pais values (null, "Canada");
insert into pais values (null, "Italia");
insert into pais values (null, "Alemanha");
insert into pais values (null, "Japao");
insert into pais values (null, "EUA");
insert into pais values (null, "França");
insert into pais values (null, "Espanha");
insert into pais values (null, "Inglaterra");

create table cidade(
	idCidade int primary key auto_increment,
    zona varchar(45),
    regiao varchar(45),
    tipo_de_clima varchar(30),
    fkPais int,
    foreign key(fkPais) references pais(idPais)
);

insert into cidade values (null,'Sul', 'Metropolitana', 'Sub-Tropical', 1);
insert into cidade values (null,'Leste', 'Urbana', 'Equatorial', 2);
insert into cidade values (null,'Centro', 'Rural', 'Desértico', 3);
insert into cidade values (null,'Sul', 'Metropolitana', 'Sub-Tropical', 4);
insert into cidade values (null,'Leste', 'Urbana', 'Equatorial', 5);
insert into cidade values (null,'Centro', 'Rural', 'Desértico', 6);
insert into cidade values (null,'Sul', 'Metropolitana', 'Sub-Tropical', 7);
insert into cidade values (null,'Leste', 'Urbana', 'Equatorial', 8);

create table status_de_clima(
	idStatus int primary key auto_increment,
	velocidade_do_vento decimal(5,2),
    probabilidade_chuva decimal(5,2),
    umidade decimal(5,2),
    temperatura decimal(5,2),
    data_hora datetime,
	fkCidade int,
    foreign key(fkCidade) references cidade(idCidade)
);

select * from status_de_clima;

-- drop database banco_clima_tempo;
