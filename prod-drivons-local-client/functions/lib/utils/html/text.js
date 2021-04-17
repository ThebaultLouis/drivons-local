function addTextStyle({ font, weight, size, letterSpacing }) {
  var style = `style="`
  if (font) style += `font: ${font};`
  if (weight) style += `font-weight: ${weight};`
  if (size) style += `font-size: ${size};`
  if (letterSpacing) style += `letterSpacing: ${letterSpacing};`
  return style + `"`
}

function div(style, text) {
  return `<div ${addTextStyle(style)} >${text}</div>`
}

function heading6(text) {
  return div(
    {
      font: 'Roboto',
      weight: 700,
      size: '1.25rem',
      letterSpacing: '0.0125em',
    },
    text
  )
}

function subtitle2(text) {
  return div(
    {
      font: 'Roboto',
      weight: 700,
      size: '1rem',
      letterSpacing: '0.0071428571em',
    },
    text
  )
}
function body1(text) {
  return div(
    {
      font: 'Roboto',
      weight: 400,
      size: '1rem',
      letterSpacing: '0.03125em',
    },
    text
  )
}

function a(text, href) {
  return `<div>
  <a href="${href}">${text}</a>
          </div>`
}

exports.htmlText = {
  heading6,
  subtitle2,
  body1,
  a,
}
