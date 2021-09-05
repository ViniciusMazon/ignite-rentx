import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepository';
import { DayjsDateProvider } from '@shared/container/providers/date/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/mail/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '2120060479',
      email: 'cukuavi@padom.bw',
      name: 'Isabelle Brady',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('cukuavi@padom.bw');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not existis', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('dot@mu.tv'),
    ).rejects.toEqual(new AppError('User does not exist'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );

    await usersRepositoryInMemory.create({
      driver_license: '256576625',
      email: 'var@deekaet.su',
      name: 'George Barnett',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('var@deekaet.su');

    expect(generateTokenMail).toBeCalled();
  });
});
