import type TestPosApiResponse from '#adapters/driven/testPosApiDrivenAdapter.type';
import { IDiscount } from '#models/discount';
import { IMenuItem } from '#models/menuItem';
import { IMenuRenderTree } from '#models/menuRenderTree';
import { IMenuSection } from '#models/menuSection';
import { IModifier } from '#models/modifier';
import { IModifierGroup } from '#models/modifierGroup';
import { IOrderType } from '#models/orderType';
import type { Document, MergeType } from 'mongoose';

type InsertManyResultType<T> = MergeType<
  Document<unknown, {}, T> &
    T &
    Required<{
      _id: unknown;
    }>,
  Omit<T, '_id'>
>[];

type MenuDatabaseDrivenPortSaveMenuReturnType = {
  menuSections: InsertManyResultType<IMenuSection>;
  menuItems: InsertManyResultType<IMenuItem>;
  modifierGroups: InsertManyResultType<IModifierGroup>;
  modifiers: InsertManyResultType<IModifier>;
  discounts: InsertManyResultType<IDiscount>;
  orderTypes: InsertManyResultType<IOrderType>;
};

type MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType = {
  menuRenderTrees: InsertManyResultType<IMenuRenderTree>;
};

interface MenuDatabaseDrivenPort {
  saveMenu(response: {
    menuSections: TestPosApiResponse['sections'];
    menuItems: TestPosApiResponse['items'];
    modifierGroups: TestPosApiResponse['modGroups'];
    modifiers: TestPosApiResponse['mods'];
    discounts: TestPosApiResponse['discounts'];
    orderTypes: TestPosApiResponse['orderTypes'];
  }): Promise<MenuDatabaseDrivenPortSaveMenuReturnType>;
  saveMenuRenderTree(response: {
    modifierGroups: TestPosApiResponse['modGroups'];
    modifiers: TestPosApiResponse['mods'];
    menuItmes: TestPosApiResponse['items'];
    menuSections: TestPosApiResponse['sections'];
  }): Promise<MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType>;
}

export type {
  MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType,
  MenuDatabaseDrivenPortSaveMenuReturnType,
  MenuDatabaseDrivenPort as default,
};
