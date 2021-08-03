from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import *

router = DefaultRouter()
# router.register('temp/profiles', ProfileTempViewSet, basename='temp_profiles')
router.register('profiles', ProfileViewSet, basename='profiles')

urlpatterns = [
    path('temp/profiles/', ProfileTempViewSet.as_view(), name='temp_profiles'),
]

urlpatterns += router.urls
