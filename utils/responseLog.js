const responseLog = async (res, data, message, success) => {
  await res.status(200).send({
    success,
    message,
    data
  });
};

module.exports = { responseLog };
