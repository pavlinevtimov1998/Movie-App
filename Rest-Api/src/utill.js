exports.removePassword = (data) => {
  const { password, __v, ...user } = data;

  return user;
};

exports.parseDocument = (data) => JSON.parse(JSON.stringify(data));
