import { Request, Response } from 'express';

class UserController {
    //static create(arg0: string, create: any) {
    //    throw new Error('Method not implemented.');
    //}
    async create(request: Request, response: Response) {
        const body = request.body;
        console.log(body);
        return response.send();
    }
}

export { UserController }