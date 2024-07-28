import { indent } from './indent.js'

export function generateStyles(styleObj, className) {
  const styleLines = Object
    .entries(styleObj)
    .map(([key, value]) => `${indent(8)}${key}: ${value};`)

  return `${indent(6)}.${className} {\n${styleLines.join('\n')}\n${indent(6)}}\n\n`
}