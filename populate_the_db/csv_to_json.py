# /usr/bin/python3
import csv
import json
from collections import defaultdict
csvFilePath = 'ListeProducteurs - Réponses au formulaire 2.csv'
jsonFilePath = 'bdd.json'

data = []

days = {
    "dimanche": 0,
    "lundi": 1,
    "mardi": 2,
    "mercredi": 3,
    "jeudi": 4,
    "vendredi": 5,
    "samedi": 6
}
categoryIndex = 0
nameIndex = 1
priceIndex = 2
unitIndex = 3
quantityIndex = 4
infoIndex = 5

with open(csvFilePath) as csvFile:
    csvReader = csv.DictReader(csvFile)
    for rows in csvReader:
        row = {}
        product_categories = {}

        for p in rows["Liste des produits"].split('\n'):
            sections = p.split(';')
            product_categories[sections[categoryIndex]] = defaultdict(dict)

        products = []
        for p in rows["Liste des produits"].split('\n'):
            product = {}
            sections = p.split(';')
            if len(sections) < 4:
                continue 
            # print(sections)

            # Name
            product['name'] = sections[nameIndex]
            # Price
            price = sections[priceIndex]
            if price != '':
                price = float(price.replace(',', '.')) * 100
                if price % 1 == 0:
                    price = int(price)
            else:
                price = None
            product['price'] = price
            # Unit
            product['unit'] = sections[unitIndex]
            # Quantity
            product['quantity'] = int(sections[quantityIndex])
            # Add
            product_from_category = product_categories[sections[categoryIndex]
                                                       ][product['name']]

            if not product_from_category:
                product_from_category['units'] = []
            product_from_category['units'].append({
                "price": product['price'],
                "unit": product['unit'],
                "isAvaible": product['quantity'] > 0
            })
            # Info
            if len(sections) > 5:
                # product['info'] = sections[infoIndex]
                product_categories[sections[categoryIndex]
                                   ][product['name']]['info'] = sections[infoIndex]

        row['productCategories'] = product_categories

        # Openings
        openings = []
        for opening in rows['Horaires de retrait des paniers'].split("\n"):
            opening = opening.split(';')
            opening[0] = days[opening[0]]
            if (len(openings) != 0 and openings[-1]['value'] == opening[0]):
                openings[-1]['openingHours'].append(
                    opening[1] + "-" + opening[2])
            else:
                openings.append({
                    "value": opening[0],
                    "openingHours": [opening[1] + "-" + opening[2]]
                })
            # openings[opening[0]].append(opening[1] + "-" + opening[2])

        row['openingDays'] = openings

        #
        row['name'] = rows['Nom de l\'exploitation']
        #
        row['mail'] = rows['Adresse mail']
        row['website'] = rows['Site internet']
        # Info
        row['producerName'] = rows['Producteur']
        # Adresse
        row['zipcode'] = rows['Code postal']

        row['dep'] = row['zipcode'][:2]
        row['city'] = rows['Ville']
        row['adress'] = rows['Adresse de l\'exploitation']
        row['adressInfo'] = rows['Précisions sur l\'adresse']
        data.append(row)

with open(jsonFilePath, 'w') as jsonFile:
    jsonFile.write(json.dumps(data, indent=4))
