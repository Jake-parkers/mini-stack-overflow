import AppError, { handler } from "../../libraries/error";
import { HttpStatusCode } from "../../libraries/httpStatusCodes";
import { CommonErrors } from "../../libraries/commonErrors";
import { Answer } from "./answersSchema";
import answersDAL from "./answersDAL";
import QuestionsDAL from "../questions/questionsDAL";
import Socket from "../../libraries/socket";

class AnswersService {
    private readonly _questionsDAL: typeof QuestionsDAL;

    constructor(questionsDAL: typeof QuestionsDAL) {
        this._questionsDAL = questionsDAL;
    }

    async saveAnswer(answer: Answer) {
        try {
            return await answersDAL.save(answer);
        } catch (error) {
            handler.handleError(error);
            return new AppError("", HttpStatusCode.INTERNAL_SERVER_ERROR, CommonErrors.DATABASE_ERROR, false);
        }
    }

    async notify(questionId: string) {
        const subscribers = await this._questionsDAL.getSubscribers(questionId);
        Socket.emit("question-answered", {questionId, subscribers});
    }
}

export default new AnswersService(QuestionsDAL);