from .utils import extract_text
import pandas as pd
import os
import spacy
from . import utils
from spacy.matcher import Matcher


class ResumeParser:

    def __init__(self, resume, extension):
        nlp = spacy.load('en_core_web_sm')
        self.__matcher = Matcher(nlp.vocab)
        self.__data = {
            "name": None,
            "email": None,
            "skills": None,
            "phone": None,
            "links": None

        }
        self.__file = resume
        self.__txt = utils.extract_text(self.__file, extension)
        self.__nlp = nlp(self.__txt)
        self.__nounchunks = self.__nlp.noun_chunks
        self.__get_details()

    def get_extracted_data(self):
        return self.__data

    def __get_details(self):
        name = utils.extract__name(self.__nlp, self.__matcher)
        email = utils.extract__email(self.__txt)
        phone = utils.extract__phone(self.__txt)
        links = utils.extract__links(self.__txt)
        skills = utils.extract__skills(self.__nlp, self.__nounchunks)
        self.__data['name'] = name
        self.__data['email'] = email
        self.__data['phone'] = phone
        self.__data['links'] = links
        self.__data['skills'] = skills
        #self.__data['skills'] = None
