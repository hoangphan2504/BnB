import { Service } from 'typedi';
import { DB } from '@database';
import { CreateProductDto } from '@/dtos/products.dto';
import { HttpException } from '@/exceptions/httpException';
import { Product } from '@interfaces/products.interface';

@Service()
export class ProductService {
  public async findAllProducts(): Promise<Product[]> {
    const allProducts: Product[] = await DB.Order.findAll();
    return allProducts;
  }

  public async findOrderById(productId: number): Promise<Product> {
    const findProduct: Product = await DB.Order.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    return findProduct;
  }

  public async createOrder(productData: CreateProductDto): Promise<Product> {
    const findProduct: Product = await DB.Order.findOne({ where: { name: productData.name } });
    if (findProduct) throw new HttpException(409, `This product ${productData.name} already exists`);

    const createProductData: Product = await DB.Order.create(productData);
    return createProductData;
  }

  public async updateProduct(productId: number, productData: CreateProductDto): Promise<Product> {
    const findProduct: Product = await DB.Order.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await DB.Order.update(productData, { where: { id: productId } });

    const updatedProduct: Product = await DB.Order.findByPk(productId);
    return updatedProduct;
  }

  public async deleteProduct(productId: number): Promise<Product> {
    const findProduct: Product = await DB.Order.findByPk(productId);
    if (!findProduct) throw new HttpException(409, "Product doesn't exist");

    await DB.Order.destroy({ where: { id: productId } });

    return findProduct;
  }
}
