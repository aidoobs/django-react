from rest_framework import serializers
from .models import ResumeTable


class ResumeTableSerial(serializers.ModelSerializer):
    class Meta:
        model = ResumeTable
        fields = ['id', 'Name', 'Email', 'Phone',
                  'Designation', 'Skills', 'links']
