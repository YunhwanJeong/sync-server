// tests/unit/adapters/driving/MenuDrivingAdapter.test.ts
import MenuDrivingAdapter from '#adapters/driving/menuDrivingAdapter';
import MenuDatabaseDrivenPort from '#ports/driven/menuDatabaseDrivenPort.type';
import TestPosApiDrivenPort, {
  TestPosApiDrivenPortGetMenuReturnType,
} from '#ports/driven/testPosApiDrivenPort.type';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

let mockPosApiDrivenAdapter: TestPosApiDrivenPort;
let mockMenuDatabaseDrivenAdapter: MenuDatabaseDrivenPort;
let menuDrivingAdapter: MenuDrivingAdapter;

beforeEach(() => {
  mockPosApiDrivenAdapter = {
    getMenu: jest.fn<TestPosApiDrivenPort['getMenu']>(),
  };

  mockMenuDatabaseDrivenAdapter = {
    saveMenu: jest.fn<MenuDatabaseDrivenPort['saveMenu']>(),
    saveMenuRenderTree: jest.fn<MenuDatabaseDrivenPort['saveMenuRenderTree']>(),
  };

  menuDrivingAdapter = new MenuDrivingAdapter(
    mockPosApiDrivenAdapter,
    mockMenuDatabaseDrivenAdapter,
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('MenuDrivingAdapter', () => {
  it('should sync menu from POS API and save to database', async () => {
    const locationId = 'location1';

    const expectedGetMenuReturn: TestPosApiDrivenPortGetMenuReturnType = {
      menuSections: [],
      menuItems: [],
      modifierGroups: [],
      modifiers: [],
      discounts: [],
      orderTypes: [],
    };
    jest
      .spyOn(mockPosApiDrivenAdapter, 'getMenu')
      .mockResolvedValue(expectedGetMenuReturn);

    const expectedSaveMenuReturn = {
      menuItems: [],
      menuSections: [],
      modifierGroups: [],
      modifiers: [],
      discounts: [],
      orderTypes: [],
    };
    jest
      .spyOn(mockMenuDatabaseDrivenAdapter, 'saveMenu')
      .mockResolvedValue(expectedSaveMenuReturn);

    const expectedSaveMenuRenterTreeParams = {
      menuItmes: expectedGetMenuReturn.menuItems,
      modifierGroups: expectedGetMenuReturn.modifierGroups,
      modifiers: expectedGetMenuReturn.modifiers,
      menuSections: expectedGetMenuReturn.menuSections,
    };

    const expectedSaveMenuRenterTreeReturn = {
      menuRenderTrees: [],
    };
    jest
      .spyOn(mockMenuDatabaseDrivenAdapter, 'saveMenuRenderTree')
      .mockResolvedValue(expectedSaveMenuRenterTreeReturn);

    await menuDrivingAdapter.syncMenu(locationId);

    expect(mockPosApiDrivenAdapter.getMenu).toHaveBeenCalledWith(locationId);
    expect(mockMenuDatabaseDrivenAdapter.saveMenu).toHaveBeenCalledWith(
      expectedGetMenuReturn,
    );
    expect(
      mockMenuDatabaseDrivenAdapter.saveMenuRenderTree,
    ).toHaveBeenCalledWith(expectedSaveMenuRenterTreeParams);
  });
});
