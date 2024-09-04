from django.db import models

# Create your models here.
class Student(models.Model):
    roll_number = models.IntegerField()
    student_name = models.CharField(max_length=20)
    education = models.CharField(max_length=20)
    college = models.CharField(max_length=20)