from django.contrib import admin
from .models import ResumeTable

# Register your models here.


class ResumeList(admin.ModelAdmin):
    list_display = ['id', 'Name', 'Email',
                    'Phone', 'Designation', 'Skills', 'links']


admin.site.register(ResumeTable, ResumeList)
