from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import *
from .models import *

class HallViewSet(viewsets.ModelViewSet):
  serializer_class = HallSerializer
  queryset = Hall.objects.all()

  # permissions = (permissions.IsAdminUser, )


class MovieSessionViewSet(viewsets.ModelViewSet):
  serializer_class = MovieSessionSerializer
  queryset = MovieSession.objects.all()

  @action(detail=True, methods=['post'])
  def buy_ticket(self, request, pk=None):
    movie_session = MovieSession.objects.get(id=pk)

    movie_session.tickets_bought += 1
    movie_session.save()

    return Response(MovieSessionSerializer(movie_session).data)

  # permission_classes = (permissions.IsAdminUser)