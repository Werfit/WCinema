from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action

from .serializers import *
from .models import *

class HallViewSet(viewsets.ModelViewSet):
  serializer_class = HallSerializer
  queryset = Hall.objects.all()


class MovieSessionViewSet(viewsets.ModelViewSet):
  serializer_class = MovieSessionSerializer
  queryset = MovieSession.objects.all()
  permission_classes = (permissions.IsAdminUser, )

  @action(detail=True, methods=['post'])
  def buy_ticket(self, request, pk=None):
    movie_session = MovieSession.objects.get(id=pk)

    movie_session.tickets_bought += 1
    movie_session.save()

    return Response(MovieSessionSerializer(movie_session).data, status=status.HTTP_200_OK)

  @action(detail=True, methods=['patch'])
  def change_moviesession(self, request, pk=None):
    movie_session = MovieSession.objects.filter(id=pk)

    if movie_session[0].tickets_bought != 0:
      return Response({
        "detail": "At least one ticket was bought. You can't edit this session"
      }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    movie_session.update(**request.data)

    return Response({
      "session": MovieSessionSerializer(movie_session[0]).data
    }, status=status.HTTP_200_OK)

  # permission_classes = (permissions.IsAdminUser)