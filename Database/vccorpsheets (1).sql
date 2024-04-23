-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 23, 2024 lúc 04:40 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vccorpsheets`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sheets`
--

CREATE TABLE `sheets` (
  `idRow` int(11) NOT NULL,
  `idWebsite` int(11) NOT NULL,
  `adsPosition` varchar(255) NOT NULL,
  `dimensions` varchar(255) NOT NULL,
  `platform` varchar(255) NOT NULL,
  `demo` varchar(255) NOT NULL,
  `linkDemo` text NOT NULL,
  `buyingMethod` varchar(255) DEFAULT NULL,
  `price1` int(11) DEFAULT NULL,
  `price2` int(11) DEFAULT NULL,
  `price3` int(11) DEFAULT NULL,
  `performance1` varchar(255) DEFAULT NULL,
  `performance2` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `idStyle` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sheets`
--

INSERT INTO `sheets` (`idRow`, `idWebsite`, `adsPosition`, `dimensions`, `platform`, `demo`, `linkDemo`, `buyingMethod`, `price1`, `price2`, `price3`, `performance1`, `performance2`, `note`, `idStyle`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(8, 4, 'Full Homepage Plus (Full Banner) *Đơn giá chuyên mục là giá của 1 chuyên mục', 'Toàn bộ không gian quảng cáo tại Trang chủ hoặc chuyên mục.\nEntire ad space at Homepage or Category\n\nKích thước vị trí Top cao 90px\nTop banner: 90px high', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/nghianguyentrong-2372/cpd_thanhnien_pc.jpg', 'Độc quyền ngày\nExclusive date', 70000000, NULL, 30000000, NULL, NULL, NULL, 3, '2024-04-17 09:57:11', NULL, NULL, NULL),
(14, 1, 'Full Homepage Premium', 'Toàn bộ không gian quảng cáo tại Trang chủ. (Trừ CPD TVC)\nEntire ad space at Homepage.\n\nKích thước vị trí Top Billboard cao 350px, Background Sticky\nTop Billboard: 350px high & Background Sticky', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Độc quyền ngày', 370000000, NULL, NULL, '0,06 - 0,08', NULL, NULL, 1, '2024-04-22 12:34:59', NULL, NULL, NULL),
(16, 1, 'Full Homepage Plus', 'Toàn bộ không gian quảng cáo tại Trang chủ. (Trừ CPD TVC)\nEntire ad space at Homepage.\n\nKích thước vị trí Top Billboard cao 350px.\nTop Billboard: 350px high.', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Độc quyền ngày', 340000000, NULL, NULL, '0,06 - 0,08', NULL, NULL, 1, '2024-04-22 13:51:15', NULL, NULL, NULL),
(17, 1, 'Full Homepage Plus', 'Toàn bộ không gian quảng cáo tại Trang chủ. (Trừ CPD TVC)\nEntire ad space at Homepage.\n\nKích thước vị trí Top Billboard cao 350px.\nTop Billboard: 350px high.', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Chia sẻ 5/ngày', 80000000, NULL, NULL, '0,06 - 0,0%', NULL, NULL, 1, '2024-04-22 13:53:08', NULL, NULL, NULL),
(18, 1, 'Billboard', '1920x450\nBanner Responsive theo từng kích thước màn hình', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Độc quyền ngày', 135000000, NULL, NULL, '0.08 - 0.1', NULL, NULL, 1, '2024-04-22 13:53:57', NULL, NULL, NULL),
(19, 1, 'Billboard', '1920x450\nBanner Responsive theo từng kích thước màn hình', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Chia sẻ 5/ngày', 255000000, NULL, NULL, '0.1', NULL, NULL, 1, '2024-04-22 13:57:03', NULL, NULL, NULL),
(20, 1, 'CPD TVC', '3 kích thước tùy chọn:\n- Tỉ lệ video 16:9. Kích thước hiển thị: 640x584\n- Tỉ lệ video  1:1. Kích thước hiển thị: 640x850\n- Tỉ lệ video 9:16. Kích thước hiển thị: 640x1138', 'Mobile', 'DEMO iTVC 16:9\nDEMO iTVC 1:1\nDEMO iTVC 9:16', 'https://www.figma.com/proto/Q8BPY28HR9IoQHVnaiVW0f/TVC-CDP?page-id=87%3A145&type=design&node-id=89-212&viewport=624%2C268%2C0.25&scaling=min-zoom&starting-point-node-id=87%3A149\nhttps://www.figma.com/proto/Q8BPY28HR9IoQHVnaiVW0f/TVC-CDP?page-id=104%3A287&type=design&node-id=104-316&viewport=748%2C-4757%2C1&scaling=min-zoom&starting-point-node-id=104%3A288\nhttps://www.figma.com/proto/Q8BPY28HR9IoQHVnaiVW0f/TVC-CDP?page-id=104%3A386&type=design&node-id=104-415&viewport=-1%2C-898%2C1&scaling=min-zoom&starting-point-node-id=104%3A387', 'Độc quyền ngày', 60000000, NULL, NULL, '0.08 - 0.1', NULL, NULL, 1, '2024-04-22 14:05:01', NULL, NULL, NULL),
(22, 1, 'Top Banner Mobile', '640x320', 'Mobile', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafeef.png', 'Chia sẻ 5/tuần', 90000000, NULL, NULL, '0.1 - 0.15', NULL, NULL, 1, '2024-04-22 14:27:39', NULL, NULL, NULL),
(23, 1, 'eMagazine Mobile 1', '640x870', 'Mobile', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafeef.png', 'Chia sẻ 5/tuần', 75000000, NULL, NULL, '0.08 - 0.1', NULL, NULL, 1, '2024-04-22 14:32:11', NULL, NULL, NULL),
(24, 1, 'eMagazine Mobile 2', '640x870', 'Mobile', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafeef.png', 'Chia sẻ 5/tuần', 50000000, NULL, NULL, '0.08 - 0.1', NULL, NULL, 1, '2024-04-22 14:42:20', NULL, NULL, NULL),
(25, 1, 'Inpage Fullscreen Mobile', '375x750', 'Mobile', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafeef.png', 'Độc quyền ngày', 105000000, NULL, NULL, '0.4 - 0.5', NULL, NULL, 1, '2024-04-22 14:46:58', NULL, NULL, NULL),
(26, 1, 'CPD KingSize', '1040x250', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Chia sẻ 5/tuần', 125000000, NULL, NULL, '0.07 - 0.09', NULL, NULL, 1, '2024-04-22 14:49:25', NULL, NULL, NULL),
(27, 1, 'Big Rectangle', '300x385', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Chia sẻ 5/tuần', 75000000, NULL, NULL, '0.04 - 0.06', NULL, NULL, 1, '2024-04-22 14:52:17', NULL, NULL, NULL),
(29, 1, 'Center banner', '700x90', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Chia sẻ 5/tuần', 55000000, NULL, NULL, '0.02 - 0.03', NULL, NULL, 1, '2024-04-22 15:02:04', NULL, NULL, NULL),
(30, 1, 'CPD TVC', 'Tỉ lệ video 16:9\nKích thước hiển thị: 710 x 468', 'PC', 'DEMO', 'https://www.figma.com/proto/Q8BPY28HR9IoQHVnaiVW0f/TVC-CDP?page-id=0%3A1&type=design&node-id=1-4&viewport=-1004%2C-4734%2C1&scaling=scale-down&starting-point-node-id=1%3A4', 'Độc quyền ngày', 115000000, NULL, NULL, '0.02 - 0.03', NULL, NULL, 1, '2024-04-23 09:19:39', NULL, NULL, NULL),
(31, 1, 'High Banner A', '300x600', 'PC', 'DEMO', 'https://in.admicro.vn/uploads/demo-1512/cafef.jpg', 'Chia sẻ 5/tuần', 70000000, NULL, NULL, '0.02 - 0.03', NULL, NULL, 1, '2024-04-23 09:35:24', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `style`
--

CREATE TABLE `style` (
  `idStyle` int(11) NOT NULL,
  `col1` varchar(255) NOT NULL,
  `col2` varchar(255) NOT NULL,
  `col3` varchar(255) NOT NULL,
  `col4` varchar(255) NOT NULL,
  `col5` varchar(255) NOT NULL,
  `detailCol1` varchar(255) NOT NULL,
  `detailCol2` varchar(255) NOT NULL,
  `detailCol3` varchar(255) NOT NULL,
  `detailCol4` varchar(255) NOT NULL,
  `detailCol5` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `style`
--

INSERT INTO `style` (`idStyle`, `col1`, `col2`, `col3`, `col4`, `col5`, `detailCol1`, `detailCol2`, `detailCol3`, `detailCol4`, `detailCol5`) VALUES
(1, 'buyingMethod', 'price1', 'price2', 'performance1', 'performance2', 'Cách tính giá', 'Trang chủ', 'Roadblock Xuyên site\r\n(Độc quyền ngày)', 'CTR Trung bình (%)', 'Est. Traffic\r\n/Tuần/\r\nslot'),
(2, 'buyingMethod', 'Price1', 'performance1', 'performance2', 'note', 'Cách tính giá', 'ĐƠN GIÁ (VNĐ)', 'CTR trung bình (%)', 'Est Impression', 'Note'),
(3, 'buyingMethod', 'price1', 'price2', 'price3', 'performance1', 'Cách tính giá', 'TRANG CHỦ\r\n(Đã bao gồm VAT)', 'XUYÊN TRANG\r\n(Đã bao gồm VAT)', 'CHUYÊN MỤC (*)\r\n(Đã bao gồm VAT)', 'Est. Traffic'),
(4, 'buyingMethod', 'price1', 'price2', 'performance1', 'performance2', 'Cách tính giá', 'Trang chủ\r\n(Đã gồm VAT)', 'Roadblock xuyên site\r\n(Độc quyền ngày)\r\n(Chưa gồm VAT)', 'CTR trung bình (%)', 'Est. Traffic'),
(5, 'price1', 'price2', 'price3', 'performance1', 'performance2', 'Tuần\r\n(Chia sẻ 3)', 'Tháng\r\n(Chia sẻ 3)', 'Quý\r\n(Chia sẻ 3)', 'Est. CTR (%)', 'Est. Traffic'),
(6, 'buyingMethod', 'price1', 'price2', 'price3', 'performance1', 'buyingMethod', 'TRANG CHỦ', 'XUYÊN TRANG CHI TIẾT', 'XUYÊN TRANG', 'Est Traffic');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `website`
--

CREATE TABLE `website` (
  `idWebsite` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `website`
--

INSERT INTO `website` (`idWebsite`, `name`, `url`, `description`) VALUES
(1, 'Cafef.vn', 'https://cafef.vn', NULL),
(2, 'Cafebiz.vn', 'https://cafebiz.vn', NULL),
(3, 'nld.com.vn', 'https://nld.com.vn', NULL),
(4, 'vtv.vn', 'https://vtv.vn', NULL),
(5, 'kenh14.vn', 'https://kenh14.vn', NULL),
(6, 'soha.vn', 'https://soha.vn', NULL),
(7, 'afamily.vn', 'https://afamily.vn', NULL),
(8, 'housenhome', 'https://housenhome.com.vn', NULL),
(9, 'phunuvietnam.vn', 'https://phunuvietnam.vn', NULL),
(10, 'giadinh.suckhoedoisong.vn', 'https://giadinh.suckhoedoisong.vn/', NULL),
(11, 'gamek.vn', 'https://gamek.vn', NULL),
(12, 'genk.vn', 'https://genk.vn', NULL),
(13, 'autopro.com.vn', 'https://autopro.com.vn/', NULL),
(14, 'thanhnien.vn', 'https://thanhnien.vn/', NULL),
(15, 'tuoitre.vn', 'https://tuoitre.vn/', NULL),
(16, 'Vneconomy.vn', 'http://vneconomy.vn/', NULL),
(17, 'Toquoc.vn', 'http://toquoc.vn/', NULL),
(18, 'suckhoedoisong.vn', 'http://suckhoedoisong.vn/', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `sheets`
--
ALTER TABLE `sheets`
  ADD PRIMARY KEY (`idRow`);

--
-- Chỉ mục cho bảng `style`
--
ALTER TABLE `style`
  ADD PRIMARY KEY (`idStyle`);

--
-- Chỉ mục cho bảng `website`
--
ALTER TABLE `website`
  ADD PRIMARY KEY (`idWebsite`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `sheets`
--
ALTER TABLE `sheets`
  MODIFY `idRow` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `style`
--
ALTER TABLE `style`
  MODIFY `idStyle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `website`
--
ALTER TABLE `website`
  MODIFY `idWebsite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
