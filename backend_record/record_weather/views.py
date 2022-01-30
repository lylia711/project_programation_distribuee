# from django.http import request
# from django.shortcuts import render
# from itsdangerous import serializer
from rest_framework import views
from sqlalchemy import delete
from .serializers import WeatherNowSerializer
from .models import WeatherNow
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

# Create your views here.
class WeatherViewSet(views.APIView):
    # queryset = WeatherNow.objects.all().order_by('city')
    # serializer_class = WeatherNowSerializer
    def get(self, request, format=None):
        if request.method == 'GET':
            weather_nows = WeatherNow.objects.all().order_by('city')
            serializer = WeatherNowSerializer(weather_nows, many=True)
            return Response(serializer.data)

    def post(self, request, format=None):
        serializer = WeatherNowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def delete(self, request, format=None):
    #     if request.method == 'DELETE':

        # snippet = self.get_object(pk)
        # snippet.delete()
        # return Response(status=status.HTTP_204_NO_CONTENT)

# class WeatherViewSetDetail(views.APIView):
#     def get_object(self, pk):
#         try:
#             print(pk)
#             return WeatherNow.objects.get(pk=pk)
#         except WeatherNow.DoesNotExist:
#             raise Http404

#     def get(self, request, pk, format=None):
#         weather_now = self.get_object(pk)
#         serializer = WeatherNowSerializer(weather_now)
#         print('get')
#         return Response(serializer.data)

#     def put(self, request, pk, format=None):
#         weather_now = self.get_object(pk)
#         serializer = WeatherNowSerializer(weather_now, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#             print('put')
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk, format=None):
#         weather_now = self.get_object(pk)
#         weather_now.delete()
#         print('deleted')
#         return Response(status=status.HTTP_204_NO_CONTENT)

class WeatherViewSetDetail(views.APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return WeatherNow.objects.get(pk=pk)
        except WeatherNow.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = WeatherNowSerializer(snippet)
        print('ggg')
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = WeatherNowSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        print('xxx')
        return Response(status=status.HTTP_204_NO_CONTENT)