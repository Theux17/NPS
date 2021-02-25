import { resolve } from 'path'
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import SendEmailService from '../services/SendEmailService'

class SendEmailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({ email })
        if (!user) return res.status(400).json({
            error: "User does not exists!"
        })

        const survey = await surveysRepository.findOne({ id: survey_id })
        if (!survey) return res.status(400).json({
            error: "Survey does not exists!"
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

        const surveyUsersAlreadyExists = await surveysUsersRepository.findOne({
            where: [{ user_id: user.id }, { value: null }], 
            relations: ["user", "survey"]
        })

        if(surveyUsersAlreadyExists) {
            await SendEmailService.execute(email, survey.title, variables, npsPath)
            return res.json(surveyUsersAlreadyExists)
        }

        // Salvar as informações na tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        // Enviar e-mail para o usuário
        await SendEmailService.execute(email, survey.title, variables, npsPath)

        return res.json(surveyUser)

    }
}

export { SendEmailController }