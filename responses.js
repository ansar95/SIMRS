const respon = (status, data, pesan, res) => {
  res.status(status).json({
    payload: {
      status_code: status,
      datas: data,
    },
    message: pesan,
    pagination: {
      prev: "",
      next: "",
      max: "",
    },
  });
};

module.exports = respon;
