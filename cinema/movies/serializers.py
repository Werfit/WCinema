from rest_framework import serializers
from .models import *

from django.db.models import Q
from datetime import timedelta, date


class IDStartDayRelatedField(serializers.RelatedField):
   def to_representation(self, value):
     return {
       "id": value.id,
       "name": value.name
     }

class HallSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hall
    fields = '__all__'
    ordering = 'name'


# Short Movie Session
class SMovieSessionSerializer(serializers.ModelSerializer):
  # movie = IDStartDayRelatedField(many=False, read_only=True)

  class Meta:
    model = MovieSession
    fields = ('id', 'start', 'movie')
    ordering = 'id'


class MovieSerializer(serializers.ModelSerializer):
  sessions = serializers.SerializerMethodField()

  filter_dates = {
    'today': date.today(),
    'tomorrow': date.today() + timedelta(days=1)
  }

  def get_sessions(self, obj):
    name = Q(movie=obj.id)

    filter_date = self.context.GET.get('date')
    if filter_date in self.filter_dates:
      later = Q(start__gte=self.filter_dates[filter_date])
      earlier = Q(end__lte=self.filter_dates[filter_date] + timedelta(days=1))

      sessions = MovieSession.objects.filter(name & later & earlier)
      return MovieSessionSerializer(sessions, many=True).data

    later = Q(start__gte=self.filter_dates['today'])
    sessions = MovieSession.objects.filter(name & later)
    return MovieSessionSerializer(sessions, many=True).data

  def to_representation(self, instance):
    sessions = self.get_sessions(instance)
    
    if not sessions:
      return ''
    return super(MovieSerializer, self).to_representation(instance)
  
  class Meta:
    model = Movie
    fields = ('id', 'name', 'start_day', 'end_day', 'sessions')
    ordering = ['-id']


class MovieSessionSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieSession
    fields = '__all__'
    ordering = '-id'


class MovieTicketSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieTicket
    fields = '__all__'