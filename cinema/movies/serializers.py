from rest_framework import serializers
from .models import *

class IDStartDayRelatedField(serializers.RelatedField):
  def to_representation(self, value):
    return {
      "id": value.id,
      "start": value.start
    }


class HallSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hall
    fields = '__all__'
    ordering = 'name'


class MovieSessionSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieSession
    fields = '__all__'
    ordering = 'name'


class MovieSerializer(serializers.ModelSerializer):
  sessions = IDStartDayRelatedField(many=True, read_only=True)
  
  class Meta:
    model = Movie
    fields = ('id', 'name', 'start_day', 'end_day', 'sessions')
    ordering = '-id'


class MovieTicketSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieTicket
    fields = '__all__'