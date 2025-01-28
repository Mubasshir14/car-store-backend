import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'smmubasshiralkasshaf15@gmail.com',
      pass: 'ceuv qvlu wweh cdmf',
    },
  });

  await transporter.sendMail({
    from: 'smmubasshiralkasshaf15@gmail.com',
    to,
    subject: 'Reset your password within ten mins!',
    text: '',
    html,
  });
};
