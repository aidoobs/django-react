from django.urls import path
from .views import CreateResumeCard, ResumeGenerator, FillForm
urlpatterns = [
    path('create-resume/', CreateResumeCard.as_view()),
    path('upload', ResumeGenerator.as_view()),
    path('fill-form', FillForm.as_view())
]
