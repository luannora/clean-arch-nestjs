import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RedefinePasswordDTO } from '../dtos/redefine-password.dto';
//import { RedefinePasswordHandler } from '@rootDir/presentation/handlers/user/redefine-password.handler';

@Controller('redefine-password')
export class RedefinePasswordController {
  constructor() // private readonly RedefinePasswordHandler: RedefinePasswordHandler, // @Inject(RedefinePasswordHandler)
  {}

  @Post()
  async handle(@Body() data: RedefinePasswordDTO) {
    // return this.RedefinePasswordHandler.handle({
    //   email: data.email,
    //   newPasswordConfirm: data.newPasswordConfirm,
    //   newPassword: data.newPassword,
    // });
    //
  }
}
