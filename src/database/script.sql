CREATE DATABASE The_Flash;
USE The_Flash;

CREATE TABLE Temporada (
	id INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(100) NOT NULL
);

CREATE TABLE Personagem (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    caminhoImagem VARCHAR(80) NOT NULL
);

CREATE TABLE Usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(60) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    fkTemporadaAtual INT,
    fkTemporadaFavorita INT,
    fkPersonagemFavorito INT,
    caminhoImagem VARCHAR(80) NOT NULL,
    CONSTRAINT FOREIGN KEY (fkTemporadaAtual) REFERENCES Temporada (id),
    CONSTRAINT FOREIGN KEY (fkTemporadaFavorita) REFERENCES Temporada (id),
    CONSTRAINT FOREIGN KEY (fkPersonagemFavorito) REFERENCES Personagem (id)
);

INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Flash', 'Herói', 'equipe/flash.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Cisco', 'Herói', 'equipe/cisco.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Caitlin', 'Herói', 'equipe/caitlin.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Harrison', 'Herói', 'equipe/harrison.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Flash Reverso', 'Vilão', 'viloes/flashReverso.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Zoom', 'Vilão', 'viloes/zoom.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Savitar', 'Vilão', 'viloes/savitar.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Devoe', 'Vilão', 'viloes/devoe.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Cicada', 'Vilão', 'viloes/cicada.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Hemoglobina', 'Vilão', 'viloes/hemoglobina.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('GodSpeed', 'Vilão', 'viloes/godspeed.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Despero', 'Vilão', 'viloes/despero.jpeg');
INSERT INTO Personagem (nome, descricao, caminhoImagem) VALUES ('Cobalto Azul', 'Vilão', 'viloes/cobaltoAzul.jpeg');