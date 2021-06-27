import { container } from 'tsyringe';
import { IDateProvider } from './date/IDateProvider';
import { DayjsDateProvider } from './date/implementations/DayjsDateProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
