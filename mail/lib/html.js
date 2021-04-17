const tableHeader = `<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <td class="tg-c3ow">Catégorie<br></td>
    <td class="tg-c3ow">Produit</td>
    <td class="tg-c3ow">Unité</td>
    <td class="tg-c3ow">Prix</td>
    <td class="tg-c3ow">Quantité</td>
    <td class="tg-c3ow">Total produit</td>
  </tr>
</thead>
<tbody>
  `
const tableFooter = `</tbody>
</table>`

function categoryRow(categoryName, size) {
  return `
        <td class="tg-c3ow" rowspan="${2 * size}">${categoryName}</td>
    `
}
function productRow(productName, size) {
  return `
        <td class="tg-c3ow" rowspan="${2 * size}">${productName}</td>
    `
}
function productUnitRow({ unit, price, quantity }) {
  var totalPrice = (price * quantity) / 100
  return `
        <td class="tg-c3ow">${unit}</td>
        <td class="tg-c3ow">${price / 100}€</td>
        <td class="tg-c3ow">${quantity}</td>
        <td class="tg-c3ow">${totalPrice}€</td>
    `
}

exports.htmlHelper = {
  tableHeader,
  tableFooter,
  categoryRow,
  productRow,
  productUnitRow,
}
