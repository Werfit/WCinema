from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

class Hall(models.Model):
  name = models.CharField(max_length=255)

  # Size range from 1 to 100
  size = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])

  def __str__(self):
    return 'Hall: {} x {}'.format(self.name, self.size)


class MovieSession(models.Model):
  hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
  name = models.CharField(max_length=255)

  price = models.PositiveIntegerField()

  # Session Time
  start = models.DateTimeField(default=timezone.now)
  end = models.DateTimeField(default=timezone.now)

  # Session Period
  start_day = models.DateField(default=timezone.now)
  end_day = models.DateField(default=timezone.now)

  tickets_bought = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)], editable=False)

  def __str__(self):
    return 'Movie: {}'.format(self.name)