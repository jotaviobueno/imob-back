import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { isCnpj } from 'validation-br';

@ValidatorConstraint({ name: 'IsCnpj', async: false })
export class IsValueIsCnpjValid implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _: ValidationArguments) {
    return isCnpj(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'This cnpj its invalid.';
  }
}

export function IsCnpj() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCnpj',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueIsCnpjValid,
    });
  };
}
