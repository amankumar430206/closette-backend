import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OTP_EMAIL,
    pass: process.env.OTP_PASS,
  },
});

export const triggerEmail = async ({ to = "", OTP = 123456 }) => {
  const info = await transporter.sendMail({
    from: process.env.OTP_EMAIL, // sender address
    to: to, // list of receivers
    subject: "OTP Verification | Closette", // Subject line
    text: `Your One Time Password is : ${OTP}`, // plain text body
  });

  return info;
};
