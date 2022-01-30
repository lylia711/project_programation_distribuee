from operator import mod
from django.db import models

# Create your models here.
class WeatherNow(models.Model):
    city = models.CharField(max_length=60)
    temperature = models.IntegerField()
    icon = models.CharField(max_length=10)

    def __str__(self):
        return self.name