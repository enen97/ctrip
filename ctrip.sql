/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 90001
 Source Host           : localhost:3306
 Source Schema         : ctrip

 Target Server Type    : MySQL
 Target Server Version : 90001
 File Encoding         : 65001

 Date: 14/04/2026 20:19:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '城市名称',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hotel
-- ----------------------------
DROP TABLE IF EXISTS `hotel`;
CREATE TABLE `hotel`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '酒店ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '酒店名称',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '城市',
  `district` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '区域',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '详细地址',
  `latitude` decimal(10, 6) NULL DEFAULT NULL COMMENT '纬度',
  `longitude` decimal(10, 6) NULL DEFAULT NULL COMMENT '经度',
  `star_level` int NULL DEFAULT NULL COMMENT '星级（1-5）',
  `score` decimal(2, 1) NULL DEFAULT NULL COMMENT '评分（0-5）',
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '酒店描述',
  `reviews` int NULL DEFAULT NULL,
  `facilities` json NULL COMMENT '酒店设施（JSON数组）',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10584 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '酒店表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for hotel_image
-- ----------------------------
DROP TABLE IF EXISTS `hotel_image`;
CREATE TABLE `hotel_image`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  `hotel_id` bigint NULL DEFAULT NULL COMMENT '酒店ID',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片URL',
  `sort` int NULL DEFAULT 0 COMMENT '排序（越小越靠前）',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_hotel_id`(`hotel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23734 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '酒店图片表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `trade_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '本地订单号',
  `alipay_trade_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '订单号（唯一）',
  `user_id` bigint NULL DEFAULT NULL COMMENT '用户ID',
  `hotel_id` bigint NULL DEFAULT NULL COMMENT '酒店ID',
  `room_type_id` bigint NULL DEFAULT NULL COMMENT '房型ID',
  `total_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '订单总金额',
  `status` tinyint NULL DEFAULT NULL COMMENT '状态：0待支付 1未出行 2已取消 3待点评',
  `rooms` bigint NOT NULL COMMENT '房间数量',
  `guest_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '房客名称',
  `guest_email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '房客邮箱',
  `guest_phone` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '房客电话',
  `elevator` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电梯远近',
  `check_in` date NULL DEFAULT NULL COMMENT '入住日期',
  `check_out` date NULL DEFAULT NULL COMMENT '离店日期',
  `arrival_time` time(0) NULL DEFAULT NULL COMMENT '到达时间',
  `paid_at` datetime(0) NULL DEFAULT NULL COMMENT '支付时间',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_no`(`alipay_trade_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '明细ID',
  `order_id` bigint NULL DEFAULT NULL COMMENT '订单ID',
  `date` date NULL DEFAULT NULL COMMENT '日期',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '当天价格',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '订单明细表（按天记录价格）' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '支付ID',
  `order_id` bigint NULL DEFAULT NULL COMMENT '订单ID',
  `payment_no` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '支付流水号',
  `amount` decimal(10, 2) NULL DEFAULT NULL COMMENT '支付金额',
  `status` tinyint NULL DEFAULT NULL COMMENT '支付状态：0未支付 1已支付',
  `paid_at` datetime(0) NULL DEFAULT NULL COMMENT '支付时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 50 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '支付记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for room_inventory
-- ----------------------------
DROP TABLE IF EXISTS `room_inventory`;
CREATE TABLE `room_inventory`  (
  `room_type_id` bigint NULL DEFAULT NULL COMMENT '房型ID',
  `date` date NULL DEFAULT NULL COMMENT '日期',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '当天价格',
  `stock` int NULL DEFAULT NULL COMMENT '总库存',
  `locked_stock` int NULL DEFAULT 0 COMMENT '已锁定库存（未支付订单）',
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_room_type_id`(`room_type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1051 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '房型库存表（按日期）' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for room_type
-- ----------------------------
DROP TABLE IF EXISTS `room_type`;
CREATE TABLE `room_type`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '房型ID',
  `hotel_id` bigint NULL DEFAULT NULL COMMENT '酒店ID',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '房型名称',
  `bed_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '床型（大床/双床等）',
  `area` int NULL DEFAULT NULL COMMENT '面积（平方米）',
  `max_people` int NULL DEFAULT NULL COMMENT '最大入住人数',
  `base_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '基础价格',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_hotel_id`(`hotel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '房型表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for room_type_image
-- ----------------------------
DROP TABLE IF EXISTS `room_type_image`;
CREATE TABLE `room_type_image`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  `room_type_id` bigint NOT NULL COMMENT '房型ID',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片URL',
  `sort` int NULL DEFAULT 0 COMMENT '排序（越小越靠前）',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idx_room_type_id`(`room_type_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 151 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '房型图片表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名（唯一）',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码（加密存储）',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像URL',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `status` tinyint NULL DEFAULT 1 COMMENT '状态：1正常 0禁用',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for update_facilities
-- ----------------------------
DROP PROCEDURE IF EXISTS `update_facilities`;
delimiter ;;
CREATE PROCEDURE `update_facilities`()
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE hid INT;
  DECLARE cnt INT;

  DECLARE cur CURSOR FOR SELECT id FROM hotel;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur;

  read_loop: LOOP
    FETCH cur INTO hid;
    IF done THEN
      LEAVE read_loop;
    END IF;

    -- ✅ 关键：先生成随机数量（3~8）
    SET cnt = FLOOR(3 + RAND() * 6);

    SET @json = (
      SELECT JSON_ARRAYAGG(fac)
      FROM (
        SELECT @f1 AS fac UNION ALL
        SELECT @f2 UNION ALL
        SELECT @f3 UNION ALL
        SELECT @f4 UNION ALL
        SELECT @f5 UNION ALL
        SELECT @f6 UNION ALL
        SELECT @f7 UNION ALL
        SELECT @f8
      ) t
      ORDER BY RAND()
      LIMIT cnt   -- ✅ 用变量
    );

    UPDATE hotel SET facilities = @json WHERE id = hid;

  END LOOP;

  CLOSE cur;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
