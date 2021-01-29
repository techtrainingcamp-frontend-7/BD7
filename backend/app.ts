import express from 'express'
import expressJwt from 'express-jwt'
import { UserRouter } from '@routes'
import { User } from '@vo'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/user', UserRouter);

module.exports = app
