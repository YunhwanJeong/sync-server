import axios from '#config/axios';
import { Discount } from '#models/discount';
import { MenuItem } from '#models/menuItem';
import { MenuRenderTree } from '#models/menuRenderTree';
import { MenuSection } from '#models/menuSection';
import { Modifier } from '#models/modifier';
import { ModifierGroup } from '#models/modifierGroup';
import { OrderType } from '#models/orderType';
import { MenuServicePort } from '#services/menuServicePort.type';
import { Env } from '#start/env';
import { TestPosApiResponse } from './testPosMenuService.type.js';

class TestPosMenuServiceAdapter implements MenuServicePort {
  async syncMenu(locationId?: string): Promise<Record<string, number>> {
    const { data } = await axios.get<TestPosApiResponse>(
      `${Env.TEST_POS_API_URL}locations/${locationId ?? Env.DEFAULT_LOCATION}/menu`,
    );

    // Store MenuSections
    await MenuSection.deleteMany({});
    const sections = await MenuSection.insertMany(
      data.sections.map(({ id, ...section }) => ({
        posId: id,
        ...section,
      })),
    );
    // Store MenuItems
    await MenuItem.deleteMany({});
    const items = await MenuItem.insertMany(
      data.items.map(({ id, ...item }) => ({
        posId: id,
        ...item,
      })),
    );
    // Store ModifierGroups
    await ModifierGroup.deleteMany({});
    const modGroups = await ModifierGroup.insertMany(
      data.modGroups.map(({ id, ...modGroup }) => ({
        posId: id,
        ...modGroup,
      })),
    );
    // Store Modifiers
    await Modifier.deleteMany({});
    const mods = await Modifier.insertMany(
      data.mods.map(({ id, ...mod }) => ({
        posId: id,
        ...mod,
      })),
    );
    // Store Discounts
    await Discount.deleteMany({});
    const discounts = await Discount.insertMany(
      data.discounts.map(({ id, ...discount }) => ({
        posId: id,
        ...discount,
      })),
    );
    // Store OrderTypes
    await OrderType.deleteMany({});
    const orderTypes = await OrderType.insertMany(
      data.orderTypes.map(({ id, ...orderType }) => ({
        posId: id,
        ...orderType,
      })),
    );

    // Process Modifiers
    const renderTreeModifiers = data.mods.map(
      ({ id, modGroupIds, ...mod }) => ({
        posId: id,
        ...mod,
      }),
    );
    // Process ModifierGroups
    const renderTreeModifierGroups = data.modGroups.map(
      ({ id, modIds, ...modGroup }) => ({
        posId: id,
        ...modGroup,
        modifiers: modIds.map((modId) =>
          renderTreeModifiers.find((mod) => mod.posId === modId),
        ),
      }),
    );
    // Process MenuItems
    const renderTreeMenuItems = data.items.map(
      ({ id, modGroupIds, ...item }) => ({
        posId: id,
        ...item,
        modGroups: modGroupIds.map((modGroupId) =>
          renderTreeModifierGroups.find(
            (modGroup) => modGroup.posId === modGroupId,
          ),
        ),
      }),
    );
    // Process and sync MenuRenderTree
    await MenuRenderTree.deleteMany({});
    await MenuRenderTree.insertMany(
      data.sections.map(({ id, ...section }) => ({
        posId: id,
        ...section,
        items: section.itemIds.map((itemId) =>
          renderTreeMenuItems.find((item) => item.posId === itemId),
        ),
      })),
    );

    // Return a summary of the synced data
    return {
      sections: sections.length,
      items: items.length,
      modGroups: modGroups.length,
      mods: mods.length,
      discounts: discounts.length,
      orderTypes: orderTypes.length,
    };
  }
}

const testPosMenuService = new TestPosMenuServiceAdapter();

export default testPosMenuService;
