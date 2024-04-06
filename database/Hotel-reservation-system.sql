-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 06, 2024 at 06:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Hotel-reservation-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `userName`, `emailAddress`, `password`, `user_type`, `status`) VALUES
(30, 'mulugeta', 'mulukengetaye9@gmail.com', '$2a$10$LpoAnNGzo6TrnjkJs7QfNu9R/6oWZghLy6Oi9FQeT728pfFoKczPG', 'guest', 'Active'),
(31, 'zamandegu', 'adagefab078@gmail.com', '$2a$10$ek4vgl/P.IQtap0VLGTOyOmfTdr1Af4gOK1fPv0nCumVEIN5telHW', 'manager', 'Active'),
(35, 'feti', 'feti@gmail.com', '$2a$10$opSjgiZLbWOSbjef3kBAgOnSuWp1BNDZGXNfhq8SrnRLn4E7L2SPi', 'manager', 'Banned'),
(37, 'adabro', 'adagefab078@gmail.com', '$2a$10$nmfjPmGVo5TBARIDHC.Hr.88MZ2NEUSm4Pxcbyw3n2ZVF61KDrXIy', 'receptionist', 'Active'),
(40, 'chuol', 'mulukengetaye9@gmail.com', '$2a$10$Evs4bot7FoZcLjJ2DEMTJ.rtYd68KHqD/KhlJHqGzIEYQXQFanQh.', 'receptionist', 'Active'),
(47, 'samiabe', 'sara@gamil.com', '$2a$10$n6O830oKGY67JHu9Aha3eeXUK/XqOS26sQmro8bNi4DHTw7F59yyW', 'receptionist', 'Disable'),
(48, 'shegaw', 'shegaw@gmail.com', '$2a$10$EANVLcyuDbt43oMo/ZZIgua3DKuyvfrixDoqfrYjgKwnLJ44kC9ju', 'receptionist', 'Active'),
(50, 'paulmuse', 'paul@gmail.com', '$2a$10$1YmXdwctP9skJe/tBKo27ugcaU.F43oIvcnXZU0NvUUbnzlP.AfB2', 'receptionist', 'Active'),
(51, 'seble', 'seble@gmail.com', '$2a$10$HgSAzYDQTt.HlA8Ddq8VhuYjDv3hhbbUdn6/iCvsnbEH2eZ1oXIa.', 'guest', 'Active'),
(52, 'amanualdegu', '1234', '$2a$10$dG8H0G8n9nT4HtUo.W1rbeoX9fpRQLVPxRogQvxXFhh01U286tdrm', 'guest', 'Active'),
(54, 'adagefab', 'jamua@2akg.com', '$2a$10$eaxfV5/CQXeiXgSnuAwzEuvTkZYm9EcU/B12TyyybpQsohVdL/8q.', 'guest', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `foodName` varchar(255) NOT NULL,
  `foodImage` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `foodName`, `foodImage`, `description`, `price`, `rating`) VALUES
(1, 'Lasagna', '[\"image0-1711690495911-423921302.png\"]', 'a Delisious food for breakfast', 30, 0);

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `identificationCardPic` varchar(255) DEFAULT NULL,
  `identificationCardNum` int(255) DEFAULT NULL,
  `permissions` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`id`, `account_id`, `userName`, `firstName`, `lastName`, `profilePicture`, `emailAddress`, `nationality`, `identificationCardPic`, `identificationCardNum`, `permissions`) VALUES
(11, 52, 'amanualegu', 'Muluken', 'Getaye', 'https://media.licdn.com/dms/image/D4D03AQEAXVEvReQdBQ/profile-displayphoto-shrink_200_200/0/1705335229081?e=1714608000&v=beta&t=rb81sOBdAoBUDYBik8_YHRfw-2zkpuZ3KjnM7-SejvM', 'mulukengetaye9@gmail.com', 'China', NULL, NULL, ''),
(14, 51, 'seble', 'Sara', 'Khaliw', NULL, 'seble@gmail.com', NULL, NULL, NULL, ''),
(15, 54, 'adagefab', 'juma', 'meign', NULL, 'jamua@2akg.com', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `identificationCardPic` varchar(255) DEFAULT NULL,
  `identificationCardNum` int(11) DEFAULT NULL,
  `permissions` varchar(1000) DEFAULT NULL,
  `tasks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `identificationCardPic` varchar(255) DEFAULT NULL,
  `identificationCardNum` int(11) DEFAULT NULL,
  `permissions` varchar(1000) DEFAULT NULL,
  `tasks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `account_id`, `userName`, `firstName`, `lastName`, `profilePicture`, `emailAddress`, `nationality`, `identificationCardPic`, `identificationCardNum`, `permissions`, `tasks`) VALUES
