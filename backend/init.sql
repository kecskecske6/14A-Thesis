-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Már 30. 10:54
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
DROP DATABASE IF EXISTS `foottour`;
--
-- Adatbázis: `foottour`
--
CREATE DATABASE IF NOT EXISTS `foottour` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `foottour`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `matchId` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `type` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `minute` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `tournamentId` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kit_numbers_to_players`
--

CREATE TABLE `kit_numbers_to_players` (
  `id` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `tournamentId` int(11) NOT NULL,
  `kitNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kit_numbers_to_players`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `matches`
--

CREATE TABLE `matches` (
  `id` int(11) NOT NULL,
  `refereeId` int(11) NOT NULL,
  `team1Goals` int(11) DEFAULT NULL,
  `team2Goals` int(11) DEFAULT NULL,
  `code` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `groupId` int(11) NOT NULL,
  `team1Id` int(11) NOT NULL,
  `team2Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `goals` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `players`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `players_to_teams`
--

CREATE TABLE `players_to_teams` (
  `id` int(11) NOT NULL,
  `playerId` int(11) NOT NULL,
  `teamId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `players_to_teams`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `referees_to_tournaments`
--

CREATE TABLE `referees_to_tournaments` (
  `id` int(11) NOT NULL,
  `refereeId` int(11) NOT NULL,
  `tournamentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `leaderId` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `teams`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teams_to_groups`
--

CREATE TABLE `teams_to_groups` (
  `id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `teams_to_tournaments`
--

CREATE TABLE `teams_to_tournaments` (
  `id` int(11) NOT NULL,
  `teamId` int(11) NOT NULL,
  `tournamentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `teams_to_tournaments`
--



-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tournaments`
--

CREATE TABLE `tournaments` (
  `id` int(11) NOT NULL,
  `organizerId` int(11) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `location` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `county` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `bestPlayer` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `topScorer` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `bestGoalkeeper` varchar(50) COLLATE utf8_hungarian_ci DEFAULT NULL,
  `entryFee` int(11) NOT NULL,
  `description` varchar(1000) COLLATE utf8_hungarian_ci NOT NULL,
  `teamsCount` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `groupMatches` int(11) NOT NULL DEFAULT 1,
  `knockoutMatches` int(11) NOT NULL DEFAULT 1,
  `finalMatches` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `tournaments`
--


-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `isOrganizer` tinyint(1) NOT NULL,
  `isReferee` tinyint(1) NOT NULL,
  `isLeader` tinyint(1) NOT NULL,
  `confirmation` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--


--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_events_match_id` (`matchId`),
  ADD KEY `FK_events_player_id` (`playerId`);

--
-- A tábla indexei `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_groups_tournament_id` (`tournamentId`);

--
-- A tábla indexei `kit_numbers_to_players`
--
ALTER TABLE `kit_numbers_to_players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_kit_numbers_to_players_playerId` (`playerId`),
  ADD KEY `FK_kit_numbers_to_players_tournamentId` (`tournamentId`);

--
-- A tábla indexei `matches`
--
ALTER TABLE `matches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_matches_group_id` (`groupId`),
  ADD KEY `FK_matches_referee_id` (`refereeId`),
  ADD KEY `FK_matches_team1_id` (`team1Id`),
  ADD KEY `FK_matches_team2_id` (`team2Id`);

--
-- A tábla indexei `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `players_to_teams`
--
ALTER TABLE `players_to_teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_players_to_teams_player_id` (`playerId`),
  ADD KEY `FK_players_to_teams_team_id` (`teamId`);

--
-- A tábla indexei `referees_to_tournaments`
--
ALTER TABLE `referees_to_tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_referees_to_tournaments_refereeId` (`refereeId`),
  ADD KEY `FK_referees_to_tournaments_tournamentId` (`tournamentId`);

--
-- A tábla indexei `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_teams_leader_id` (`leaderId`);

--
-- A tábla indexei `teams_to_groups`
--
ALTER TABLE `teams_to_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_teams_to_groups_group_id` (`groupId`),
  ADD KEY `FK_teams_to_groups_team_id` (`teamId`);

--
-- A tábla indexei `teams_to_tournaments`
--
ALTER TABLE `teams_to_tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_teams_to_tournaments_team_id` (`teamId`),
  ADD KEY `FK_teams_to_tournaments_tournament_id` (`tournamentId`);

--
-- A tábla indexei `tournaments`
--
ALTER TABLE `tournaments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_tournaments_organizer_id` (`organizerId`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_users_email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kit_numbers_to_players`
--
ALTER TABLE `kit_numbers_to_players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3697;

--
-- AUTO_INCREMENT a táblához `matches`
--
ALTER TABLE `matches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3697;

--
-- AUTO_INCREMENT a táblához `players_to_teams`
--
ALTER TABLE `players_to_teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3697;

--
-- AUTO_INCREMENT a táblához `referees_to_tournaments`
--
ALTER TABLE `referees_to_tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT a táblához `teams_to_groups`
--
ALTER TABLE `teams_to_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `teams_to_tournaments`
--
ALTER TABLE `teams_to_tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT a táblához `tournaments`
--
ALTER TABLE `tournaments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `FK_events_match_id` FOREIGN KEY (`matchId`) REFERENCES `matches` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_events_player_id` FOREIGN KEY (`playerId`) REFERENCES `players` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `FK_groups_tournament_id` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `kit_numbers_to_players`
--
ALTER TABLE `kit_numbers_to_players`
  ADD CONSTRAINT `FK_kit_numbers_to_players_playerId` FOREIGN KEY (`playerId`) REFERENCES `players` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_kit_numbers_to_players_tournamentId` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `matches`
--
ALTER TABLE `matches`
  ADD CONSTRAINT `FK_matches_group_id` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_matches_referee_id` FOREIGN KEY (`refereeId`) REFERENCES `users` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_matches_team1_id` FOREIGN KEY (`team1Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_matches_team2_id` FOREIGN KEY (`team2Id`) REFERENCES `teams` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `players_to_teams`
--
ALTER TABLE `players_to_teams`
  ADD CONSTRAINT `FK_players_to_teams_player_id` FOREIGN KEY (`playerId`) REFERENCES `players` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_players_to_teams_team_id` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `referees_to_tournaments`
--
ALTER TABLE `referees_to_tournaments`
  ADD CONSTRAINT `FK_referees_to_tournaments_refereeId` FOREIGN KEY (`refereeId`) REFERENCES `users` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_referees_to_tournaments_tournamentId` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `FK_teams_leader_id` FOREIGN KEY (`leaderId`) REFERENCES `users` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `teams_to_groups`
--
ALTER TABLE `teams_to_groups`
  ADD CONSTRAINT `FK_teams_to_groups_group_id` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_teams_to_groups_team_id` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `teams_to_tournaments`
--
ALTER TABLE `teams_to_tournaments`
  ADD CONSTRAINT `FK_teams_to_tournaments_team_id` FOREIGN KEY (`teamId`) REFERENCES `teams` (`id`) ON DELETE NO ACTION,
  ADD CONSTRAINT `FK_teams_to_tournaments_tournament_id` FOREIGN KEY (`tournamentId`) REFERENCES `tournaments` (`id`) ON DELETE NO ACTION;

--
-- Megkötések a táblához `tournaments`
--
ALTER TABLE `tournaments`
  ADD CONSTRAINT `FK_tournaments_organizer_id` FOREIGN KEY (`organizerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
