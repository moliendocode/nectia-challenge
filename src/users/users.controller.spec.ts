import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    usersService = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    authService = {
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: usersService },
        { provide: AuthService, useValue: authService },
        {
          provide: AuthGuard('jwt'),
          useClass: jest.fn(() => ({
            canActivate: jest.fn(() => true),
          })),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token', async () => {
      const mockUser = { username: 'testuser', userId: 1 };
      (authService.login as jest.Mock).mockResolvedValue({
        access_token: 'test_token',
      });

      const result = await controller.login({ user: mockUser });
      expect(result).toEqual({ access_token: 'test_token' });
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const mockUser: any = { username: 'testuser', password: 'testpass' };
      (usersService.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.create(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [{ username: 'testuser1' }, { username: 'testuser2' }];
      (usersService.findAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await controller.findAll();
      expect(result).toEqual(mockUsers);
    });
  });
});
