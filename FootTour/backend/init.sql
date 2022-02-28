DROP DATABASE IF EXISTS foottour;

CREATE DATABASE foottour
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

CREATE TABLE foottour.users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  isDeleted TINYINT(1) NOT NULL,
  isOrganizer TINYINT(1) NOT NULL,
  isReferee TINYINT(1) NOT NULL,
  isLeader TINYINT(1) NOT NULL,
  confirmation TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.tournaments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  organizerId INT(11) NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  bestPlayer VARCHAR(50) DEFAULT NULL,
  topScorer VARCHAR(50) DEFAULT NULL,
  bestGoalkeeper VARCHAR(50) DEFAULT NULL,
  entryFee INT(11) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  teamsCount INT(11) NOT NULL,
  type VARCHAR(255) NOT NULL,
  groupMatches INT(11) NOT NULL DEFAULT 1,
  knockoutMatches INT(11) NOT NULL DEFAULT 1,
  finalMatches INT(11) NOT NULL DEFAULT 1,
  fields INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.teams (
  id INT(11) NOT NULL AUTO_INCREMENT,
  leaderId INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.players (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  birthDate DATETIME NOT NULL,
  goals INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.matches (
  id INT(11) NOT NULL AUTO_INCREMENT,
  refereeId INT(11) NOT NULL,
  team1Goals INT(11) DEFAULT NULL,
  team2Goals INT(11) DEFAULT NULL,
  code VARCHAR(50) NOT NULL,
  groupId INT(11) NOT NULL,
  time DATETIME NOT NULL,
  team1Id INT(11) NOT NULL,
  team2Id INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.events (
  id INT(11) NOT NULL AUTO_INCREMENT,
  matchId INT(11) NOT NULL,
  playerId INT(11) NOT NULL,
  type VARCHAR(50) NOT NULL,
  minute INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.players_to_teams (
  id INT(11) NOT NULL AUTO_INCREMENT,
  playerId INT(11) NOT NULL,
  teamId INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.teams_to_tournaments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  teamId INT(11) NOT NULL,
  tournamentId INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.groups (
  id INT(11) NOT NULL AUTO_INCREMENT,
  tournamentId INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.teams_to_groups (
  id INT(11) NOT NULL AUTO_INCREMENT,
  teamId INT(11) NOT NULL,
  groupId INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.kit_numbers_to_players (
  id INT(11) NOT NULL AUTO_INCREMENT,
  playerId INT(11) NOT NULL,
  tournamentId INT(11) NOT NULL,
  kitNumber INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.referees_to_tournaments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  refereeId INT(11) NOT NULL,
  tournamentId INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

ALTER TABLE foottour.teams_to_tournaments 
  ADD CONSTRAINT FK_teams_to_tournaments_team_id FOREIGN KEY (teamId)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.teams_to_tournaments 
  ADD CONSTRAINT FK_teams_to_tournaments_tournament_id FOREIGN KEY (tournamentId)
    REFERENCES foottour.tournaments(id) ON DELETE NO ACTION;

ALTER TABLE foottour.tournaments 
  ADD CONSTRAINT FK_tournaments_organizer_id FOREIGN KEY (organizerId)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.users 
  ADD UNIQUE INDEX UK_users_email(email);

ALTER TABLE foottour.teams 
  ADD CONSTRAINT FK_teams_leader_id FOREIGN KEY (leaderId)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.players_to_teams 
  ADD CONSTRAINT FK_players_to_teams_player_id FOREIGN KEY (playerId)
    REFERENCES foottour.players(id) ON DELETE NO ACTION;

ALTER TABLE foottour.players_to_teams 
  ADD CONSTRAINT FK_players_to_teams_team_id FOREIGN KEY (teamId)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_group_id FOREIGN KEY (groupId)
    REFERENCES foottour.groups(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_referee_id FOREIGN KEY (refereeId)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_team1_id FOREIGN KEY (team1Id)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_team2_id FOREIGN KEY (team2Id)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.events 
  ADD CONSTRAINT FK_events_match_id FOREIGN KEY (matchId)
    REFERENCES foottour.matches(id) ON DELETE NO ACTION;

ALTER TABLE foottour.events 
  ADD CONSTRAINT FK_events_player_id FOREIGN KEY (playerId)
    REFERENCES foottour.players(id) ON DELETE NO ACTION;
    
ALTER TABLE foottour.groups 
  ADD CONSTRAINT FK_groups_tournament_id FOREIGN KEY (tournamentId)
    REFERENCES foottour.tournaments(id) ON DELETE NO ACTION;
    
ALTER TABLE foottour.teams_to_groups 
  ADD CONSTRAINT FK_teams_to_groups_group_id FOREIGN KEY (groupId)
    REFERENCES foottour.groups(id) ON DELETE NO ACTION;

ALTER TABLE foottour.teams_to_groups 
  ADD CONSTRAINT FK_teams_to_groups_team_id FOREIGN KEY (teamId)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.kit_numbers_to_players 
  ADD CONSTRAINT FK_kit_numbers_to_players_playerId FOREIGN KEY (playerId)
    REFERENCES foottour.players(id) ON DELETE NO ACTION;

ALTER TABLE foottour.kit_numbers_to_players 
  ADD CONSTRAINT FK_kit_numbers_to_players_tournamentId FOREIGN KEY (tournamentId)
    REFERENCES foottour.tournaments(id) ON DELETE NO ACTION;

ALTER TABLE foottour.referees_to_tournaments 
  ADD CONSTRAINT FK_referees_to_tournaments_refereeId FOREIGN KEY (refereeId)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.referees_to_tournaments 
  ADD CONSTRAINT FK_referees_to_tournaments_tournamentId FOREIGN KEY (tournamentId)
    REFERENCES foottour.tournaments(id) ON DELETE NO ACTION;

INSERT INTO foottour.users (name, email, password, isDeleted, isOrganizer, isReferee, isLeader, confirmation) VALUES ('Admin', 'admin', 'admin', 0, 1, 1, 1, 0);
INSERT INTO foottour.users (name, email, password, isDeleted, isOrganizer, isReferee, isLeader, confirmation) VALUES ('Szebik Levente Róbert', 'levente011@gmail.com', 'levente011', 0, 1, 1, 0, 0);
INSERT INTO foottour.users (name, email, password, isDeleted, isOrganizer, isReferee, isLeader, confirmation) VALUES ('Tankovits Bence', 'kecskecske6@gmail.com', 'kecskecske6', 0, 1, 0, 1, 0);

INSERT INTO foottour.tournaments (organizerId, startDate, endDate, name, location, entryFee, description, teamsCount, type, fields) VALUES (1, '2022.03.01 10:00', '2022.03.28 22:00', 'FIFA World Cup', '9021 Győr, Kossuth u. 10.', 0, 'FIFA Világbajnokság... Győri kiadás', 32, 'Csoportkör és kieséses', 4);

INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Argentína');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Bolívia');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Brazília');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Chile');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Ecuador');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Kolumbia');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Paraguay');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Peru');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Uruguay');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Venezuela');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Amerikai Szamoa');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Cook-szigetek');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Fidzsi-szigetek');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Francia Polinézia');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Pápua Új-Guinea');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Salamon-szigetek');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Szamoa');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Tonga');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Új-Kaledónia');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Új-Zéland');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Vanuatu');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Afganisztán');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Ausztrália (ország)');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Bahrein');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Algéria');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Angola');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Anguilla');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Antigua és Barbuda');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Aruba');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Albánia');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Andorra');
INSERT INTO foottour.teams (leaderId, name) VALUES (3, 'Anglia');

INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (1, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (2, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (3, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (4, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (5, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (6, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (7, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (8, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (9, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (10, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (11, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (12, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (13, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (14, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (15, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (16, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (17, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (18, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (19, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (20, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (21, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (22, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (23, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (24, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (25, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (26, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (27, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (28, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (29, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (30, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (31, 1);
INSERT INTO foottour.teams_to_tournaments (teamId, tournamentId) VALUES (32, 1);