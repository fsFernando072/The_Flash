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