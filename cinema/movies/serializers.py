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

  # Filters movie sessions
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
      return None

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

  def validate(self, data):
    cleaned_data = super().validate(data)

    # Checking if time is correct
    if cleaned_data['start'] > cleaned_data['end']:
      raise serializers.ValidationError('End Time must be later than Start Time')

    # Checking if there is no more sessions at the time
    hall = cleaned_data['hall']
    sessions = hall.sessions.all()

    start_check = Q(start__gte=cleaned_data['start'], end__lte=cleaned_data['end'])
    end_check = Q(start__gte=cleaned_data['end'], end__lte=cleaned_data['end'])

    if len(sessions.filter(start_check|end_check)) > 0:
      raise serializers.ValidationError('Sessions in the same hall can not have the same time')

    # Checking if session time in range of movie show time
    movie = cleaned_data['movie']
    if not (movie.start_day <= cleaned_data['start'].date() <= movie.end_day) or \
      not (movie.start_day <= cleaned_data['end'].date() <= movie.end_day):
      raise serializers.ValidationError('Session date is beyond the movie show time')

    return cleaned_data


class MovieTicketSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieTicket
    fields = '__all__'