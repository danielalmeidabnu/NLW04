import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { appError } from "../errors/AppErro";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    //http://localhost:3333/answers/1?u=81d184d4-4d16-42d3-b566-9de7160f25ee
    /**
     * Route Params = Parametros que compõe a rota
     * routes.get("/answers/:value")
     * 
     * Query Params = Basca, Paginação, não obrigatórios
     * vêm depois do '?'
     * chave=valor 
     */
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUsersRepository = getCustomRepository(SurveyUsersRepository);

        const surveyUser = await surveyUsersRepository.findOne({
            //IntrtoStr(u)
            id: String(u)
        });

        if (!surveyUser) {
            throw new appError("Surver User não existe!");
        }
        //StrtoInt(value);
        surveyUser.value = Number(value);

        await surveyUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };