import type TestPosApiResponse from '#adapters/driven/testPosApiDrivenAdapter.type';

interface TestPosApiDrivenPort {
  getMenu(locationId?: string): Promise<{
    menuSections: TestPosApiResponse['sections'];
    menuItems: TestPosApiResponse['items'];
    modifierGroups: TestPosApiResponse['modGroups'];
    modifiers: TestPosApiResponse['mods'];
    discounts: TestPosApiResponse['discounts'];
    orderTypes: TestPosApiResponse['orderTypes'];
  }>;
}

export type { TestPosApiDrivenPort as default };
