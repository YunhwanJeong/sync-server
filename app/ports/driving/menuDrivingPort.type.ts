import type {
  MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType,
  MenuDatabaseDrivenPortSaveMenuReturnType,
} from '#ports/driven/menuDatabaseDrivenPort.type';

type MenuDrivingPortSyncMenuReturnType =
  MenuDatabaseDrivenPortSaveMenuReturnType &
    MenuDatabaseDrivenPortSaveMenuRenderTreeReturnType;

interface MenuDrivingPort {
  syncMenu(locationId?: string): Promise<MenuDrivingPortSyncMenuReturnType>;
}

export type { MenuDrivingPortSyncMenuReturnType, MenuDrivingPort as default };
