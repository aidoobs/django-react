from django.db import models

# Create your models here.


class ResumeTable(models.Model):
    Name = models.CharField(max_length=100, null=True)
    Email = models.CharField(max_length=100, null=True)
    Phone = models.CharField(max_length=15, null=True)
    Designation = models.CharField(max_length=20, null=True)
    Skills = models.CharField(max_length=500, null=True)
    links = models.CharField(max_length=150, null=True)
    template = models.CharField(max_length=100, null=True)
    summary = models.CharField(max_length=200, null=True)
    rating = models.IntegerField(max_length=2, null=True)
    resumeurl = models.CharField(max_length=200, null=True)
    approved=models.BooleanField(default=False)
