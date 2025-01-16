import { InvalidInput } from '../../../shared/exceptions/invalidInput';
import { AuthUseCase } from '../../application/use-cases/auth';
import { UserRepository } from '../../domain/repositories/userRepositories';
import { JwtService } from '../../domain/services/jwt.service';

describe('AuthUseCase', () => {
  let auth: AuthUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockJwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    mockUserRepository = {
      get: jest.fn(),
      save: jest.fn(),
    };

    mockJwtService = {
      signIn: jest.fn(),
      validate: jest.fn(),
    };

    auth = new AuthUseCase(mockUserRepository, mockJwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('when invalid input then error', () => {
    expect(() => auth.execute('')).rejects.toBeInstanceOf(InvalidInput);
  });

  it('when valid then ok', async () => {
    await auth.execute('test');

    expect(mockUserRepository.get.mock.calls.length).toBe(1);
    expect(mockUserRepository.save.mock.calls.length).toBe(1);
  });
});
