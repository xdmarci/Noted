-- Active: 1728994525220@@127.0.0.1@3306@notesapp
-- Create Database
CREATE DATABASE NotesApp;


-- 1. Felhasználók tábla (Users table)
CREATE TABLE Felhasznalok (
    FelhasznaloId INT AUTO_INCREMENT PRIMARY KEY, 
    FelhasznaloNev VARCHAR(255) UNIQUE NOT NULL,  
    Jelszo BLOB NOT NULL,               -- Jelszó (hashelt)
    Email VARCHAR(255) UNIQUE NOT NULL,          
    Statusz INT NOT NULL,               -- Státusz (0 = blockolt, 1 = aktív)
    JogosultsagId INT,                                   
    FOREIGN KEY (JogosultsagId) REFERENCES Jogosultsagok(JogosultsagId) 
);

-- 2. Jegyzetek tábla (Notes table)
CREATE TABLE Jegyzetek (
    JegyzetId INT AUTO_INCREMENT PRIMARY KEY,          
    Feltolto INT NOT NULL,                                     
    JegyzetNeve VARCHAR(255) NOT NULL,                 
    Lathatosag INT NOT NULL,            -- Láthatóság (0 = privát, 1 = nyílvános)
    JegyzetTartalma TEXT,                     
    UtolsoFrissites TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UtolsoFrissito INT,                               
    FOREIGN KEY (Feltolto) REFERENCES Felhasznalok(FelhasznaloId),
    FOREIGN KEY (UtolsoFrissito) REFERENCES Felhasznalok(FelhasznaloId)
);

-- 3. Megosztás tábla (Shares table for Notes)
CREATE TABLE Megosztas (
    JegyzetId INT,
    MegosztottFelhId INT,                        
    GroupSharedId INT,                           
    Jogosultsag VARCHAR(50),        -- Jogosultsága (Read, Write, Share)
    FOREIGN KEY (JegyzetId) REFERENCES Jegyzetek(JegyzetId),   
    FOREIGN KEY (MegosztottFelhId) REFERENCES Felhasznalok(FelhasznaloId), 
    FOREIGN KEY (GroupSharedId) REFERENCES Csoportok(CsoportId)  
);

-- 4. Csoportok tábla (Groups table)
CREATE TABLE Csoportok (
    CsoportId INT AUTO_INCREMENT PRIMARY KEY,
    Tulajdonos VARCHAR(255) NOT NULL,
    CsoportNev VARCHAR(255) NOT NULL 
);

-- 5. Csoport tagok tábla (Group Members table)
CREATE TABLE CsoportTagok (
    CsoportId INT,                               
    TagId INT,                                   
    JogosultsagId INT, 
    FOREIGN KEY (CsoportId) REFERENCES Csoportok(CsoportId),
    FOREIGN KEY (TagId) REFERENCES Felhasznalok(FelhasznaloId),
    FOREIGN KEY (JogosultsagId) REFERENCES Jogosultsagok(JogosultsagId)
);

-- 6. Jogosultságok tábla (Jogosultsags table for Permissions)
CREATE TABLE Jogosultsagok (
    JogosultsagId INT AUTO_INCREMENT PRIMARY KEY,
    Jogosultsag VARCHAR(255) NOT NULL -- Jogosultságok (Admin, Moderator, Member)
);

-- Alap jogosultságok felétele
INSERT INTO Jogosultsagok (Jogosultsag) 
VALUES ('Admin'), ('Moderator'), ('Member');

CREATE FUNCTION `Titkos`(pwd VARCHAR(100)) RETURNS blob
    DETERMINISTIC
Begin
    DECLARE titkositot BLOB;
    set titkositot = SHA2(concat(pwd,'sozas'),256);
    RETURN titkositot;
    END

CREATE FUNCTION `Login`(email VARCHAR(100), pwd VARCHAR(100)) RETURNS int
    DETERMINISTIC
Begin
    DECLARE ok INTEGER;
    set ok = 0;
    SELECT  `FelhasznaloId` into ok from Felhasznalok WHERE (Felhasznalok.Email = email) and (Felhasznalok.Jelszo = Titkos(pwd));
    RETURN ok;
    END

DROP TRIGGER insertUser

CREATE Trigger insertUser
BEFORE INSERT
ON Felhasznalok
for each row set
new.Email = LOWER(new.Email),
new.Jelszo = `Titkos`(new.Jelszo);