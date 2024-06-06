import { Discount } from '#models/discount';
import { MenuItem } from '#models/menuItem';
import { MenuRenderTree } from '#models/menuRenderTree';
import { MenuSection } from '#models/menuSection';
import { Modifier } from '#models/modifier';
import { ModifierGroup } from '#models/modifierGroup';
import { OrderType } from '#models/orderType';
import type MenuDatabaseDrivenPort from '#ports/driven/menuDatabaseDrivenPort.type';

class MenuDatabaseDrivenAdapter implements MenuDatabaseDrivenPort {
  async saveMenu(response: Parameters<MenuDatabaseDrivenPort['saveMenu']>[0]) {
    // Store MenuSections
    await MenuSection.deleteMany({});
    const menuSections = await MenuSection.insertMany(
      response.menuSections.map(({ id, ...section }) => ({
        posId: id,
        ...section,
      })),
    );
    // Store MenuItems
    await MenuItem.deleteMany({});
    const menuItems = await MenuItem.insertMany(
      response.menuItems.map(({ id, ...item }) => ({
        posId: id,
        ...item,
      })),
    );
    // Store ModifierGroups
    await ModifierGroup.deleteMany({});
    const modifierGroups = await ModifierGroup.insertMany(
      response.modifierGroups.map(({ id, ...modGroup }) => ({
        posId: id,
        ...modGroup,
      })),
    );
    // Store Modifiers
    await Modifier.deleteMany({});
    const modifiers = await Modifier.insertMany(
      response.modifiers.map(({ id, ...mod }) => ({
        posId: id,
        ...mod,
      })),
    );
    // Store Discounts
    await Discount.deleteMany({});
    const discounts = await Discount.insertMany(
      response.discounts.map(({ id, ...discount }) => ({
        posId: id,
        ...discount,
      })),
    );
    // Store OrderTypes
    await OrderType.deleteMany({});
    const orderTypes = await OrderType.insertMany(
      response.orderTypes.map(({ id, ...orderType }) => ({
        posId: id,
        ...orderType,
      })),
    );

    return {
      menuItems,
      menuSections,
      modifierGroups,
      modifiers,
      discounts,
      orderTypes,
    };
  }

  async saveMenuRenderTree(
    response: Parameters<MenuDatabaseDrivenPort['saveMenuRenderTree']>[0],
  ) {
    // Process Modifiers
    const modifiersMap = new Map();
    response.modifiers.forEach(({ id, modGroupIds, ...mod }) => {
      modifiersMap.set(id, { ...mod, posId: id });
    });
    // Process ModifierGroups
    const modifierGroupsMap = new Map();
    response.modifierGroups.forEach(({ id, modIds, ...modGroup }) => {
      const populatedMods = modIds.map((modId) => modifiersMap.get(modId));
      modifierGroupsMap.set(id, {
        ...modGroup,
        modifiers: populatedMods,
        posId: id,
      });
    });
    // Process MenuItems
    const menuItemsMap = new Map();
    response.menuItmes.forEach(({ id, modGroupIds, ...item }) => {
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
      response.menuSections.map(({ id, ...section }) => ({
        posId: id,
        ...section,
        items: section.itemIds.map((itemId) => menuItemsMap.get(itemId)),
      })),
    );

    return {
      menuRenderTrees,
    };
  }
}

export default MenuDatabaseDrivenAdapter;
