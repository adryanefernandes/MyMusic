import { Router } from 'express'
import createMusic from '../controller/CreateMusic'

export const musicRouter = Router()

musicRouter.post("/create", createMusic.handle)