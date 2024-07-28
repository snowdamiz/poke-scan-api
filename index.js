import express from 'express'
import cors from 'cors'
import session from 'cookie-session'
import 'dotenv/config'

import { buildRouter, heartbeatRouter } from './src/routes/index.js'
import { corsOptions, apiLimiter, port } from './src/config/index.js'

const app = express()
const secret = process.env.SECRET
const { log } = console

app.use(express.json())
app.use(cors(corsOptions))
app.use(session({ secret }))
app.use(apiLimiter)

app.use('/', heartbeatRouter)
app.use('/api', buildRouter)

app.listen(port, () => log(`Running on port ${port}`))