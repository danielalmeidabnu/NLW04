import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    //static create(arg0: string, create: any) {
    //    throw new Error('Method not implemented.');
    //}
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);

        //Select * from users where email = email
        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "Esse usuário já existe!",
            });
        }

        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };
