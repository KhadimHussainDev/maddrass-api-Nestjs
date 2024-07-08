import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'maddison53@ethereal.email',
        pass: 'jn7jnAPss4f63QBp6D',
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost/3000/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-Backend Service',
      to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the lind below to reset your password : </p> <p><a href="${resetLink}> Reset Password</p>"`,
    };
    this.transporter.sendMail(mailOptions);
  }
}
