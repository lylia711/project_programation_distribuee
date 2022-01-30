from posixpath import basename
from django.template import base
from django.urls import include, path
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register(r'now', views.WeatherViewSet, basename='now')


urlpatterns = [
    path('test/', views.WeatherViewSet.as_view()),
    path('test/<int:pk>/', views.WeatherViewSetDetail.as_view()),
]