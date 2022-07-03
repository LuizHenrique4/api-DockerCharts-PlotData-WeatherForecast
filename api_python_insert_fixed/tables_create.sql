create database python_db_test;
use python_db_overwatch;

create table dados_overwatch(
    id int auto_increment primary key,
    cpu decimal(5,2),
    memoriaRam decimal(5,2),
    disco decimal(5,2),
    dataHora datetime
);

select * from dados_overwatch;