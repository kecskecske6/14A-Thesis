DROP DATABASE IF EXISTS foottour;

CREATE DATABASE foottour
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

CREATE TABLE foottour.users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  is_deleted TINYINT(1) NOT NULL,
  is_organizer TINYINT(1) NOT NULL,
  is_referee TINYINT(1) NOT NULL,
  is_leader TINYINT(1) NOT NULL,
  token VARCHAR(255) DEFAULT NULL,
  confirmation TINYINT(1) NOT NULL DEFAULT false,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.tournaments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  organizer_id INT(11) NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  best_player VARCHAR(50) DEFAULT NULL,
  top_scorer VARCHAR(50) DEFAULT NULL,
  best_goalkeeper VARCHAR(50) DEFAULT NULL,
  entry_fee INT(11) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  teams_count INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.teams (
  id INT(11) NOT NULL AUTO_INCREMENT,
  leader_id INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.players (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  birth_date DATETIME NOT NULL,
  goals INT(11) NOT NULL,
  yellow_cards INT(11) NOT NULL,
  red_cards INT(11) NOT NULL,
  kit_number INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.matches (
  id INT(11) NOT NULL AUTO_INCREMENT,
  tournament_id INT(11) NOT NULL,
  team1_id INT(11) NOT NULL,
  team2_id INT(11) NOT NULL,
  referee_id INT(11) NOT NULL,
  team1_goals INT(11) NOT NULL,
  team2_goals INT(11) NOT NULL,
  code VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.events (
  id INT(11) NOT NULL AUTO_INCREMENT,
  match_id INT(11) NOT NULL,
  player_id INT(11) NOT NULL,
  type VARCHAR(50) NOT NULL,
  minute INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.players_to_teams (
  id INT(11) NOT NULL AUTO_INCREMENT,
  player_id INT(11) NOT NULL,
  team_id INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

CREATE TABLE foottour.teams_to_tournaments (
  id INT(11) NOT NULL AUTO_INCREMENT,
  team_id INT(11) NOT NULL,
  tournament_id INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB;

ALTER TABLE foottour.teams_to_tournaments 
  ADD CONSTRAINT FK_teams_to_tournaments_tournament_id FOREIGN KEY (tournament_id)
    REFERENCES foottour.tournaments(id) ON DELETE NO ACTION;

ALTER TABLE foottour.teams_to_tournaments 
  ADD CONSTRAINT FK_teams_to_tournaments_team_id FOREIGN KEY (team_id)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.tournaments 
  ADD CONSTRAINT FK_tournaments_organizer_id FOREIGN KEY (organizer_id)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.users 
  ADD UNIQUE INDEX UK_users_email(email);

ALTER TABLE foottour.teams 
  ADD CONSTRAINT FK_teams_leader_id FOREIGN KEY (leader_id)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.players_to_teams 
  ADD CONSTRAINT FK_players_to_teams_player_id FOREIGN KEY (player_id)
    REFERENCES foottour.players(id) ON DELETE NO ACTION;

ALTER TABLE foottour.players_to_teams 
  ADD CONSTRAINT FK_players_to_teams_team_id FOREIGN KEY (team_id)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_tournament_id FOREIGN KEY (tournament_id)
    REFERENCES foottour.tournaments(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_team1_id FOREIGN KEY (team1_id)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_team2_id FOREIGN KEY (team2_id)
    REFERENCES foottour.teams(id) ON DELETE NO ACTION;

ALTER TABLE foottour.matches 
  ADD CONSTRAINT FK_matches_referee_id FOREIGN KEY (referee_id)
    REFERENCES foottour.users(id) ON DELETE NO ACTION;

ALTER TABLE foottour.events 
  ADD CONSTRAINT FK_events_match_id FOREIGN KEY (match_id)
    REFERENCES foottour.matches(id) ON DELETE NO ACTION;

ALTER TABLE foottour.events 
  ADD CONSTRAINT FK_events_player_id FOREIGN KEY (player_id)
    REFERENCES foottour.players(id) ON DELETE NO ACTION;