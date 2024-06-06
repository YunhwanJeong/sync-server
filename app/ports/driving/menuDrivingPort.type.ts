import type {
  MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType,
  MenuDatabaseDrivenPortSaveMenuReturnType,
} from '#ports/driven/menuDatabaseDrivenPort.type';

interface MenuDrivingPort {
  syncMenu(
    locationId?: string,
  ): Promise<
    MenuDatabaseDrivenPortSaveMenuReturnType &
      MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType
  >;
}

export type { MenuDrivingPort as default };
