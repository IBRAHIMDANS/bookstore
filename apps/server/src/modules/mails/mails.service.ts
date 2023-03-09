import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailjet from 'node-mailjet';
import { Message } from '@/modules/mails/mail.types';

@Injectable()
export class MailsService {
  private readonly baseUrl: string;
  private readonly from: string;
  private transporter;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = this.config.get('app.baseUrl');
    this.from = this.config.get('mail.senderEmail');
    this.transporter = new mailjet.Client({
      apiKey: this.config.get('mail.username'),
      apiSecret: this.config.get('mail.password'),
    });
  }

  async sendEmail({
    to,
    subject,
    html,
    templateId,
    variables,
  }: {
    to: string;
    subject: string;
    html?: string;
    templateId?: number;
    variables?: { [key: string]: string | number };
  }): Promise<any> {
    const msg: Message = {
      to,
      from: this.from,
      name: 'Book Store',
      subject,
      templateId,
      variables,
      html,
    };
    return this.send(msg);
  }

  async send(msg: Message) {
    return this.transporter.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: msg.from,
            Name: msg.name,
          },
          To: [
            {
              Email: msg.to,
              Name: msg.to,
            },
          ],
          Subject: msg.subject,
          ...(msg.templateId && {
            TemplateID: msg.templateId,
            TemplateLanguage: true,
          }),
          ...(msg.html && { HtmlPart: msg.html }),
          ...(msg.variables && { Variables: msg.variables }),
        },
      ],
    });
  }
}
