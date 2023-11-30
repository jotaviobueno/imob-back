import { addMonths } from 'date-fns';

export function generateDatePerMonth(length: number) {
  return Array.from({ length }, (_, i) => addMonths(new Date(), i));
}
