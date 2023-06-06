import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';
import { DB } from '@database';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { Role } from '@/interfaces/auth.interface';

@Service()
export class UserService {
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await DB.User.findAll({
      where: { role: Role.CUSTOMER },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: DB.Order,
          include: [
            {
              model: DB.OrderItem,
              attributes: [[DB.sequelize.fn('SUM', DB.sequelize.col('sum_price')), 'totalPrice']],
            },
          ],

          attributes: [[DB.sequelize.fn('COUNT', DB.sequelize.col('OrderModels.id')), 'orderCount']],
        },
      ],
      group: ['id', 'orders.id', 'order_items.id'],
    });
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = await DB.User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findUser: User = await DB.User.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await DB.User.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: UpdateUserDto): Promise<User> {
    const findUser: User = await DB.User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.User.update({ ...userData }, { where: { id: userId } });

    const updateUser: User = await DB.User.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    const findUser: User = await DB.User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.User.destroy({ where: { id: userId } });

    return findUser;
  }

  public async updatePassword(userId: number, dto: UpdatePasswordDto): Promise<User> {
    const findUser: User = await DB.User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    const { oldPassword, newPassword } = dto;

    const isPasswordMatching = await compare(oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Current password doesn't match");

    const hashedPassword = await hash(newPassword, 10);
    await DB.User.update({ password: hashedPassword }, { where: { id: userId } });

    return findUser;
  }

  public async updateUserStatus(userId: number, isActive: boolean): Promise<User> {
    const findUser: User = await DB.User.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await DB.User.update({ isActive }, { where: { id: userId } });
    const updateUser: User = await DB.User.findByPk(userId);
    return updateUser;
  }
}
