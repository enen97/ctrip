const success = (data) => {
  return {
    code: 200,
    msg: "success",
    data,
  };
};

const error = (msg = "error") => {
  return {
    code: 500,
    msg,
  };
};

module.exports = {
  success,
  error,
};
