import type MenuDatabaseDrivenPort from '#ports/driven/menuDatabaseDrivenPort.type';
import type TestPosApiDrivenPort from '#ports/driven/testPosApiDrivenPort.type';
import type MenuDrivingPort from '#ports/driving/menuDrivingPort.type';

class MenuDrivingAdapter implements MenuDrivingPort {
  constructor(
    private readonly testPosApiDrivenAdapter: TestPosApiDrivenPort,
    private readonly menuDatabaseDrivenAdapter: MenuDatabaseDrivenPort,
  ) {}

  async syncMenu(locationId: Parameters<MenuDrivingPort['syncMenu']>[0]) {
    const posApiResponse =
      await this.testPosApiDrivenAdapter.getMenu(locationId);

    const {
      discounts,
      menuItems,
      menuSections,
      modifierGroups,
      modifiers,
      orderTypes,
    } = await this.menuDatabaseDrivenAdapter.saveMenu(posApiResponse);

    const { menuRenderTrees } =
      await this.menuDatabaseDrivenAdapter.saveMenuRenderTree({
        menuItmes: posApiResponse.menuItems,
        modifierGroups: posApiResponse.modifierGroups,
        modifiers: posApiResponse.modifiers,
        menuSections: posApiResponse.menuSections,
      });

    // return for testing
    return {
      menuSections,
      menuItems,
      modifierGroups,
      modifiers,
      discounts,
      orderTypes,
      menuRenderTrees,
    };
  }
}

export default MenuDrivingAdapter;
