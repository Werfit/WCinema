from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import response, permissions, status
from rest_framework import authentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from .serializers import *


# Log In User View
class LoginUserView(APIView):
  def post(self, request):
    serializer = LoginUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data

    token, created = Token.objects.get_or_create(user=user)

    return response.Response({
      "user": UserSerializer(user).data,
      "token": token.key,
    }, status=status.HTTP_200_OK)


# Register User View
class RegisterUserView(APIView):
  def post(self, request):
    serializer = RegisterUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    token, created = Token.objects.get_or_create(user=user)

    return response.Response({
      "user": RegisterUserSerializer(user).data,
      "token": token.key
    }, status=status.HTTP_200_OK)


# Log Out User View
class LogoutUserView(APIView):
  permission_classes = (permissions.IsAuthenticated, )

  def post(self, request):
    token = Token.objects.get(key=request.headers['Authorization'].split()[1])
    token.delete()

    return response.Response({
      'detail': 'Logout successfull'
    }, status=status.HTTP_200_OK)


# User Data View
class UserView(RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated, )
  queryset = User.objects.all()
  serializer_class = UserSerializer
