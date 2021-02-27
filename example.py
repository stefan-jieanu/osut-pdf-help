import glob, os, sys

#os.chdir(os.getcwd() + '/public/uploads')

def main(argv, argc):
    os.chdir('E:/spacehack/osut-pdf-help/public/uploads')
    for root, dirs, files in os.walk('.'):
        for filename in files:
            print(filename)

if __name__ == "__main__":
    main(sys.argv, len(sys.argv))