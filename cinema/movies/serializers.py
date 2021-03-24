from rest_framework import serializers
from .models import *

from django.db.models import Q
from django.utils import timezone 


class HallSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hall
    fields = '__all__'
    ordering = 'name'


class MovieSerializer(serializers.ModelSerializer):
  sessions = serializers.SerializerMethodField()

  filter_dates = {
    'today': timezone.now().date(),
    'tomorrow': timezone.now().date() + timezone.timedelta(days=1)
  }

  def validate(self, data):
    cleaned_data = super().validate(data)

    if cleaned_data['start_day'] > cleaned_data['end_day']:
      raise serializers.ValidationError('Movie end day can not be earlier than start')

    return cleaned_data

  # Filters movie sessions
  def get_sessions(self, obj):
    name = Q(movie=obj.id)

    req = self.context['request']
    filter_date = req.GET.get('date')

    if filter_date in self.filter_dates:
      later_than_today = Q(start__gte=self.filter_dates[filter_date])
      later_than_tomorrow = Q(start__gte=self.filter_dates[filter_date] + timezone.timedelta(days=1))

      m = MovieSession.objects.filter(name)
      res = []

      for _m in m:
        if _m.start.date() >= self.filter_dates[filter_date] and _m.end.date() <= self.filter_dates[filter_date] + timezone.timedelta(days=1):
          res.append(_m)

      sessions = MovieSession.objects.filter(name & later_than_today).exclude(later_than_tomorrow).order_by('start')
      return MovieSessionSerializer(sessions, many=True).data

    later_than_today = Q(start__gte=self.filter_dates['today'])
    sessions = MovieSession.objects.filter(name & later_than_today).order_by('start')

    return MovieSessionSerializer(sessions, many=True).data

  def to_representation(self, instance):
    sessions = self.get_sessions(instance)
    
    if not sessions and self.context.get('isList'):
      return None

    return super(MovieSerializer, self).to_representation(instance)

  
  class Meta:
    model = Movie
    fields = ('id', 'name', 'start_day', 'end_day', 'sessions', 'description')
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
    fields = ('id', 'place', 'session')

  def to_representation(self, instance):
    date = instance.session.start.date()
    name = instance.session.movie.name
    price = instance.session.price

    return {
      "id": instance.id,
      "place": instance.place,
      "date": date,
      "name": name,
      "price": price
    }


# Short Movie and Hall serializers
class SMovieSerializer(serializers.ModelSerializer):
  class Meta:
    model = Movie
    fields = ('id', 'name', )


class SHallSerializer(serializers.ModelSerializer):
  class Meta:
    model = Hall
    fields = ('id', 'name', )


class SMovieSessionSerializer(serializers.ModelSerializer):
  class Meta:
    model = MovieSession

  def to_representation(self, instance):
    return {
      "id": instance.id,
      "price": instance.price,
      "tickets_bought": len(instance.tickets.all()),
      "size": instance.hall.size
    }


