-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 30 mars 2024 à 09:24
-- Version du serveur : 5.7.40
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `devsecopslist`
--

-- --------------------------------------------------------

--
-- Structure de la table `gift`
--

DROP TABLE IF EXISTS `gift`;
CREATE TABLE IF NOT EXISTS `gift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `previous_price` decimal(10,2) DEFAULT NULL,
  `list_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `list_id` (`list_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `gift`
--

INSERT INTO `gift` (`id`, `name`, `description`, `price`, `previous_price`, `list_id`) VALUES
(1, 'PS5', 'La console que boubou Gaétan veut', '250.00', NULL, 1),
(2, 'Déssécheur de banane', 'Pour de bonnes bananes séches', '50.00', NULL, 1),
(3, 'Carte Graphique', 'Une jolie 4080', '600.00', NULL, 2),
(4, 'Gentes chromées', 'Des gentes chromées pour le bolide', '69.99', '39.99', 2);

-- --------------------------------------------------------

--
-- Structure de la table `list`
--

DROP TABLE IF EXISTS `list`;
CREATE TABLE IF NOT EXISTS `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `for_who` varchar(50) NOT NULL,
  `ended` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `list`
--

INSERT INTO `list` (`id`, `name`, `for_who`, `ended`) VALUES
(2, 'Cadeau Anniversaire', 'Teo', 0),
(3, 'Nouveau nom de la listee', 'Moi-même', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
