import express from 'express'
import fs from 'fs'
import path from 'path'
import url from 'url'
import { generateInputComponent, generateGenericComponent } from '../generation/index.js'

export const buildRouter = express.Router()

const componentClassGenerators = {
  input: generateInputComponent,
  generic: generateGenericComponent,
}

buildRouter.post('/build', (req, res) => {
  const { log, error: err } = console

  try {
    const { user: userId, components } = req.body

    components.forEach(componentData => {
      const generateComponent = componentClassGenerators[componentData.componentType]
      const componentClassString = generateComponent(componentData)
      const fileName = `${userId}-clovr-${componentData.componentType}.js`
      const dirname = path.dirname(url.fileURLToPath(import.meta.url))
      const filePath = path.join(dirname, 'components', fileName)

      fs.writeFileSync(filePath, componentClassString)
    })

    log('Components created successfully')
    res.status(200).send('Components created successfully')
  } catch (error) {
    err(`Error creating components, ${error}`)
    res.status(500).send(`Error creating components, ${error}`)
  }
})
