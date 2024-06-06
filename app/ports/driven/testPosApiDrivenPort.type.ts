import type TestPosApiResponse from '#adapters/driven/testPosApiDrivenAdapter.type';

type TestPosApiDrivenPortGetMenuReturnType = {
  menuSections: TestPosApiResponse['sections'];
  menuItems: TestPosApiResponse['items'];
  modifierGroups: TestPosApiResponse['modGroups'];
  modifiers: TestPosApiResponse['mods'];
  discounts: TestPosApiResponse['discounts'];
  orderTypes: TestPosApiResponse['orderTypes'];
};

interface TestPosApiDrivenPort {
  getMenu(locationId?: string): Promise<TestPosApiDrivenPortGetMenuReturnType>;
}

export type {
  TestPosApiDrivenPortGetMenuReturnType,
  TestPosApiDrivenPort as default,
};
