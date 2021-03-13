from rest_framework.views import APIView
from rest_framework import response, permissions
from rest_framework import authentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from .serializers import *

class LoginUserView(APIView):
  def post(self, request):
    serializer = LoginUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data

    token, created = Token.objects.get_or_create(user=user)

    return response.Response({
      "user": UserSerializer(user).data,
      "token": token.key,
    })


class RegisterUserView(APIView):
  def post(self, request):
    serializer = RegisterUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    token, created = Token.objects.get_or_create(user=user)

    return response.Response({
      "user": RegisterUserSerializer(user).data,
      "token": token.key
    })


class UserView(APIView):
  permission_classes = (permissions.IsAuthenticated, )
  def post(self, request):
    # token = request.headers["Authorization"].split()[1]
    # token_expiration_handler(token)
    return response.Response("U a welcome")