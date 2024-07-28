import { generateStyles, createComponentTemplate, indent } from '../helpers/index.js'

export function generateInputComponent({ wrapperElement, componentType }) {
  let globalStyles = ''
  let iconCounter = 1

  const outerDivClass = "clovr-outer-div"
  const innerDivClass = "clovr-inner-div"

  globalStyles += generateStyles(wrapperElement.style, outerDivClass)
  globalStyles += generateStyles(wrapperElement.childElements[0].style, innerDivClass)

  function generateChildElements(childElements) {
    return childElements
      .map(child => {
        const { element, style, icon } = child

        switch (element) {
          case 'input':
            globalStyles += generateStyles(style, "clovr-input")
            return `\n${indent(10)}<input class="clovr-input"/>`
          case 'span':
            globalStyles += generateStyles(style, `clovr-icon-${iconCounter++}`)
            return `<span class="mdi ${icon} clovr-icon-${iconCounter - 1}"></span>`
          default:
            return ''
        }
      })
      .join('')
  }

  const innerElementsHTML = generateChildElements(wrapperElement.childElements[0].childElements)

  const outerIcon = wrapperElement.childElements[1]
  const outerIconClass = `clovr-icon-${iconCounter++}`

  if (outerIcon) globalStyles += generateStyles(outerIcon.style, outerIconClass)

  const outerIconHTML = outerIcon
    ? `<span class="mdi ${outerIcon.icon} ${outerIconClass}"></span>`
    : ''

  const componentHTML =
    `
      <div class="${outerDivClass}">
        <div class="${innerDivClass}">
          ${innerElementsHTML}
        </div>
        ${outerIconHTML}
      </div>
    `

  return createComponentTemplate(globalStyles.trimEnd(), componentHTML, componentType)
}