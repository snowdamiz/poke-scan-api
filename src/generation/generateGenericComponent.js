import { generateStyles, createComponentTemplate, indent } from '../helpers/index.js'

export function generateGenericComponent(componentJson) {
  const { wrapperElement: { element, childElements, style }, componentType } = componentJson

  let globalStyles = ''
  let classCounter = 1

  function generateElementHTML(child, parentClass, depth = 0) {
    const { element, style, childElements, type, icon } = child

    const elementClass = `${parentClass}-${element}-${classCounter++}`
    globalStyles += generateStyles(style, elementClass)

    let childHTML = ''

    if (childElements) {
      childHTML = childElements.map(c => generateElementHTML(c, elementClass, depth + 1)).join('')
    }

    if (element === 'span' && type === 'icon') {
      return `${indent(depth * 3)}<span class="mdi ${icon} ${elementClass}">${childHTML}</span>\n`
    } else {
      let openTag = `${indent(depth * 3)}<${element} class="${elementClass}">`
      let closeTag = `</${element}>\n`
      return childElements ? openTag + `\n${childHTML}${indent(depth * 3)}` + closeTag : openTag + closeTag
    }
  }

  const wrapperClass = `clovr-${element}`
  const wrapperHTML = childElements.map(child => generateElementHTML(child, wrapperClass, 3)).join('')
  const componentHTML = `\n${indent(6)}<div class="${wrapperClass}">\n${wrapperHTML}${indent(6)}</div>\n${indent(4)}`

  globalStyles += generateStyles(style, wrapperClass)

  return createComponentTemplate(globalStyles.trimEnd(), componentHTML, componentType)
}
