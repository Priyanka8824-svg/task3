from django.urls import path
from .views import *

urlpatterns = [
    path('student/create/', create_student),
    path('student/list/', list_student),
    path('student/update/<pk>/', update_student),
    path('student/delete/<pk>/', delete_student),
    path('student/retrieve/<pk>/', retrieve_student),
]


