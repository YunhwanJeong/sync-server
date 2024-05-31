import axios from '#config/axios';
import { MenuServicePort } from '#services/menuServicePort.type';
import { Env } from '#start/env';

class TestPosMenuServiceAdapter implements MenuServicePort {
  async syncMenu(locationId?: string): Promise<Record<string, number>> {
    await axios.get(
      `${Env.TEST_POS_API_URL}locations/${locationId ?? Env.DEFAULT_LOCATION}/menu`,
    );

    // Sync MenuSections

    // Sync MenuItems

    // Sync ModifierGroups

    // Sync Modifiers

    // Sync Discounts

    // Sync OrderTypes

    // Return a summary of the synced data
    return {
      sections: 1,
      items: 1,
      modGroups: 1,
      mods: 1,
      discounts: 1,
      orderTypes: 1,
    };
  }
}

const testPosMenuService = new TestPosMenuServiceAdapter();

export default testPosMenuService;
