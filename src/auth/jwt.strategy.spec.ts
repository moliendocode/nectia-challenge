import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy, { provide: AuthService, useValue: authService }],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('validate', () => {
    it('should return user data extracted from the JWT payload', async () => {
      const payload = { sub: 1, username: 'testuser' };

      const result = await strategy.validate(payload);
      expect(result).toEqual({ userId: 1, username: 'testuser' });
    });
  });
});
