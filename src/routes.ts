import { Router } from 'express'
import { UserController } from './controllers/UserControllers'
import { SurveyController } from './controllers/SurveysController'

const routes = Router()

const userController = new UserController
const surveysController = new SurveyController

routes.post("/users", userController.create)

routes.get("/surveys", surveysController.show)
routes.post("/surveys", surveysController.create)

export default routes