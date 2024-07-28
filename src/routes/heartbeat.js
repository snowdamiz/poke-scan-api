import express from 'express'

export const heartbeatRouter = express.Router()

heartbeatRouter.get('/', (req, res) => {
  res.send('Im alive!')
})