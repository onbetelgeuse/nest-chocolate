import {
  EntitySubscriberInterface,
  InsertEvent,
  EventSubscriber,
  UpdateEvent,
  EntityManager,
  MoreThan,
  LessThan,
  DeleteResult,
} from 'typeorm';
import { Token } from './token.entity';
import { Injectable, Scope, Logger } from '@nestjs/common';
import * as moment from 'moment';

@Injectable({ scope: Scope.REQUEST })
@EventSubscriber()
export class TokenSubscriber implements EntitySubscriberInterface<Token> {
  private readonly logger: Logger = new Logger(TokenSubscriber.name);

  public listenTo = () => Token;
  public async afterInsert(event: InsertEvent<Token>): Promise<void> {
    const result: DeleteResult = await this.deleteTokens(event.manager);

    this.logger.log(result.affected);
  }

  public async afterUpdate(event: UpdateEvent<Token>): Promise<void> {
    this.logger.log('update');
  }

  private async deleteTokens(manager: EntityManager): Promise<DeleteResult> {
    return manager.delete(Token, {
      createdAt: LessThan(
        moment
          .utc()
          .subtract(2, 'hours')
          .toDate(),
      ),
    });
  }
}
