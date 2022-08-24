const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.removePassword = (data) => {
  const { password, __v, ...user } = data;

  return user;
};

exports.parseDocument = (data) => JSON.parse(JSON.stringify(data));

exports.jwtPromise = (id, secret) => {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise({ id }, secret, { expiresIn: "1d" });
};

exports.jwtVerify = (token, secret) => {
  const jwtVerifyPromise = promisify(jwt.verify);

  return jwtVerifyPromise(token, secret);
};

exports.trimData = (data) =>
  data.reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim() }), {});
