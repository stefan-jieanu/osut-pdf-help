import fitz
import json
import sys
import os

def highlightPDF(fname, text):
    ### READ IN PDF
    doc = fitz.open('E:/spacehack/osut-pdf-help/public/uploads/original/' + fname)
    nr = doc.page_count
    for i in range(0, nr - 1):
        page = doc[i]
        ### SEARCH

        text_instances = page.searchFor(text)

        ### HIGHLIGHT

        for inst in text_instances:
            highlight = page.addHighlightAnnot(inst)

        ### OUTPUT
        os.chdir("E:/spacehack/osut-pdf-help/public/uploads/hightlighted/")

        doc.save(fname, garbage=4, deflate=True, clean=True)


res={

}

val = sys.argv[1]
res = json.loads(val)
fileNameArray =[]

fileNameArray = res["nume"]
keyWords = res.get('cuvinte_cheie')


for filename in fileNameArray:
   highlightPDF(filename,keyWords)

#fname = "ROF OSUT-mai-2019.pdf"
#text = "UVT"
#highlightPDF(fname,text)
#{"nume":["ROF OSUT-mai-2019.pdf"],"cuvinte_cheie":"UVT"}