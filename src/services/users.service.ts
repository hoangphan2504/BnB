import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await DB.Prodcuts.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await DB.Prodcuts.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Prodcuts.findOne({ where: { email: userData.name } });
    if (findUser) throw new HttpException(409, `This email ${userData.name} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.Prodcuts.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.Prodcuts.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await DB.Prodcuts.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await DB.Prodcuts.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await DB.Prodcuts.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.Prodcuts.destroy({ where: { id: userId } });

    return findUser;
  }
}
