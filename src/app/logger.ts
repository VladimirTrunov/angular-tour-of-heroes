import { MessageService } from './services/message.service';

export interface ILogger {
  log: (message: string) => void;
}

export class Logger implements ILogger {
  private messageService: MessageService;
  private serviceName: string;

  constructor(messageService: MessageService, serviceName: string) {
    this.messageService = messageService;
    this.serviceName = serviceName;
  }

  public log = (message: string): void => {
    this.messageService.add(`${this.serviceName}: ${message}`);
  }
}
