insert into utilizadores(nome) values ('Rodrigo');
insert into utilizadores(nome) values ('Antonio');
insert into utilizadores(nome) values ('Didarrito');

insert into processo(cidadeDestino, checkin, checkout, numadultos, radius, origem, partida) values ('PAR', '2022-09-10', '2022-09-11', 1, 10,'LIS', '2022-09-10');

insert into proposta(idProcesso, precoVoo, tempoViagem, nomeHotel, precoHotel, morada, disthotel, precoTotal, datalimitereservavoo) values (1, 102.20, 'PT1H25M', 'Hotel do Santo', 150, 'Rua St.António, Lt.1', 2, 252.20 ,'2022-09-05');
insert into proposta(idProcesso, precoVoo, tempoViagem, nomeHotel, precoHotel, morada, disthotel, precoTotal, datalimitereservavoo) values (1, 50, 'PT11H25M', 'Hotel da Pedra', 200, 'Rua Flintstones, Lt.9', 4, 250, '2022-09-05');

insert into infoVoo(idProposta, companhia, origem, destino, partidaData,partidaTempo, chegadaData, chegadaTempo) values (1 , 'TP','LIS', 'PAR', '2022-09-10','02:03:04', '2022-01-10','04:28:04');
insert into infoVoo(idProposta, companhia, origem, destino, partidaData,partidaTempo, chegadaData, chegadaTempo) values (2 , 'TP','LIS', 'BCN', '2022-09-10','02:03:04', '2022-01-10','08:28:04');
insert into infoVoo(idProposta, companhia, origem, destino, partidaData,partidaTempo, chegadaData, chegadaTempo) values (2 , 'TP','BCN', 'PAR', '2022-09-10','09:00:04', '2022-01-10','14:28:04');
