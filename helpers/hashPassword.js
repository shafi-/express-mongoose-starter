const bcrypt = require('bcryptjs');

// Generate a salt for passsword
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  // Hash a password with salt all together
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

module.exports = hashPassword;
