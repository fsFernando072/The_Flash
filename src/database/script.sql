CREATE DATABASE the_flash;
USE the_flash;

CREATE TABLE temporada (
	id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE personagem (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    caminhoImagem VARCHAR(80) NOT NULL
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    caminhoImagem VARCHAR(80) NOT NULL,
    fkpersonagemfavorito INT,
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

INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Flash', 'Herói', 'equipe/flash.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Cisco', 'Herói', 'equipe/cisco.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Caitlin', 'Herói', 'equipe/caitlin.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Harrison', 'Herói', 'equipe/harrison.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Flash Reverso', 'Vilão', 'viloes/flashReverso.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Zoom', 'Vilão', 'viloes/zoom.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Savitar', 'Vilão', 'viloes/savitar.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Devoe', 'Vilão', 'viloes/devoe.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Cicada', 'Vilão', 'viloes/cicada.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Hemoglobina', 'Vilão', 'viloes/hemoglobina.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('GodSpeed', 'Vilão', 'viloes/godspeed.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Despero', 'Vilão', 'viloes/despero.jpeg');
INSERT INTO personagem (nome, descricao, caminhoImagem) VALUES ('Cobalto Azul', 'Vilão', 'viloes/cobaltoAzul.jpeg');
