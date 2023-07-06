import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Vehicle } from './schemas/vehicle.schema';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let mockVehicleModel: any;

  beforeEach(async () => {
    mockVehicleModel = jest.fn().mockImplementation((vehicle) => ({
      ...vehicle,
      save: jest.fn().mockResolvedValue(vehicle),
    }));

    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        VehiclesService,
        { provide: 'VehicleModel', useValue: mockVehicleModel },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a vehicle', async () => {
      const mockVehicle: Partial<Vehicle> = { make: 'Jeep', model: 'Wrangler' };
      const result = await service.create(mockVehicle as Vehicle);
      expect(result).toEqual(mockVehicle);
    });
  });
});
