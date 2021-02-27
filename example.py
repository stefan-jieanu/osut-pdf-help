# import glob, os, sys

# #os.chdir(os.getcwd() + '/public/uploads')

# def get_all():
#     os.chdir('E:/spacehack/osut-pdf-help/public/uploads')
#     for root, dirs, files in os.walk('.'):
#         for filename in files:
#             print(filename + "#", end="")

# def main(argv, argc):
#     if (argc > 0):
#         print(argv)
#     else:
#         get_all()
    

# if __name__ == "__main__":
#     main(sys.argv, len(sys.argv))


import PyPDF2
import pdfminer
# from Scripts import pdf2txt


from io import StringIO
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
import glob
import sys
import os

def convert_pdf_to_text(fname, pages=None):
    if not pages:
        pagenums = set()
    else:
        pagenums = set(pages)

    output = StringIO()
    manager = PDFResourceManager()
    converter = TextConverter(manager, output, laparams=LAParams())
    interpreter = PDFPageInterpreter(manager, converter)

    infile = open(fname, 'rb')
    for page in PDFPage.get_pages(infile, pagenums):
        interpreter.process_page(page)
    infile.close()
    converter.close()
    text = output.getvalue()
    output.close
    return text

def checkStringInPDF(pdf_text, inputString):
    if inputString in pdf_text:
       return 'succes'

    return 'fail'

def main(argv, argc):
    inputString = argv[1]

    os.chdir('E:/spacehack/osut-pdf-help/public/uploads')

    resultPDFs = '';
    list_of_files = glob.glob('*.pdf')           # create the list of file
    for file_name in list_of_files:
        resultTxt = convert_pdf_to_text(file_name, pages=None)

        if checkStringInPDF(resultTxt, inputString) == 'succes':
            print(file_name + "#", end="");
    

if __name__ == "__main__":
    main(sys.argv, len(sys.argv))


