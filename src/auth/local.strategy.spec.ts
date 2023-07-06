import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      validateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user data if validation is successful', async () => {
      const mockUser = { username: 'testuser', userId: 1 };
      (authService.validateUser as jest.Mock).mockResolvedValue(mockUser);

      const result = await strategy.validate('testuser', 'testpass');
      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if validation fails', async () => {
      (authService.validateUser as jest.Mock).mockResolvedValue(null);

      await expect(strategy.validate('testuser', 'wrongpass')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
