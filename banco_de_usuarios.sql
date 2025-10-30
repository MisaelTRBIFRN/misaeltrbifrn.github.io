create database banco_de_usuarios;

use banco_de_usuarios;

create table usuario(
	id 				integer auto_increment,
	nome 			varchar(200) not null,
    email 			varchar(50) not null unique,
    senha 			text not null,
    telefone 		varchar(15) not null,
    primary key(id)
);

insert into usuario values (null, 'Misael', 'misael33@gmail.com', 'Mis@el33.', '84 998765432');

select * from usuario;