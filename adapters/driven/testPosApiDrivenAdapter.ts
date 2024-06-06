import axios from '#config/axios';
import type TestPosApiDrivenPort from '#ports/driven/testPosApiDrivenPort.type';
import { Env } from '#start/env';
import type TestPosApiResponse from './testPosApiDrivenAdapter.type.js';

class TestPosApiDrivenAdapter implements TestPosApiDrivenPort {
  async getMenu(locationId: Parameters<TestPosApiDrivenPort['getMenu']>[0]) {
    const { data } = await axios.get<TestPosApiResponse>(
      `${Env.TEST_POS_API_URL}locations/${locationId ?? Env.DEFAULT_LOCATION}/menu`,
    );

    return {
      menuSections: data.sections,
      menuItems: data.items,
      modifierGroups: data.modGroups,
      modifiers: data.mods,
      discounts: data.discounts,
      orderTypes: data.orderTypes,
    };
  }
}

export default TestPosApiDrivenAdapter;
