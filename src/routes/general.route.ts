import { GeneralController } from '@/controllers/general.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express';

export class GeneralRoute {
  public path = '/general';
  public router = Router();
  public general = new GeneralController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/statistics`,
      // AuthMiddleware,
      this.general.getStatistics,
    );
    this.router.get(
      `${this.path}/revenue-by-category`,
      // AuthMiddleware,
      this.general.getRevenueByCategory,
    );
    this.router.get(
      `${this.path}/order-in-timeline`,
      // AuthMiddleware,
      this.general.getOrderInTimeline,
    );
  }
}
