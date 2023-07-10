import { OnEvent } from '@nestjs/event-emitter';
import { CreateAccountService } from '../services/create-account.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAccountEventListener {
  constructor(private readonly createAccountService: CreateAccountService) {}
  @OnEvent('user.created')
  async handleUserCreatedEvent(payload: any) {
    try {
      await this.createAccountService.execute(payload.userId);
    } catch (error) {
      console.log(error);
    }
  }
}
