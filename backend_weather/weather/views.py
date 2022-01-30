from django.shortcuts import render
import requests
from django.http import JsonResponse

api = {
  "key": "2f2f6ca41c866293d6315db857dc73f2",
  "base": "https://api.openweathermap.org/data/2.5/"
}

# Create your views here.
def current_temp(request):
    query_city = request.GET.get('city', 'Paris')

    url = f"{api['base']}weather?q={query_city}&units=metric&appid={api['key']}"
    response = requests.get(url).json()

    # type(response)

    weather_info = {}

    weather_info['weather'] = response['weather']
    weather_info['main'] = response['main']
    weather_info['name'] = response['name']
    weather_info['sys'] = response['sys']



    # print(response.json())
    print(weather_info)
    
    return JsonResponse(weather_info)