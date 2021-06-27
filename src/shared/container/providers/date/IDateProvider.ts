/* eslint-disable camelcase */
interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  now(): Date;
}

export { IDateProvider };
