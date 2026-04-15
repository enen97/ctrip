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

 Date: 14/04/2026 20:19:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;
