import axios from '#config/axios';
import { Discount } from '#models/discount';
import { MenuItem } from '#models/menuItem';
import { MenuRenderTree } from '#models/menuRenderTree';
import { MenuSection } from '#models/menuSection';
import { Modifier } from '#models/modifier';
import { ModifierGroup } from '#models/modifierGroup';
import { OrderType } from '#models/orderType';
import { Env } from '#start/env';
import {
  TestPosApiResponse,
  TestPosMenuServicePort,
} from './testPosMenuService.type.js';

class TestPosMenuServiceAdapter implements TestPosMenuServicePort {
  async syncMenu(locationId?: string) {
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
    const modifiersMap = new Map();
    data.mods.forEach(({ id, modGroupIds, ...mod }) => {
      modifiersMap.set(id, { ...mod, posId: id });
    });
    // Process ModifierGroups
    const modifierGroupsMap = new Map();
    data.modGroups.forEach(({ id, modIds, ...modGroup }) => {
      const populatedMods = modIds.map((modId) => modifiersMap.get(modId));
      modifierGroupsMap.set(id, {
        ...modGroup,
        modifiers: populatedMods,
        posId: id,
      });
    });
    // Process MenuItems
    const menuItemsMap = new Map();
    data.items.forEach(({ id, modGroupIds, ...item }) => {
      const populatedModGroups = modGroupIds.map((modGroupId) =>
        modifierGroupsMap.get(modGroupId),
      );
      menuItemsMap.set(id, {
        ...item,
        modGroups: populatedModGroups,
        posId: id,
      });
    });
    // Process and sync MenuRenderTree
    await MenuRenderTree.deleteMany({});
    const menuRenderTrees = await MenuRenderTree.insertMany(
      data.sections.map(({ id, ...section }) => ({
        posId: id,
        ...section,
        items: section.itemIds.map((itemId) => menuItemsMap.get(itemId)),
      })),
    );

    // return for testing
    return {
      sections,
      items,
      modGroups,
      mods,
      discounts,
      orderTypes,
      menuRenderTrees,
    };
  }
}

const testPosMenuService = new TestPosMenuServiceAdapter();

export default testPosMenuService;
