import { Router } from 'express'
import { UserController } from './controllers/UserControllers'
import { SurveyController } from './controllers/SurveysController'
import { SendEmailController } from './controllers/SendEmailController'

const routes = Router()

const userController = new UserController
const surveysController = new SurveyController
const sendEmailController = new SendEmailController

routes.post("/users", userController.create)

routes.get("/surveys", surveysController.show)
routes.post("/surveys", surveysController.create)

routes.post("/sendEmail", sendEmailController.execute)

export default routes