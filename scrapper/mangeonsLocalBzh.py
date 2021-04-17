import requests
import bs4

pages = [

]

for i in pages:
   response = requests.get(i)
   soup = bs4.BeautifulSoup(response.text, 'html.parser')

   divs = soup.find_all("div", {"class": "item-title"})
   hrefs = []
   for div in divs:
       href = div.a.get("href")

       response = requests.get(href)
       soup = bs4.BeautifulSoup(response.text, 'html.parser')
       name = soup.h1.string
       mailRow = soup.find("div", {"class": "address-row row-email"})
       mailDiv = mailRow.find("div", {"class": "address-data"})
       mail = mailDiv.p.a.string
       file1 = open("producers.txt", "a")
       file1.write("{};{}\n".format(name, mail))
       file1.close()



    #    print(name, "\t", mail)
