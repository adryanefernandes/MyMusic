import { Router } from 'express'
import createMusic from '../controller/CreateMusic'
import getMusics from '../controller/GetMusics'

export const musicRouter = Router()

musicRouter.get("/all", getMusics.handle)
musicRouter.post("/create", createMusic.handle)