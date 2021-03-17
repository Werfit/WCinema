from rest_framework import serializers
from .models import *


class HallSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hall
    fields = '__all__'
    ordering = 'name'


# Short Movie Session
class SMovieSessionSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieSession
    fields = ('id', 'start')
    ordering = 'start'


class MovieSerializer(serializers.ModelSerializer):
  sessions = SMovieSessionSerializer(many=True, read_only=True)
  
  class Meta:
    model = Movie
    fields = ('id', 'name', 'start_day', 'end_day', 'sessions')
    ordering = '-id'
    

class MovieSessionSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieSession
    fields = '__all__'
    ordering = 'name'


class MovieTicketSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieTicket
    fields = '__all__'