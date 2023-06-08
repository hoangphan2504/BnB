import { Service } from 'typedi';
import { DB } from '@database';
import { CreateProductDto, UpdateProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/httpException';
import { Product } from '@interfaces/products.interface';

@Service()
export class ProductService {
  public async findAllProducts(): Promise<Product[]> {
    const allProducts: Product[] = await DB.Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt', 'importPrice'],
        include: [
          [
            DB.Sequelize.literal(`
              (SELECT AVG(r.rating) 
              FROM reviews r
              WHERE r.product_id = ProductModel.id)
            `),
            'avgRating',
          ],
        ],
      },
    });
    return allProducts;
  }

  public async findProductById(productId: number): Promise<Product> {
    const findProduct: Product = await DB.Product.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    const findProduct = await DB.Product.findOne({ where: { name: productData.name } });
    if (findProduct) throw new HttpException(409, `This product ${productData.name} already exists`);

    const createProductData: Product = await DB.Product.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: number, productData: UpdateProductDto): Promise<Product> {
    const findProduct: Product = await DB.Product.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await DB.Product.update(productData, { where: { id: productId } });

    const updatedProduct: Product = await DB.Product.findByPk(productId);
    return updatedProduct;
  }

  public async deleteProduct(productId: number): Promise<Product> {
    const findProduct: Product = await DB.Product.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await DB.Product.destroy({ where: { id: productId } });

    return findProduct;
  }

  public async searchProductByName(query: string) {
    const findProduct: Product[] = await DB.Product.findAll({
      where: {
        name: {
          [DB.Sequelize.Op.like]: `%${query}%`,
        },
      },
    });

    return findProduct;
  }
}
