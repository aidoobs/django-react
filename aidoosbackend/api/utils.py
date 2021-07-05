import docx2txt
import PyPDF2
import re
import pandas as pd
import os
# import io
# from pdfminer.converter import TextConverter
# from pdfminer.pdfinterp import PDFPageInterpreter
# from pdfminer.pdfinterp import PDFResourceManager
# from pdfminer.layout import LAParams
# from pdfminer.pdfpage import PDFPage


def extract_text(file_path, extension):
    '''
    Wrapper function to detect the file extension and call text extraction function accordingly

    :param file_path: path of file of which text is to be extracted
    :param extension: extension of file `file_name`
    '''

    text = ''
    if extension == 'pdf':
        print("reached pdf section")
     #   for page in extract_text_from_pdf(file_path):
      #      text += ' ' + page
        text = extract_text_from_pdf(file_path)

    elif extension == 'docx' or extension == 'doc':
        text = extract_text_from_doc(file_path)
    return text


def extract_text_from_doc(doc_path):
    '''
    Helper function to extract plain text from .doc or .docx files

    :param doc_path: path to .doc or .docx file to be extracted
    :return: string of extracted text
    '''
    temp = docx2txt.process(doc_path)
    text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
    return ' '.join(text)


def extract_text_from_pdf(file):
    finaltext = ''
    pdfRead = PyPDF2.PdfFileReader(file)
    total_page = pdfRead.numPages
    for page in range(total_page):
        text = ''
        pageObj = pdfRead.getPage(page)
        text = pageObj.extractText()
        # print(text)
        text = [line.replace('\t', ' ')for line in text.split('\n') if line]

        text = ' '.join(text)
        finaltext += text

    return finaltext


def extract__name(nlp_text, matcher):

    # First name and Last name are always Proper Nouns
    pattern = [{'POS': 'PROPN'}, {'POS': 'PROPN'}]

    matcher.add('NAME', [pattern])

    matches = matcher(nlp_text)

    for match_id, start, end in matches:
        span = nlp_text[start:end]
        return span.text


def extract__phone(text):
    data = None
    phone = re.search(
        '(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})', text)
    if phone != None:
        data = phone.group(0).strip()
    return data


def extract__links(text):
    links = re.search("(https?://\S+)", text)
    if links != None:
        data = links.group(0).strip()
    return data


def extract__email(text):
    email = re.findall("([^@|\s]+@[^@]+\.[^@|\s]+)", text)
    if email:
        try:
            return email[0].split()[0].strip(';')
        except IndexError:
            return None


def extract__skills(nlp_text, noun_chunks):
    tokens = [token.text for token in nlp_text if not token.is_stop]
    data = pd.read_csv(os.path.join(os.path.dirname(__file__), 'skills.csv'))
    skills = list(data.columns.values)
    skillset = []
    # check for one-grams
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)

    # check for bi-grams and tri-grams
    for token in noun_chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)
    return [i.capitalize() for i in set([i.lower() for i in skillset])]
