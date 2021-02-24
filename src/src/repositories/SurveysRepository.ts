import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/surveys";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {
    static find() {
        throw new Error('Method not implemented.');
    }
    static create(arg0: { title: any; description: any; }) {
        throw new Error('Method not implemented.');
    }
}

export { SurveysRepository }