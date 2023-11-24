import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';
import { isCPF } from 'validation-br';

@ValidatorConstraint({ name: 'IsCpf', async: false })
export class IsValueIsCpfValid implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _: ValidationArguments) {
    return isCPF(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'This cpf its invalid.';
  }
}

export function IsCpf() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueIsCpfValid,
    });
  };
}
