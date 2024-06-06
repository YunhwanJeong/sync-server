import MenuDatabaseDrivenAdapter from '#adapters/driven/menuDatabaseDrivenAdapter';
import TestPosApiDrivenAdapter from '#adapters/driven/testPosApiDrivenAdapter';
import MenuDrivingAdapter from '#adapters/driving/menuDrivingAdapter';
import { NextFunction, Request, Response } from 'express';

const menuDrivingAdapter = new MenuDrivingAdapter(
  new TestPosApiDrivenAdapter(),
  new MenuDatabaseDrivenAdapter(),
);

export const syncMenuController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { locationId } = req.params;

    const testPosSyncResults = await menuDrivingAdapter.syncMenu(locationId);

    res.status(200).json({
      message: 'Menu synced successfully',
      results: {
        testPos: testPosSyncResults,
      },
    });
  } catch (error) {
    next(error);
  }
};
