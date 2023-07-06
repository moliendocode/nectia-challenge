import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CacheModule } from '@nestjs/cache-manager';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = jest.fn().mockImplementation((user) => ({
      ...user,
      save: jest.fn().mockResolvedValue(user),
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        UsersService,
        { provide: 'UserModel', useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const mockUser: Partial<User> = {
        username: 'testuser',
        password: 'testpass',
      };
      const result = await service.create(mockUser as User);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should find a user by username', async () => {
      const mockUser = { username: 'testuser', password: 'testpass' };
      mockUserModel.findOne = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(mockUser),
      }));
      const result = await service.findOne('testuser');
      expect(result).toEqual(mockUser);
    });
  });
});
