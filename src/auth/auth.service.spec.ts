import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findOne: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data without password if credentials are valid', async () => {
      const mockUser = {
        username: 'testuser',
        password: 'testpass',
        userId: 1,
      };
      (usersService.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.validateUser('testuser', 'testpass');
      expect(result).toEqual({ username: 'testuser', userId: 1 });
    });

    it('should return null if credentials are invalid', async () => {
      (usersService.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.validateUser('testuser', 'wrongpass');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const mockUser = { username: 'testuser', userId: 1 };
      (jwtService.sign as jest.Mock).mockReturnValue('test_token');

      const result = await service.login(mockUser);
      expect(result).toEqual({ access_token: 'test_token' });
    });
  });
});
