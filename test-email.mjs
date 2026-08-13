import nodemailer from "nodemailer";
import fs from "fs";

const envStr = fs.readFileSync(".env.local", "utf-8");
const env = Object.fromEntries(
  envStr.split("\n").filter(l => l && !l.startsWith("#")).map(l => {
    const splitIndex = l.indexOf("=");
    return [l.substring(0, splitIndex), l.substring(splitIndex + 1).trim()];
  })
);

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(env.SMTP_PORT || "587"),
  secure: env.SMTP_SECURE === "true",
  auth: {
    user: env.EMAIL_ID,
    pass: env.EMAIL_PASS,
  },
});

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: `"Test" <${env.EMAIL_ID}>`,
      to: env.EMAIL_ID, // send to self
      subject: "Test Email from Nodemailer",
      text: "This is a test email to verify credentials.",
    });
    console.log("Email sent successfully: ", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

testEmail();
