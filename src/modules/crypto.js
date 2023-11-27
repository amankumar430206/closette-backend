import crypto from "crypto";

// Encryption function using the crypto module
export const encrypt = (text) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", "your-secret-key");
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Decryption function using the crypto module
export const decrypt = (text) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", "your-secret-key");
  let decrypted = decipher.update(text, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
};
