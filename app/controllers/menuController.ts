// app/controllers/menuController.ts
import testPosMenuService from '#services/testPosMenuService';
import { NextFunction, Request, Response } from 'express';

export const syncMenuController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { locationId } = req.params;

    const testPosSyncSummary = await testPosMenuService.syncMenu(locationId);

    res.status(200).json({
      message: 'Menu synced successfully',
      summaries: {
        testPos: testPosSyncSummary,
      },
    });
  } catch (error) {
    next(error);
  }
};
