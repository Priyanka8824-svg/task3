from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from .models import Student
from .serializers import StudentSerializer
from account.authenticate import CustomAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from django.core.mail import send_mail
from .utils import async_send_email

import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([CustomAuthentication])
def create_student(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        logger.info('New stud Added.')
        
        async_send_email(
            subject = "Notification:",
            message = "new recrod added....",
            from_email = settings.EMAIL_HOST_USER ,
            recipient_list = [request.user.email]
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        logger.warning('Error while creating product data.')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([CustomAuthentication])
def list_student(request):
    objects = Student.objects.all()
    serializer = StudentSerializer(objects, many=True)
    logger.info('Student data listed.')
    return Response(serializer.data,status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([CustomAuthentication])
def retrieve_student(request, pk):
    obj = get_object_or_404(Student,id=pk)
    serializer = StudentSerializer(obj)
    logger.info('Student data retrieved.')
    return Response(serializer.data,status=200)


@api_view(['PUT','PATCH'])
@permission_classes([IsAuthenticated])
@authentication_classes([CustomAuthentication])
def update_student(request, pk):
    obj = get_object_or_404(Student, id=pk)
    serializer = StudentSerializer(obj, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        logger.info('Student data updated.')

        async_send_email(
            subject = "Notification:",
            message= "recrod updated....",
            from_email= settings.EMAIL_HOST_USER ,
            recipient_list= [request.user.email]
        )
        return Response(serializer.data,status=200)
    else:
        logger.warning('Error while updating  data.')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([CustomAuthentication])
def delete_student(request, pk):
    obj = get_object_or_404(Student, id=pk)
    obj.delete()
    logger.info('Student data deleted.')
    
    async_send_email(
            subject= "Notification:",
            message= "recrod deleted....",
            from_email= settings.EMAIL_HOST_USER ,
            recipient_list= [request.user.email]
        )
    return Response(status=status.HTTP_204_NO_CONTENT)
