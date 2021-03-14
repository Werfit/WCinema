from rest_framework import serializers
from .models import *

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


class MovieTicketSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieTicket
    fields = '__all__'