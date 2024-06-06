import MenuDrivingAdapter from '#adapters/driving/menuDrivingAdapter';
import app from '#bin/app';
import MenuDrivingPort, {
  MenuDrivingPortSyncMenuReturnType,
} from '#ports/driving/menuDrivingPort.type';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import request from 'supertest';

jest.mock('#adapters/driving/menuDrivingAdapter');

describe('GET /api/sync-menu/:locationId', () => {
  let mockSyncMenu: jest.SpiedFunction<MenuDrivingPort['syncMenu']>;

  beforeEach(() => {
    mockSyncMenu = jest.spyOn(MenuDrivingAdapter.prototype, 'syncMenu');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sync menu data and return the result', async () => {
    const locationId = 'location1';
    const expectedSyncMenuReturn: MenuDrivingPortSyncMenuReturnType = {
      menuSections: [],
      menuItems: [],
      modifierGroups: [],
      modifiers: [],
      discounts: [],
      orderTypes: [],
      menuRenderTrees: [],
    };

    mockSyncMenu.mockResolvedValue(expectedSyncMenuReturn);

    const response = await request(app)
      .get(`/trigger-sync/${locationId}`)
      .expect(200);

    expect(response.body).toEqual({
      message: 'Menu synced successfully',
      results: {
        testPos: expectedSyncMenuReturn,
      },
    });
  });
});
