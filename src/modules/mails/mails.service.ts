import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailjet from 'node-mailjet';

@Injectable()
export class MailsService {
  private readonly baseUrl: string;
  private readonly from: string;
  private transporter;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = 'http://localhost:3000';
    this.from = 'no-reply@localhost';
    this.transporter = new mailjet.Client({
      apiKey: this.config.get('mail.username'),
      apiSecret: this.config.get('mail.password'),
    });
  }

  async sendConfirmationEmail(email: string, token: string) {
    const url = `${this.baseUrl}/auth/confirm/${token}`;
    const html = `
      <p>Please confirm your email by clicking on the following link:</p>
      <a href='${url}'>${url}</a>
    `;
    await this.sendEmail(email, 'Please confirm your email', html);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const url = `${this.baseUrl}/auth/reset-password/${token}`;
    const html = `
      <p>Please reset your password by clicking on the following link:</p>
      <a href='${url}'>${url}</a>
    `;
    await this.sendEmail(email, 'Reset your password', html);
  }

  async sendEmail(to: string, subject: string, html: string) {
    const msg = {
      to,
      from: this.from,
      subject,
      html,
    };
    await this.send(msg);
  }

  async send(msg) {
    return this.transporter.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: msg.from,
            Name: 'Book Store',
          },
          To: [
            {
              Email: msg.to,
              Name: msg.to,
            },
          ],
          TemplateID: msg.TemplateID,
          TemplateLanguage: true,
          Subject: msg.subject,
          Variables: {
            ...msg,
          },
        },
      ],
    });
  }
}
