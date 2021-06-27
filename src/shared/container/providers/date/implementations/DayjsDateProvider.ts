/* eslint-disable camelcase */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  now(): Date {
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
}

export { DayjsDateProvider };
