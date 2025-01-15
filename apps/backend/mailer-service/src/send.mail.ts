import nodemailer from 'nodemailer';
import getTemplate from './read.template';
import { env } from './validations/env';

const transporter = nodemailer.createTransport({
  //SMTP server created
  host: 'smtppro.zoho.in',
  port: 587,
  secure: false,
  auth: {
    user: env.LOGIN,
    pass: env.PASSWORD,
  },
});

export const sendEmail = async (email: string) => {
  const emailTemplate = getTemplate();

  const mailOptions = {
    from: env.EMAIL,
    to: email,
    subject: 'Welcome To EvolveDev',
    html: emailTemplate,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
