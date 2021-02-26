import { resolve } from 'path';
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { appError } from "../errors/AppErro";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

        const user = await usersRepository.findOne({ email });
        //Testando se o usuário existe
        if (!user) {
            throw new appError("Usuário não existe!");
        }
        //Testando se a pesquisa existe
        const survey = await surveyRepository.findOne({ id: survey_id });

        if (!survey) {
            throw new appError("Pesquisa não existe!");
        }
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveyUsersRepository.findOne({
            where: { user_id: user.id, value: null },
            relations: ["user", "survey"],
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        }

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);

        }
        //Salvar informações na tabela surveyUser
        const surveyUser = surveyUsersRepository.create({
            user_id: user.id,
            survey_id,
        });
        await surveyUsersRepository.save(surveyUser);
        //Enviar o email ao usuário
        variables.id = surveyUser.id;
        await SendMailService.execute(email, survey.title, variables, npsPath);
        return response.json(surveyUser);
    }
}
export { SendMailController };