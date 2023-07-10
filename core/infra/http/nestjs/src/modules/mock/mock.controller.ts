/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlanSimulateDTO } from './plan-simulate.dto';

@Controller()
export class MockController {
  @Get('plans/:personType')
  @ApiTags('mock')
  plansMock(@Param('personType') personType: number) {
    return {
      plans: [
        {
          planId: 'caea9adc-174e-11ee-be56-0242ac120002',
          name: 'PRÉ-PAGO MANUAL',
          description:
            'Ótimo para você que busca maior controle sobre suas despesas, mas ainda tem um tempinho sobrando para fazer suas recargas manuais.',
          payments: ['Cartão de crédito', 'Boleto Bancário'],
          vpo: false,
        },
        {
          planId: '665fb3a8-174f-11ee-be56-0242ac120002',
          name: 'PRÉ-PAGO AUTOMÁTICA',
          description:
            'Pensado para você que prefere a praticidade e não quer ficar se preocupando com recargas ou saldos insuficientes.',
          payments: ['Cartão de crédito'],
          vpo: true,
        },
      ],
      loads: [
        { value: 50, fee: 7.9 },
        { value: 100, fee: 9.9 },
        { value: 150, fee: 11.9 },
        { value: 200, fee: 13.9 },
      ],
    };
  }

  @ApiTags('mock')
  @Post(':tagId/validate')
  async mockValidateTag(@Param('tagId') tagId: string) {
    if (+tagId > 0) {
      return { success: true };
    } else {
      return new BadRequestException('Tag não localizada');
    }
  }

  @ApiTags('mock')
  @Post('plan/:planId/simulate')
  async mockPlanSimulate(
    @Param('planId') planId: string,
    @Body() dto: PlanSimulateDTO,
  ) {
    return {
      totalValue: dto.loadValue + 7.9,
      fee: 7.9,
    };
  }

  @ApiTags('mock')
  @Post('terms')
  async mockTerms() {
    return {
      terms: `TERMOS DE ADESÃO: \n\n
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\n
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\n
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\n
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum\nLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum`,
    };
  }
}
