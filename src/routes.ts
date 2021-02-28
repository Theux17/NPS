import { Router } from 'express'
import { UserController } from './controllers/UserControllers'
import { SurveyController } from './controllers/SurveysController'
import { SendEmailController } from './controllers/SendEmailController'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'

const routes = Router()

const userController = new UserController
const surveysController = new SurveyController
const sendEmailController = new SendEmailController
const answerController = new AnswerController
const npsController = new NpsController

routes.post("/users", userController.create)

routes.get("/surveys", surveysController.show)
routes.post("/surveys", surveysController.create)

routes.post("/sendEmail", sendEmailController.execute)

routes.get("/answers/:value", answerController.execute)

routes.get("/nps/:survey_id", npsController.execute)

export default routes