-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2022 at 12:25 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mohit_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `dep_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `dep_name`) VALUES
(1, 'Sales'),
(2, 'Purchase');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `contact_no` varchar(10) NOT NULL,
  `profile_image` varchar(150) NOT NULL,
  `department_id` int(11) NOT NULL,
  `is_status` varchar(10) NOT NULL,
  `token` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `name`, `email`, `password`, `contact_no`, `profile_image`, `department_id`, `is_status`, `token`) VALUES
(1, 'demo1', 'demo1@gmail.com', '$2b$10$ppXViUYdr6lgYBYzrlqMleY6jDThsAsP4yQFUmj8/1fjBoZG80mnO', '2255669988', '/upload/1656940232095.jpg', 1, 'Active', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MSwiZW1haWwiOiJkZW1vMUBnbWFpbC5jb20iLCJjb250YWN0X25vIjoiMjI1NTY2OTk4OCIsInByb2ZpbGVfaW1hZ2UiOiJ0ZXN0aW5nL3Rlc3QuanBnIiwiZGVwYXJ0bWVudF9pZCI6MSwiaWF0IjoxNjU2OTEyMTc2LCJleHAiOjE2NTY5MTkzNzZ9.aIqoueD69944bExHtrKSkVTsG-Y0ROfdVgk5wv3KgQ8'),
(2, 'demo2', 'demo2@gmail.com', '$2b$10$4gfgAnzS7OaOs/TCv43XzeQVCyuH7RaCGC.A2Y.zaBeJY1ChQjYGS', '1234569856', '/upload/1656925410599.jpg', 1, 'Active', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6MiwiZW1haWwiOiJkZW1vMkBnbWFpbC5jb20iLCJjb250YWN0X25vIjoiMTIzNDU2OTg1NiIsInByb2ZpbGVfaW1hZ2UiOiIvdXBsb2FkLzE2NTY5MjU0MTA1OTkuanBnIiwiZGVwYXJ0bWVudF9pZCI6MSwiaWF0IjoxNjU2OTI1NTE0LCJleHAiOjE2NTY5MzI3MTR9.eU9LqP4pIFjTDc7VkwrYceqMG2aw5XNCqAaqZPuiy48'),
(3, 'demo1', 'demo3@gmail.com', '$2b$10$nvHNbhqocX8m4cRf3RQE9Osa/tLty7JHa8U08XOIqasPujjBBMdSe', '1234569856', '/upload/1656925433700.jpg', 2, 'Active', ''),
(4, 'demo1', 'demo4@gmail.com', '$2b$10$STDouu073Vb.AutxXad/oOT3y/tpq/csCrszyzLRPt4aAL8wDnQ5m', '1234569856', '/upload/1656925436264.jpg', 1, 'Active', ''),
(5, 'demo1', 'demo5@gmail.com', '$2b$10$teUdV76EbjLNM4q/bD88W.W7WuN6pBrf3yLsRO576rYwpkktUafKi', '1234569856', '/upload/1656925440007.jpg', 1, 'Active', ''),
(6, 'demo1', 'demo6@gmail.com', '$2b$10$lynOv1jCh.2BS/S0sr/UYu81RcN8qxRtfBwDbdGBg9RyXr7ERpJNm', '1234569856', '/upload/1656924451099.jpg', 1, 'Active', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
