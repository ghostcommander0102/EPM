from rest_framework.serializers import ModelSerializer

from .models import *


class ProfileTempSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ProfileTemp


class InformationTempSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = InformationTemp


class ContentFormTempSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ConsentFormTemp


class ProfileSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Profile


class InformationSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Information


class ContentFormSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = ConsentForm
