from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from datetime import timedelta, date, datetime

from .permissions import *
from .serializers import *
from .models import *

class HallViewSet(viewsets.ModelViewSet):
  serializer_class = HallSerializer
  queryset = Hall.objects.all()

  @action(
    detail=True,
    methods=['patch'],
    permission_classes=(permissions.IsAdminUser, )
  )
  def change_hall(self, request, pk=None):
    hall = Hall.objects.filter(id=pk)

    for session in hall[0].sessions.all():
      if session.tickets_bought != 0:
        return Response({
          "detail": "At least one ticket was bought. You can't edit this hall"
        }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    hall.update(**request.data)

    return Response({
      "hall": HallSerializer(hall[0]).data
    }, status=status.HTTP_200_OK)


class MovieViewSet(viewsets.ModelViewSet):
  serializer_class = MovieSerializer
  queryset = Movie.objects.all()
  permission_classes = (permissions.AllowAny, )

  days_options = {
    "today": date.today(),
    "tomorrow": date.today() + timedelta(days=1),
    "all": date.today()
  }

  def filter_by_day(self, day):
    movies = Movie.objects.filter(
      sessions__start__gte=day,
      sessions__end__lte=day + timedelta(days=1)
    )
    
    return movies

  def filter_sessions(self, movies, day, filter_date=''):
    res = []

    for movie in movies:
      if filter_date != 'all':
        ok_sessions = list(filter(
          lambda session: session.start.date() >= day and session.end.date() <= day + timedelta(days=1),
          movie.sessions.all()))
      else:
        ok_sessions = list(filter(
          lambda session: session.start.date() >= day,
          movie.sessions.all()))

      res.append({
        "id": movie.id,
        "name": movie.name,
        "start_day": movie.start_day,
        "end_day": movie.end_day,
        "sessions": SMovieSessionSerializer(ok_sessions, many=True).data
      })

    return res

  def list(self, request):
    if request.GET.get('date'):
      filter_date, sort_by = request.GET['date'], request.GET.get('sort_by')

      if filter_date in self.days_options.keys():
        movies = self.filter_by_day(self.days_options[filter_date])

        if sort_by:
          movies = movies.order_by(sort_by)

        movies = self.filter_sessions(movies, self.days_options[filter_date], filter_date)

        return Response(movies)


    return super(MovieViewSet, self).list(request)

  @action(
    detail=True,
    methods=['get']
  )
  def get_free_places(self, request, pk=None):
    movie_session = MovieSession.objects.get(id=pk)

    return Response({
      "free_places": movie_session.hall.size - movie_session.tickets_bought
    })

  @action(
    detail=True,
    methods=['post'],
    permission_classes=[IsAuthenticatedAndNotAdminUser]
  )
  def buy_ticket(self, request, pk=None):
    # Increasing amount of bought tickets
    movie_session = MovieSession.objects.get(id=pk)

    # Checking for free places
    if movie_session.tickets_bought + 1 > movie_session.hall.size:
      return Response({
        "detail": "The hall is full"
      }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    # Checking if the place is booked
    for ticket in movie_session.tickets.all():
      if ticket.place == request.data["place"]:
        return Response({
          "detail": "This place is already booked. You can't book this one"
        }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    movie_session.tickets_bought += 1
    movie_session.save()

    ticket = MovieTicketSerializer(data={
      "user": request.user.id,
      "session": movie_session.id,
      "place": request.data["place"]
    })
    ticket.is_valid(raise_exception=True)
    ticket = ticket.save()

    return Response({
      "session": MovieSessionSerializer(movie_session).data,
      "ticket": MovieTicketSerializer(ticket).data,
    }, status=status.HTTP_200_OK)


  @action(
    detail=True,
    methods=['patch'],
    permission_classes=(permissions.IsAdminUser, )
  )
  def change_movie_session(self, request, pk=None):
    movie_session = MovieSession.objects.filter(id=pk)

    if movie_session[0].tickets_bought != 0:
      return Response({
        "detail": "At least one ticket was bought. You can't edit this session"
      }, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    movie_session.update(**request.data)

    return Response({
      "session": MovieSessionSerializer(movie_session[0]).data
    }, status=status.HTTP_200_OK)