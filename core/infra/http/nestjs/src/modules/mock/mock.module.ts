import { ApiTags } from '@nestjs/swagger';
import { MockController } from './mock.controller';
/*
https://docs.nestjs.com/modules
*/

import { BadGatewayException, Get, Module, Param, Post } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MockController],
  providers: [],
})
export class MockModule {}
