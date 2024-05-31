interface MenuServicePort {
  syncMenu(locationId?: string): Promise<Record<string, number>>;
}

export type { MenuServicePort };
