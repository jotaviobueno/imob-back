import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidDate', async: false })
export class IsValueIsValidDate implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, _: ValidationArguments) {
    const date = new Date(value);

    if (date <= new Date()) return false;

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'This date is invalid.';
  }
}

export function IsValidDate() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueIsValidDate,
    });
  };
}
