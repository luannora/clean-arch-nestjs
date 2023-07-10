/*
https://docs.nestjs.com/modules
*/

import { FindAllCreditCardsRepository } from '@infra/db/typeorm/modules/cards/find-all-credit-card.repository';
import { Module } from '@nestjs/common';
import { RepositoryProxyModule } from '../../proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { ICreditCard } from '@domain/cards/entities/credit_card.entity';
import { GetCreditCardByIdRepository } from '@infra/db/typeorm/modules/cards/get-credit-card-by-id.repository';
import { InsertCreditCardRepository } from '@infra/db/typeorm/modules/cards/inser-credit-card.repository';
import { SoftDeleteCreditCardRepository } from '@infra/db/typeorm/modules/cards/soft-delete-credit-card.respository';
import { UpdateCreditCardRepository } from '@infra/db/typeorm/modules/cards/update-credit-card.repository';
import { DatabaseModule } from '@infra/db/typeorm/datasource/database.module';

@Module({
    imports: [DatabaseModule, RepositoryProxyModule.register()],
    controllers: [],
    providers: [
        /**
     * Repositories
     */
        {
            provide: FindAllCreditCardsRepository,
            useFactory: (creditCardRepo: Repository<ICreditCard>) =>
                new FindAllCreditCardsRepository(creditCardRepo),
            inject: [RepositoryProxyModule.CREDIT_CARDS_REPOSITORY],
        },
        {
            provide: GetCreditCardByIdRepository,
            useFactory: (creditCardRepo: Repository<ICreditCard>) =>
                new GetCreditCardByIdRepository(creditCardRepo),
            inject: [RepositoryProxyModule.CREDIT_CARDS_REPOSITORY],
        },
        {
            provide: InsertCreditCardRepository,
            useFactory: (creditCardRepo: Repository<ICreditCard>) =>
                new InsertCreditCardRepository(creditCardRepo),
            inject: [RepositoryProxyModule.CREDIT_CARDS_REPOSITORY],
        },
        {
            provide: SoftDeleteCreditCardRepository,
            useFactory: (creditCardRepo: Repository<ICreditCard>) =>
                new SoftDeleteCreditCardRepository(creditCardRepo),
            inject: [RepositoryProxyModule.CREDIT_CARDS_REPOSITORY],
        },
        {
            provide: UpdateCreditCardRepository,
            useFactory: (creditCardRepo: Repository<ICreditCard>) =>
                new UpdateCreditCardRepository(creditCardRepo),
            inject: [RepositoryProxyModule.CREDIT_CARDS_REPOSITORY],
        },
        /**
            * Handlers
            */


        /**
     * Adapters
     */

    ],
})
export class CardsModule { }
