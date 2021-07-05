from django.shortcuts import render, redirect
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework import request
from rest_framework.parsers import MultiPartParser, FileUploadParser
from .serializer import ResumeTableSerial
from .models import ResumeTable
from .extractor import ResumeParser
import docx2txt
import json
from .utils import extract_text
from django.core.files.storage import FileSystemStorage
from rest_framework.views import APIView


class CreateResumeCard(APIView):
    serializer_class = ResumeTableSerial

    def get(self, request, format=None):
        profile_id = request.GET['User_id']
        print(profile_id)

        # resume_data = list(ResumeTable.objects.all())
        # resume_data_new = ResumeTable.objects.create(Name=get_name, Email='mannu@gmail.com', Phone='9149352773', Designation='Intern',
        #                                            Skills='Bussiness', links='github.com/mannu-pande')
        #new_id = resume_data_new.id
        resume_data = ResumeTable.objects.get(pk=profile_id)
        data = ResumeTableSerial(resume_data).data
        output_data = {'data': data}
        return Response(output_data, status.HTTP_200_OK)

    def put(self, request, format=None):
        card_id = request.GET['id']
        data = ResumeTable.objects.get(pk=card_id)
        req_data = request.data
        data.Name = req_data.get('Name')
        data.Email = req_data.get('Email')
        data.Phone = req_data.get('Phone')
        data.Designation = req_data.get('Designation')
        data.Skills = req_data.get('Skills')
        data.links = req_data.get('links')
        data.save()
        print(data)
        print(card_id)
        return Response({"body": "Received"}, status.HTTP_200_OK)


class FillForm(APIView):
    serializers_class = ResumeTableSerial

    def post(self, request, format=None):
        name = request.data.get('Name')
        age = request.data.get('Age')
        fulldata = {'name': name, 'age': age}
        print(fulldata)
        return Response(fulldata, status.HTTP_201_CREATED)


class ResumeGenerator(APIView):
    serializer_class = ResumeTableSerial
    parser_classes = (MultiPartParser, FileUploadParser,)

    def post(self, request, format=None):
        fs = FileSystemStorage()
        resume = ResumeTable
        try:
            file_obj = request.FILES['file']
            filefullname = file_obj.name.split(' ')
            filefullname = "".join(filefullname)
            extension = filefullname.split('.')
            extension = extension[1]
            # print(file_obj)
            if extension == 'docx' or extension == 'pdf':
                file_inst = fs.save(filefullname, file_obj)
                print(file_inst)
                uploaded_url = fs.url(file_inst)
                resume = ResumeParser(file_obj, extension)
                parsed_data = resume.get_extracted_data()
                temp_name = parsed_data.get('name')
                temp_email = parsed_data.get('email')
                temp_phone = parsed_data.get('phone')
                temp_links = parsed_data.get('links')
                temp_skills = ','.join(parsed_data.get('skills'))
                #temp_skills = None
                temp_designation = 'Fresher'
                if temp_phone is not None:
                    new_obj_phone = ResumeTable.objects.filter(
                        Phone=temp_phone).exists()
                    print(new_obj_phone)

                print(parsed_data)
                resume_data = ResumeTable.objects.create(
                    Name=temp_name, Email=temp_email, Phone=temp_phone, Designation=temp_designation, Skills=temp_skills, links=temp_links)
                temp_id = resume_data.id
                # print(parsed_data.get('name'))

                return Response({"data": temp_id}, status.HTTP_200_OK)
        except:
            return Response("Bad request", status.HTTP_400_BAD_REQUEST)
