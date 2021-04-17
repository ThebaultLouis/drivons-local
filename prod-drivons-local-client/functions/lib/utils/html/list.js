function startUnorderedList() {
  return '<ul style="margin:7px 0">'
}

function addListItem(text) {
  return `<li>${text}</li>`
}

function closeUnorderedList() {
  return '</ul>'
}

exports.ul = {
  start: startUnorderedList,
  item: addListItem,
  close: closeUnorderedList,
}
