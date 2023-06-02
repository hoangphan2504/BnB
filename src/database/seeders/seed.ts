import { logger } from '@/utils/logger';
import { DB } from '..';
import Container from 'typedi';
import { UserService } from '@/services/users.service';
import { User } from '@/interfaces/users.interface';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '@/dtos/users.dto';
import { Product, ProductStatus } from '@/interfaces/products.interface';
import { CreateProductDto } from '@/dtos/products.dto';
import { ProductService } from '@/services/products.service';

class Seeder {
  private userService = new UserService();
  private productService = new ProductService();

  private async seedUsers(n: number) {
    try {
      const creationPromises: Promise<User>[] = [];

      for (let i = 0; i < n; i++) {
        const newUser: CreateUserDto = {
          fullname: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
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

  private async SeedProducts(n: number) {
    try {
      const creationPromises: Promise<Product>[] = [];

      for (let i = 0; i < n; i++) {
        const newProducts: CreateProductDto = {
          name: faker.commerce.productName(),
          desc: faker.commerce.productDescription(),
          price: Number(faker.commerce.price()),
          status: ProductStatus.PENDING,
          brand_name: faker.company.name(),
          quantity: faker.number.int({ min: 30 }),
          sold: faker.number.int({ max: 25 }),
          images: [faker.image.urlLoremFlickr(), faker.image.urlPicsumPhotos()],
        };

        creationPromises.push(this.productService.createProduct(newProducts));
      }

      await Promise.all(creationPromises);
      logger.info('User seeding successfully!');
    } catch (error) {
      logger.error('User seeding error!');
      throw error;
    }
  }

  public async seedAll(opt: SeedAmount) {
    const { users } = opt;
    await this.seedUsers(users);
  }
}

interface SeedAmount {
  users: number;
  products: number;
  orders: number;
  itemsPerOrder: number;
  reviewsPerProduct: number;
}

(async () => {
  try {
    const seeder = new Seeder();
    await seeder.seedAll({
      users: 10,
    } as any);

    logger.info('Seeding successfully!');
  } catch (error) {
    logger.error('Seeding failed!');
    console.log(error);
  } finally {
    DB.sequelize.close();
    process.exit();
  }
})();
