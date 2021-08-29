import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
  public now(): Date {
    return dayjs().toDate();
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  public compareInHours(start_date: Date, end_date: Date): number {
    const startDateUTC = this.convertToUTC(start_date);
    const endDateUTC = this.convertToUTC(end_date);
    return dayjs(startDateUTC).diff(endDateUTC, 'hours');
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const startDateUTC = this.convertToUTC(start_date);
    const endDateUTC = this.convertToUTC(end_date);
    return dayjs(startDateUTC).diff(endDateUTC, 'days');
  }

  public addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  public addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }
}

export { DayjsDateProvider };
