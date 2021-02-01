import express from 'express'
import { UserRouter, TestRouter } from '@routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/', TestRouter)
app.use('/api/user', UserRouter)

module.exports = app
