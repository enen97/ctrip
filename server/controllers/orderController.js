const orderModel = require("../models/orderModel");
const { success, error } = require("../utils/response");
const alipaySdk = require("../utils/alipay");

const createOrder = async (req, res) => {
  try {
    // 1️⃣ 创建订单（数据库）
    const userId = req.body.userId;
    const orderNo = generateOrderNo(userId);
    const orderData = {
      ...req.body,
      tradeNo: orderNo,
    };
    await orderModel.createOrder(orderData);

    // 2️⃣ 调起支付宝支付
    const formHtml = alipaySdk.pageExec("alipay.trade.page.pay", {
      method: "GET",
      bizContent: {
        outTradeNo: orderNo, // 必须字符串
        totalAmount: Number(orderData.totalPrice),
        subject: "酒店订单",
        productCode: "FAST_INSTANT_TRADE_PAY",
      },
      returnUrl: `http://localhost:5173/order/pay-success`,
      notifyUrl: "https://22d42def.r36.cpolar.top/api/order/notify",
    });

    // 3️⃣ 返回 HTML（自动跳转支付宝）
    res.send(formHtml);
  } catch (err) {
    console.error("创建订单失败:", err);
    res.json(error("服务器错误，创建订单失败"));
  }
};
// 根据当前时间生成唯一订单号
const generateOrderNo = (userId) => {
  const now = new Date();
  const timestamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  // 截取 userId 后 6 位，不足补 0
  const userPart = String(userId).slice(-6).padStart(6, "0");
  // 3 位随机数防止同秒重复
  const randomPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `${timestamp}${userPart}${randomPart}`;
};

const handleNotify = async (req, res) => {
  try {
    const params = req.body;
    // 验证签名
    const isValid = alipaySdk.checkNotifySign(params);

    if (isValid && params.trade_status === "TRADE_SUCCESS") {
      console.log(params);
      const orderNo = params.out_trade_no;
      const alipay_trade_no = params.trade_no;
      await orderModel.updateOrderStatus(orderNo, 1, alipay_trade_no); // 1 代表已支付
      res.send("success"); // 必须返回 success 告诉支付宝已处理
    } else {
      res.send("fail");
    }
  } catch (err) {
    console.error("处理支付通知失败:", err);
    res.send("error");
  }
};

const getOrderStatus = async (req, res) => {
  try {
    const { orderNo } = req.params;

    const order = await orderModel.getOrderByTradeNo(orderNo);

    if (!order) {
      return res.status(404).send({
        message: "订单不存在",
      });
    }

    res.send({
      orderNo: order.trade_no,
      status: order.status,
      totalPrice: order.total_price,
    });
  } catch (err) {
    console.error("查询订单失败:", err);
    res.status(500).send({ message: "服务器错误" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const orders = await orderModel.getUserOrders(userId);

    // 映射状态码到前端需要的文字和类型
    const mappedOrders = orders.map((order) => {
      let statusText = "未知";
      let statusType = "other";

      switch (order.status) {
        case 0:
          statusText = "待支付";
          statusType = "pending_pay";
          break;
        case 1:
          statusText = "未出行";
          statusType = "unfiltered";
          break;
        case 2:
          statusText = "已取消";
          statusType = "cancelled";
          break;
        case 3:
          statusText = "待点评";
          statusType = "pending_review";
          break;
      }
      return { ...order, status: statusText, statusType };
    });
    res.json(success(mappedOrders));
  } catch (err) {
    console.error("获取订单失败:", err);
    res.json(error(err.message || err));
  }
};

const searchUserOrders = async (req, res) => {
  try {
    const { userId, checkIn, checkOut, guest, orderNo, status } = req.query;
    console.log(userId, checkIn, checkOut, guest, orderNo, status);
    const orders = await orderModel.searchUserOrders(userId, checkIn, checkOut, guest, orderNo, status);
    // 映射状态码到前端需要的文字和类型
    const mappedOrders = orders.map((order) => {
      let statusText = "未知";
      let statusType = "other";

      switch (order.status) {
        case 0:
          statusText = "待支付";
          statusType = "pending_pay";
          break;
        case 1:
          statusText = "未出行";
          statusType = "unfiltered";
          break;
        case 2:
          statusText = "已取消";
          statusType = "cancelled";
          break;
        case 3:
          statusText = "待点评";
          statusType = "pending_review";
          break;
      }
      return { ...order, status: statusText, statusType };
    });
    res.json(success(mappedOrders));
  } catch (err) {
    console.error("搜索订单失败:", err);
    res.json(error(err.message || err));
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderNo } = req.body;
    await orderModel.deleteOrder(orderNo);
    res.json(success("订单删除成功"));
  } catch (err) {
    console.error("删除订单失败:", err);
    res.json(error(err.message || err));
  }
};

module.exports = {
  createOrder,
  handleNotify,
  getOrderStatus,
  getUserOrders,
  deleteOrder,
  searchUserOrders,
};
