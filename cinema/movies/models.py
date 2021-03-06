from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.contrib.auth.models import User

class Hall(models.Model):
  name = models.CharField(max_length=255)

  # Size range from 1 to 100
  size = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])

  def __str__(self):
    return 'Hall: {} x {}'.format(self.name, self.size)


class Movie(models.Model):
  name = models.CharField(max_length=255, unique=True)

  start_day = models.DateField(default=timezone.now)
  end_day = models.DateField(default=timezone.now)

  description = models.TextField(blank=True, default='')

  def __str__(self):
    return 'Movie: {}'.format(self.name)


class MovieSession(models.Model):
  hall = models.ForeignKey(Hall, on_delete=models.CASCADE, related_name='sessions')
  movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name='sessions', related_query_name='sessions')

  price = models.PositiveIntegerField()

  # Session Time
  start = models.DateTimeField(default=timezone.now)
  end = models.DateTimeField(default=timezone.now)

  # tickets_bought = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)], editable=False)

  def __str__(self):
    return 'Session: {}'.format(self.movie.name)


class MovieTicket(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
  session = models.ForeignKey(MovieSession, on_delete=models.CASCADE, related_name='tickets')

  place = models.PositiveSmallIntegerField()

  def __str__(self):
    return "Order: {}x{}".format(self.user.username, self.session.movie.name)