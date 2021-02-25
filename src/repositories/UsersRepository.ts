import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/users";

@EntityRepository(User)
class UsersRepository extends Repository<User> { }

export { UsersRepository }