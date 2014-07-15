-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Июл 15 2014 г., 13:42
-- Версия сервера: 5.5.24-log
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `vkstats`
--

-- --------------------------------------------------------

--
-- Структура таблицы `actions`
--

CREATE TABLE IF NOT EXISTS `actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8_bin NOT NULL,
  `type` text COLLATE utf8_bin NOT NULL,
  `value` text COLLATE utf8_bin NOT NULL,
  `project_id` int(11) NOT NULL,
  `target_action` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=40 ;

--
-- Дамп данных таблицы `actions`
--

INSERT INTO `actions` (`id`, `title`, `type`, `value`, `project_id`, `target_action`) VALUES
(35, 'rere', 'action', '', 16, 0),
(36, 'dfgdfg', 'action', '', 16, 0),
(37, 'dfgdfg', 'redirect', 'dfg', 16, 1),
(38, 'tyutyutyu', 'action', '', 16, 1),
(39, 'rtyrtyry', 'action', '', 17, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=19 ;

--
-- Дамп данных таблицы `projects`
--

INSERT INTO `projects` (`id`, `title`) VALUES
(16, 'ertert'),
(17, 'ertert'),
(18, 'werwerwer');

-- --------------------------------------------------------

--
-- Структура таблицы `tracked_actions`
--

CREATE TABLE IF NOT EXISTS `tracked_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `action_id` int(11) NOT NULL,
  `user_id` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `action_id` (`action_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=234214343 ;

--
-- Дамп данных таблицы `tracked_actions`
--

INSERT INTO `tracked_actions` (`id`, `time`, `action_id`, `user_id`) VALUES
(234214333, 1405431678, 37, 'zzgym2eOd'),
(234214334, 1405431692, 36, 'zzgym2eOd'),
(234214335, 1405431692, 35, 'zzgym2eOd'),
(234214336, 1405431692, 36, 'zzgym2eOd'),
(234214337, 1405431693, 36, 'zzgym2eOd'),
(234214338, 1405431693, 35, 'zzgym2eOd'),
(234214339, 1405431694, 36, 'zzgym2eOd'),
(234214340, 1405431709, 36, 'zzgym2eOd'),
(234214341, 1405431709, 35, 'zzgym2eOd'),
(234214342, 1405431710, 38, 'zzgym2eOd');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `actions`
--
ALTER TABLE `actions`
  ADD CONSTRAINT `actions_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `tracked_actions`
--
ALTER TABLE `tracked_actions`
  ADD CONSTRAINT `tracked_actions_ibfk_1` FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
