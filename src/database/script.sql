CREATE DATABASE the_flash;
USE the_flash;

CREATE TABLE personagem (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    categoria VARCHAR(20) NOT NULL,
    caminhoImagem VARCHAR(80) NOT NULL
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    caminhoImagem VARCHAR(80) NOT NULL,
    fkpersonagemfavorito INT,
    UNIQUE KEY (email),
    FOREIGN KEY (fkpersonagemfavorito) REFERENCES personagem (id)
);

CREATE TABLE quiz (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(60) NOT NULL,
    descricao VARCHAR(200) NOT NULL,
    senha VARCHAR(60),
    caminhoImagem VARCHAR(80) NOT NULL,
    fkusuario INT NOT NULL,
    FOREIGN KEY (fkusuario) REFERENCES usuario (id)
);

CREATE TABLE pergunta (
    numero INT NOT NULL,
    fkquiz INT NOT NULL,
    pergunta VARCHAR(100) NOT NULL,
    alternativaA VARCHAR(100) NOT NULL,
    alternativaB VARCHAR(100) NOT NULL,
    alternativaC VARCHAR(100) NOT NULL,
    alternativaD VARCHAR(100) NOT NULL,
    alternativaE VARCHAR(100) NOT NULL,
    alternativaCorreta CHAR(1) NOT NULL,
    FOREIGN KEY (fkquiz) REFERENCES quiz (id),
    PRIMARY KEY (numero, fkquiz)
);

CREATE TABLE resposta (
    fkusuario INT NOT NULL,
    fkpergunta INT NOT NULL,
    fkquiz INT NOT NULL,
    alternativaEscolhida CHAR(1) NOT NULL,
    FOREIGN KEY (fkusuario) REFERENCES usuario (id),
    FOREIGN KEY (fkpergunta) REFERENCES pergunta (numero),
    FOREIGN KEY (fkquiz) REFERENCES pergunta (fkquiz),
    PRIMARY KEY (fkusuario, fkpergunta, fkquiz)
);

INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Flash', 'Barry Allen, o homem mais rápido do mundo e herói principal da série.', 'Equipe', 'equipe/flash.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Cisco', 'Amigo de Barry e engenheiro brilhante da S.T.A.R. Labs.', 'Equipe', 'equipe/cisco.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Caitlin', 'Médica e cientista da equipe, também conhecida como Nevasca.', 'Equipe', 'equipe/caitlin.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Harrison', 'Diversas versões do cientista Harrison Wells, aliado e mentor.', 'Equipe', 'equipe/harrison.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Flash Reverso', 'Eobard Thawne, inimigo mortal de Barry e viajante do tempo.', 'Vilões', 'viloes/flashReverso.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Zoom', 'Hunter Zolomon, velocista maligno que aterroriza Central City.', 'Vilões', 'viloes/zoom.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Savitar', 'Velocista divino e uma das maiores ameaças que Barry já enfrentou.', 'Vilões', 'viloes/savitar.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Devoe', 'Clifford DeVoe, o Pensador, vilão com inteligência super-humana.', 'Vilões', 'viloes/devoe.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Cicada', 'Orlin Dwyer, vilão motivado por tragédia pessoal, usa uma adaga meta-humana.', 'Vilões', 'viloes/cicada.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Hemoglobina', 'Ramsey Rosso, médico que se transforma em vilão após experiências com sangue.', 'Vilões', 'viloes/hemoglobina.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('GodSpeed', 'August Heart, velocista com poderes similares ao Flash.', 'Vilões', 'viloes/godspeed.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Despero', 'Alienígena poderoso que tenta prevenir uma catástrofe futura.', 'Vilões', 'viloes/despero.jpeg');
INSERT INTO personagem (nome, descricao, categoria, caminhoImagem) VALUES ('Cobalto Azul', 'Malcolm Thawne, irmão perdido de Barry, busca vingança.', 'Vilões', 'viloes/cobaltoAzul.jpeg');

INSERT INTO usuario (nome, email, senha, caminhoImagem, fkpersonagemfavorito) VALUES ('João Paulo', 'joao.paulo@gmail.com', 'senha123', 'equipe/flash.jpeg', 1);
INSERT INTO usuario (nome, email, senha, caminhoImagem, fkpersonagemfavorito) VALUES ('Maria Souza', 'maria.souza@gmail.com', 'senha123', 'equipe/caitlin.jpeg', 3);
INSERT INTO usuario (nome, email, senha, caminhoImagem, fkpersonagemfavorito) VALUES ('Carlos Lima', 'carlos.lima@gmail.com', 'senha123', 'equipe/cisco.jpeg', 2);
INSERT INTO usuario (nome, email, senha, caminhoImagem, fkpersonagemfavorito) VALUES ('Ana Paula', 'ana.paula@gmail.com', 'senha123', 'viloes/zoom.jpeg', 6);

INSERT INTO quiz (titulo, descricao, senha, caminhoImagem, fkusuario) VALUES ('Quiz do Flash', 'Teste seus conhecimentos sobre o Flash e seus aliados.', '', 'equipe/flash.jpeg', 1);
INSERT INTO quiz (titulo, descricao, senha, caminhoImagem, fkusuario) VALUES ('Vilões de Central City', 'Descubra o quanto você conhece sobre os vilões do Flash.', 'senha123', 'viloes/flashReverso.jpeg', 2);
INSERT INTO quiz (titulo, descricao, senha, caminhoImagem, fkusuario) VALUES ('Equipe S.T.A.R. Labs', 'Um quiz sobre os membros da equipe que ajudam o Flash.', '', 'equipe/cisco.jpeg', 3);
INSERT INTO quiz (titulo, descricao, senha, caminhoImagem, fkusuario) VALUES ('Velocistas', 'Quiz sobre todos os velocistas do Arrowverse.', 'senha123', 'viloes/godspeed.jpeg', 4);


INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (1, 1, 'Qual o nome verdadeiro do Flash?', 'Barry Allen', 'Wally West', 'Jay Garrick', 'Bart Allen', 'Eddie Thawne', 'A');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (2, 1, 'Qual é o trabalho de Barry Allen?', 'Engenheiro', 'Cientista', 'Detetive', 'Perito Forense', 'Advogado', 'D');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (3, 1, 'Quem matou a mãe de Barry?', 'Zoom', 'Savitar', 'Eobard Thawne', 'GodSpeed', 'Devoe', 'C');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (4, 1, 'Quem é o primeiro velocista vilão da série?', 'Savitar', 'Zoom', 'GodSpeed', 'Flash Reverso', 'Cicada', 'D');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (5, 1, 'Qual a cidade protegida pelo Flash?', 'Gotham', 'Central City', 'Star City', 'National City', 'Metropolis', 'B');

INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (1, 2, 'Quem é conhecido como o Flash Reverso?', 'Eddie Thawne', 'Eobard Thawne', 'Hunter Zolomon', 'Clifford DeVoe', 'Savitar', 'B');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (2, 2, 'Qual vilão usa uma adaga como arma?', 'Savitar', 'Cicada', 'Zoom', 'Hemoglobina', 'Despero', 'B');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (3, 2, 'Quem é o Pensador?', 'Clifford DeVoe', 'Barry Allen', 'Cisco Ramon', 'Harrison Wells', 'Jay Garrick', 'A');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (4, 2, 'Quem é o vilão alienígena na série?', 'Savitar', 'Devoe', 'Despero', 'GodSpeed', 'Cicada', 'C');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (5, 2, 'Quem foi corrompido por uma substância de sangue?', 'Hemoglobina', 'Cicada', 'Zoom', 'Devoe', 'Savitar', 'A');

INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (1, 3, 'Quem é o engenheiro da equipe?', 'Barry Allen', 'Cisco Ramon', 'Harrison Wells', 'Joe West', 'Ralph Dibny', 'B');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (2, 3, 'Qual o nome de vilã de Caitlin Snow?', 'Nevasca', 'Tempestade', 'Geada', 'Gelo', 'Fria', 'A');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (3, 3, 'Quem é conhecido por suas múltiplas versões de universos paralelos?', 'Barry Allen', 'Cisco Ramon', 'Harrison Wells', 'Savitar', 'GodSpeed', 'C');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (4, 3, 'Quem é o policial e pai adotivo de Barry?', 'Harrison Wells', 'Joe West', 'Cisco Ramon', 'Ralph Dibny', 'Wally West', 'B');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (5, 3, 'Qual o nome do laboratório onde a equipe trabalha?', 'Wayne Enterprises', 'Stagg Industries', 'S.T.A.R. Labs', 'Mercury Labs', 'LexCorp', 'C');

INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (1, 4, 'Quem é conhecido como o Homem Mais Rápido Vivo?', 'Barry Allen', 'Wally West', 'Jay Garrick', 'Savitar', 'Zoom', 'A');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (2, 4, 'Qual velocista é uma versão maligna do próprio Barry?', 'Zoom', 'GodSpeed', 'Savitar', 'Reverse-Flash', 'Cobalto Azul', 'C');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (3, 4, 'Quem é o velocista vindo do futuro?', 'Wally West', 'Bart Allen', 'Jay Garrick', 'Barry Allen', 'Cisco Ramon', 'B');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (4, 4, 'Qual velocista também atende pelo nome de August Heart?', 'Zoom', 'Savitar', 'GodSpeed', 'Cicada', 'Despero', 'C');
INSERT INTO pergunta (numero, fkquiz, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta) VALUES (5, 4, 'Qual velocista se chama Hunter Zolomon?', 'Zoom', 'Flash Reverso', 'Savitar', 'XS', 'Kid Flash', 'A');
 
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 1, 1, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 2, 1, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 3, 1, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 4, 1, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 5, 1, 'E');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 1, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 2, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 3, 2, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 4, 2, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 5, 2, 'C');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 1, 3, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 2, 3, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 3, 3, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 4, 3, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 5, 3, 'C');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 1, 4, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 2, 4, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 3, 4, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 4, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (1, 5, 4, 'A');


INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 1, 1, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 2, 1, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 3, 1, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 4, 1, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 5, 1, 'B');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 1, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 2, 2, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 3, 2, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 4, 2, 'E');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 5, 2, 'A');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 1, 3, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 2, 3, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 3, 3, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 4, 3, 'E');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 5, 3, 'C');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 1, 4, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 2, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 3, 4, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 4, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (2, 5, 4, 'D');


INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 1, 1, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 2, 1, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 3, 1, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 4, 1, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 5, 1, 'B');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 1, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 2, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 3, 2, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 4, 2, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 5, 2, 'A');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 1, 3, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 2, 3, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 3, 3, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 4, 3, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 5, 3, 'C');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 1, 4, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 2, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 3, 4, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 4, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (3, 5, 4, 'A');


INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 1, 1, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 2, 1, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 3, 1, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 4, 1, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 5, 1, 'B');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 1, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 2, 2, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 3, 2, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 4, 2, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 5, 2, 'A');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 1, 3, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 2, 3, 'D');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 3, 3, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 4, 3, 'B');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 5, 3, 'C');

INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 1, 4, 'A');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 2, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 3, 4, 'E');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 4, 4, 'C');
INSERT INTO resposta (fkusuario, fkpergunta, fkquiz, alternativaEscolhida) VALUES (4, 5, 4, 'A');
