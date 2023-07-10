import { IRegisterUserDTO } from '@domain/user/dtos/register-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RegisterAddressDTO } from '../../address/dtos/register-address.dto';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
}

export class RegisterUserDTO implements IRegisterUserDTO {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  fantasyName?: string;

  @ApiProperty()
  bornDate?: Date;

  @ApiPropertyOptional()
  celphone?: string;

  @ApiPropertyOptional()
  telephone?: string;

  @ApiProperty({ default: 1, description: '1 - Pré-pago | 2 - Pós-pago' })
  planType: number;

  @ApiProperty({ default: 1, description: '1 - Automatico | 2 - Manual' })
  loadType: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @Length(8, 15, { message: 'Senha deve ter entre 8 a 15 caracteres.' })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @Match('password', { message: 'Senha e confirmação não combinam.' })
  passwordConfirmation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Length(11, 14, {
    message:
      'Documento deve ter 11 a 14 caracteres e deve ser somente números.',
  })
  document: string;

  @ApiProperty({
    default: 'PF',
    description: 'PF - Pessoa física | PJ - Pessoa Jurídica',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tipo de documento obrigatório' })
  documentType: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty()
  address: RegisterAddressDTO;
}
