const userService = require("../services/userService");
const { success, error } = require("../utils/response");

const login = async (req, res) => {
  try {
    const { account, password } = req.body;
    const data = await userService.login(account, password);
    res.json(success(data));
  } catch (err) {
    console.log(err);
    res.json(error(err.message || err));
  }
};

const register = async (req, res) => {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.json(error("账号和密码不能为空"));
    }

    const data = await userService.register(account, password);
    res.json(success(data));
  } catch (err) {
    res.json(error(err.message || err));
  }
};

module.exports = {
  login,
  register,
};
