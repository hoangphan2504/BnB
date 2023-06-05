import { logger } from '@/utils/logger';
import { DB } from '..';
import { UserService } from '@/services/users.service';
import { User } from '@/interfaces/users.interface';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '@/dtos/users.dto';
import { Product, ProductStatus } from '@/interfaces/products.interface';
import { CreateProductDto } from '@/dtos/products.dto';
import { ProductService } from '@/services/products.service';
import { OrderService } from '@/services/order.service';
import { CreateOrderDto, ProductItem } from '@/dtos/order.dto';
import { ReviewService } from '@/services/reviews.service';
import { CreateReviewDto } from '@/dtos/review.dto';
import { CategoryService } from '@/services/categories.service';

interface SeedAmount {
  users: number;
  products: number;
  ordersPerUser: number;
  itemsPerOrder: number;
  reviewsPerProduct: number;
}

class Seeder {
  private seedingAmount: SeedAmount;
  private userService = new UserService();
  private productService = new ProductService();
  private orderService = new OrderService();
  private reviewService = new ReviewService();
  private categoryService = new CategoryService();

  constructor(amount: SeedAmount) {
    this.seedingAmount = amount;
  }

  private async SeedOrders() {
    try {
      const { products, ordersPerUser, itemsPerOrder } = this.seedingAmount;
      const usersList = await this.userService.findAllUser();
      await Promise.all(
        usersList.map(async user => {
          for (let i = 0; i < ordersPerUser; i++) {
            const productItems: ProductItem[] = Array(itemsPerOrder)
              .fill(null)
              .map(() => {
                const productId = faker.number.int({ min: 1, max: products - 1 });
                const quantity = faker.number.int({ min: 1, max: 10 });

                return { productId, quantity };
              });
            const dto: CreateOrderDto = {
              products: productItems,
            };

            await this.orderService.createOrder(dto, user.id);
          }
        }),
      );

      logger.info('Order seeding successfully!');
    } catch (error) {
      logger.error('Order seeding error!');
      throw error;
    }
  }

  private async SeedUsers() {
    try {
      const { users } = this.seedingAmount;
      const creationPromises: Promise<User>[] = [];

      for (let i = 0; i < users; i++) {
        const newUser: CreateUserDto = {
          fullname: faker.person.fullName(),
          email: faker.internet.email(),
          password: '123456',
          phone: faker.phone.number('+84 ## ### ## ##'),
          dob: faker.date.past(),
        };

        creationPromises.push(this.userService.createUser(newUser));
      }

      await Promise.all(creationPromises);
      logger.info('User seeding successfully!');
    } catch (error) {
      logger.error('User seeding error!');
      throw error;
    }
  }

  private async SeedProducts() {
    try {
      const { products } = this.seedingAmount;
      const creationPromises: Promise<Product>[] = [];

      for (let i = 0; i < products; i++) {
        const newProducts: CreateProductDto = {
          name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          price: Number(faker.commerce.price()),
          status: ProductStatus.PENDING,
          brandName: faker.company.name(),
          quantity: faker.number.int({ min: 30, max: 100 }),
          sold: faker.number.int({ max: 25 }),
          images: [faker.image.urlLoremFlickr(), faker.image.urlPicsumPhotos()],
          categoryId: faker.number.int({ min: 1, max: 2 }),
        };

        creationPromises.push(this.productService.createProduct(newProducts));
      }

      await Promise.all(creationPromises);
      logger.info('Product seeding successfully!');
    } catch (error) {
      logger.error('Product seeding error!');
      throw error;
    }
  }

  private async SeedReviews() {
    try {
      const { users, reviewsPerProduct } = this.seedingAmount;
      const productsList = await this.productService.findAllProducts();

      await Promise.all(
        productsList.map(async product => {
          for (let i = 0; i < reviewsPerProduct; i++) {
            const reviewDto: CreateReviewDto = {
              content: faker.lorem.paragraph(1),
              rating: faker.number.float({ min: 1, max: 5 }),
              userId: faker.number.int({ min: 1, max: users - 1 }),
              productId: product.id,
            };

            await this.reviewService.createReview(reviewDto);
          }
        }),
      );

      logger.info('Reviews seeding successfully!');
    } catch (error) {
      logger.error('Reviews seeding error!');
      throw error;
    }
  }

  private async SeedCategories() {
    await this.categoryService.CreateCategory({
      name: 'Perfume',
      desc: 'Perfume category',
    });

    await this.categoryService.CreateCategory({
      name: 'Cosmetis',
      desc: 'Cosmetis category',
    });
  }

  public async seedAll() {
    await this.SeedUsers();
    await this.SeedCategories();
    await this.SeedProducts();
    await this.SeedOrders();
    await this.SeedReviews();
  }
}

(async () => {
  try {
    await DB.sequelize.sync({ force: true, alter: true });
    const seeder = new Seeder({
      users: 10,
      products: 30,
      ordersPerUser: 5,
      itemsPerOrder: 5,
      reviewsPerProduct: 5,
    });
    await seeder.seedAll();

    logger.info('Seeding successfully!');
  } catch (error) {
    logger.error('Seeding failed!');
    console.log(error);
  } finally {
    DB.sequelize.close();
    process.exit();
  }
})();
