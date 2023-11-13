const generatePassword = (user) => {
  return (
    user.branch +
    user.roll_no.substring(user.roll_no.length - 5, user.roll_no.length)
  );
};

module.exports = { generatePassword };
