from rest_framework import serializers
from .models import WeatherNow

class WeatherNowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WeatherNow
        fields = ('id', 'city', 'temperature', 'icon')