import { Router } from 'express'
import createMusic from '../controller/CreateMusic'
import getMusicById from '../controller/GetMusicById'
import getMusics from '../controller/GetMusics'
import searchMusic from '../controller/SearchMusic'

export const musicRouter = Router()

musicRouter.get("/", searchMusic.handle)
musicRouter.get("/all", getMusics.handle)
musicRouter.get("/:id", getMusicById.handle)

musicRouter.post("/create", createMusic.handle)