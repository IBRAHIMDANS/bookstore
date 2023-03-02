export type Message = {
  to: string;
  from: string;
  subject: string;
  html: string;
  templateId?: number;
  Variables?: any;
  [key: string]: any;
};
