drop table infoVoo;
drop table proposta;
drop table processo;
drop table utilizadores;


create table utilizadores(
  id serial primary key,
  nome varchar(50)
);


create table processo(
  id serial primary key,
  cidadeDestino varchar(50) NOT NULL,
  checkIn date,
  checkOut date ,
  numAdultos int NOT NULL, 
  radius int,
  origem varchar(50) NOT NULL,
  partida date NOT NULL
);


create table proposta(
  id serial primary key,
  idProcesso int not null,
  precoVoo float,
  tempoViagem varchar(50),
  nomeHotel varchar(50),
  precoHotel float, 
  morada varchar(50),
  distHotel float,
  precoTotal float,
  dataLimiteReservaVoo date,
  FOREIGN KEY (idprocesso) REFERENCES processo(id) ON DELETE CASCADE
);

create table infoVoo(
  id serial primary key,
  idProposta int not null,
  companhia varchar(50),
  origem varchar(50),
  destino varchar(50),
  partidaData date,
  partidaTempo time,
  chegadaData date,
  chegadaTempo time,
  FOREIGN KEY (idProposta) REFERENCES proposta(id) ON DELETE CASCADE
);