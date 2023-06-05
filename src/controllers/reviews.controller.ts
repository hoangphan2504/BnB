import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateReviewDto } from '@/dtos/review.dto';
import { Reviews } from '@interfaces/reviews.interface';
import { ReviewService } from '@/services/reviews.service';

export class ReviewController {
  public review = Container.get(ReviewService);

  public getReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllReviewsData: Reviews[] = await this.review.findAllReviews();

      res.status(200).json({ data: findAllReviewsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = Number(req.params.id);
      const findOneReviewData: Reviews = await this.review.findallReviewsById(reviewId);

      res.status(200).json({ data: findOneReviewData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewData: CreateReviewDto = req.body;
      const createReviewData: Reviews = await this.review.createReview(reviewData);

      res.status(201).json({ data: createReviewData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = Number(req.params.id);
      const reviewData: CreateReviewDto = req.body;
      const updateReviewData: Reviews = await this.review.updateReview(reviewId, reviewData);

      res.status(200).json({ data: updateReviewData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviewId = Number(req.params.id);
      const deleteReviewData: Reviews = await this.review.deleteReview(reviewId);

      res.status(200).json({ data: deleteReviewData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