(1, 31, 'zamandegu', 'Zamanual', 'Degu', NULL, 'adagefab078@gmail.com', 'Japan', NULL, NULL, NULL, NULL),
(3, 35, 'feti', 'Fetiha', 'Ahimed', 'https://media.licdn.com/dms/image/C5603AQEQjhZb34heng/profile-displayphoto-shrink_200_200/0/1612191019551?e=1714608000&v=beta&t=zZBXQbtl32XF5w2HEPEidvTgOdXXkg5TW103JzQwdL8', 'feti@gmail.com', 'Australia', NULL, NULL, '[{\"title\":\"dashboard\",\"path\":\"\",\"icon\":\"ic_analytics\"},{\"title\":\"Reservation\",\"path\":\"/user\",\"icon\":\"reservation1\"},{\"title\":\"Manage rooms\",\"path\":\"rooms\",\"icon\":\"ic_cart\"},{\"title\":\"Analytics\",\"path\":\"/blog\",\"icon\":\"ic_blog\"},{\"title\":\"Reports\",\"path\":\"/login\",\"icon\":\"ic_lock\"},  {\"title\": \"View User Account\", \"path\": \"view-account\", \"icon\": \"ic_account_circle\"},{\"title\": \"Manage Menu\", \"path\": \"/manage-menu\", \"icon\": \"ic_restaurant_menu\"},{\"title\": \"Manage Account\", \"path\": \"/manage-account\", \"icon\": \"ic_settings\"},{\"title\":\"Guest review\",\"path\":\"/404\",\"icon\":\"ic_disabled\"},{\"title\":\"Notification\",\"path\":\"/404\",\"icon\":\"ic_disabled\"},{\"title\":\"Compliments\",\"path\":\"/404\",\"icon\":\"ic_disabled\"}]', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `receptionist`
--

CREATE TABLE `receptionist` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `identificationCardPic` varchar(255) DEFAULT NULL,
  `identificationCardNum` int(11) DEFAULT NULL,
  `permissions` varchar(1000) DEFAULT NULL,
  `tasks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receptionist`
--

INSERT INTO `receptionist` (`id`, `account_id`, `userName`, `firstName`, `lastName`, `profilePicture`, `emailAddress`, `nationality`, `identificationCardPic`, `identificationCardNum`, `permissions`, `tasks`) VALUES
(6, 37, 'adabro', 'Addisu', 'Agerie', NULL, 'adagefab078@gmail.com', 'China', NULL, NULL, '[{\"title\":\"dashboard\",\"path\":\"/\",\"icon\":\"ic_analytics\"},{\"title\":\"Reservation\",\"path\":\"/user\",\"icon\":\"reservation1\"},{\"title\":\"Manage rooms\",\"path\":\"/products\",\"icon\":\"ic_cart\"},{\"title\":\"Analytics\",\"path\":\"/blog\",\"icon\":\"ic_blog\"},{\"title\":\"Reports\",\"path\":\"/login\",\"icon\":\"ic_lock\"},{\"title\":\"Guest review\",\"path\":\"/404\",\"icon\":\"ic_disabled\"},{\"title\":\"Notification\",\"path\":\"/404\",\"icon\":\"ic_disabled\"},{\"title\":\"Compliments\",\"path\":\"/404\",\"icon\":\"ic_disabled\"}]', NULL),
(7, 40, 'chuol', 'Juma', 'Miyen', NULL, 'mulukengetaye9@gmail.com', 'Brazil', NULL, NULL, '[{\"title\":\"dashboard\",\"path\":\"/\",\"icon\":\"ic_analytics\"},{\"title\":\"Reservation\",\"path\":\"/user\",\"icon\":\"reservation1\"},{\"title\":\"Manage rooms\",\"path\":\"/products\",\"icon\":\"ic_cart\"},{\"title\":\"Analytics\",\"path\":\"/blog\",\"icon\":\"ic_blog\"},{\"title\":\"Reports\",\"path\":\"/login\",\"icon\":\"ic_lock\"},{\"title\":\"Guest review\",\"path\":\"/404\",\"icon\":\"ic_disabled\"},{\"title\":\"Notification\",\"path\":\"/404\",\"icon\":\"ic_disabled\"},{\"title\":\"Compliments\",\"path\":\"/404\",\"icon\":\"ic_disabled\"}]', NULL),
(8, 47, 'samiabe', 'Samuel', 'Abe', NULL, 'sara@gamil.com', 'China', NULL, NULL, '[\r\n  {\"title\": \"Contact\", \"path\": \"/contact\", \"icon\": \"contactMail\"},\r\n  {\"title\": \"Process Check-in\", \"path\": \"/check-in\", \"icon\": \"personAdd\"},\r\n  {\"title\": \"Finalize Checkout\", \"path\": \"/checkout\", \"icon\": \"exitToApp\"},\r\n  {\"title\": \"Track Reservation\", \"path\": \"/track-reservation\", \"icon\": \"search\"},\r\n  {\"title\": \"Check Room Availability\", \"path\": \"/check-availability\", \"icon\": \"calendarToday\"},\r\n  {\"title\": \"Notified By Guest\", \"path\": \"/notifications\", \"icon\": \"notifications\"},\r\n  {\"title\": \"View User Account\", \"path\": \"/view-account\", \"icon\": \"accountCircle\"},\r\n  {\"title\": \"Mark Room Status\", \"path\": \"/mark-room-status\", \"icon\": \"checkBox\"}\r\n]', NULL),
(9, 48, 'shegaw', 'Shegaw', 'Desyalew', NULL, 'shegaw@gmail.com', 'Brazil', NULL, NULL, '[{\"title\":\"Contact\",\"path\":\"/contact\",\"icon\":\"ic_contact_mail\"},{\"title\":\"Process Check-in\",\"path\":\"/check-in\",\"icon\":\"ic_person_add\"},{\"title\":\"Finalize Checkout\",\"path\":\"/checkout\",\"icon\":\"ic_exit_to_app\"},{\"title\":\"Track Reservation\",\"path\":\"/track-reservation\",\"icon\":\"ic_search\"},{\"title\":\"Check Room Availability\",\"path\":\"/check-availability\",\"icon\":\"ic_calendar_today\"},{\"title\":\"Notified By Guest\",\"path\":\"/notifications\",\"icon\":\"ic_notifications\"},{\"title\":\"View User Account\",\"path\":\"/view-account\",\"icon\":\"ic_account_circle\"},{\"title\":\"Mark Room Status\",\"path\":\"/mark-room-status\",\"icon\":\"ic_check_box\"}]', NULL),
(10, 50, 'paulmuse', 'paul', 'muse', NULL, 'paul@gmail.com', 'France', NULL, NULL, '[{\"title\":\"Contact\",\"path\":\"/contact\",\"icon\":\"ic_contact_mail\"},{\"title\":\"Process Check-in\",\"path\":\"/check-in\",\"icon\":\"ic_person_add\"},{\"title\":\"Finalize Checkout\",\"path\":\"/checkout\",\"icon\":\"ic_exit_to_app\"},{\"title\":\"Track Reservation\",\"path\":\"/track-reservation\",\"icon\":\"ic_search\"},{\"title\":\"Check Room Availability\",\"path\":\"/check-availability\",\"icon\":\"ic_calendar_today\"},{\"title\":\"Notified By Guest\",\"path\":\"/notifications\",\"icon\":\"ic_notifications\"},{\"title\":\"View User Account\",\"path\":\"/view-account\",\"icon\":\"ic_account_circle\"},{\"title\":\"Mark Room Status\",\"path\":\"/mark-room-status\",\"icon\":\"ic_check_box\"}]', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `guestId` int(11) NOT NULL,
  `checkinDate` date NOT NULL,
  `checkoutDate` date NOT NULL,
  `addons` varchar(255) NOT NULL,
  `withBreackfast` tinyint(1) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `roomNumber` varchar(255) DEFAULT NULL,
  `roomName` varchar(255) DEFAULT NULL,
  `roomType` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `roomImage` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `features` varchar(255) DEFAULT NULL,
  `floor` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `occupacy` int(255) NOT NULL,
  `adult` int(11) NOT NULL,
  `children` int(11) NOT NULL,
  `area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `roomNumber`, `roomName`, `roomType`, `description`, `roomImage`, `price`, `features`, `floor`, `rating`, `occupacy`, `adult`, `children`, `area`) VALUES
(35, '211', 'Standard room and accessible', 'Accessible Room', 'this is room for the people with disablity', '[\"image0-1711902746422-367551941.jpeg\"]', 331.99, NULL, 1, 5, 3, 2, 3, 50),
(37, '4', 'Standard room and accessible', 'Single RoomDouble Room', 'dsfgsdgsdfsdfsd', '[\"image0-1712173621511-100149491.webp\"]', 30.00, '', 2, 9, 6, 3, 2, 22),
(38, '50', 'Standard room and accessible', 'Single Room', 'what the best room is', '[\"image0-1712219219472-867611448.jpg\"]', 20.00, NULL, 3, NULL, 2, 1, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `identificationCardPic` varchar(255) DEFAULT NULL,
  `identificationCardNum` int(11) DEFAULT NULL,
  `permissions` varchar(1000) DEFAULT NULL,
  `tasks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `alternate` (`userName`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roomId` (`roomId`),
  ADD KEY `foreign key` (`guestId`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receptionist`
--
ALTER TABLE `receptionist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `guest`
--
ALTER TABLE `guest`
  ADD CONSTRAINT `guest_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `maintenance_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD CONSTRAINT `receptionist_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `foreign key` FOREIGN KEY (`guestId`) REFERENCES `guest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `foreign key1` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
