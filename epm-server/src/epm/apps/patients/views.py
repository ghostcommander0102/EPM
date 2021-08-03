from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from .serializers import *


# class ProfileTempViewSet(ModelViewSet):
#     queryset = ProfileTemp.objects.all()
#     serializer_class = ProfileTempSerializer
#     permission_classes = (AllowAny,)

#     def create(self, request, *args, **kwargs):
#         profile_temp_data = request.data.get("profile")
#         information_temp_data = request.data.get("information")
#         consent_form_temp_data = request.data.get("consent_form")

#         profile_temp_serializer = ProfileTempSerializer(data=profile_temp_data)
#         profile_temp_serializer.is_valid(raise_exception=True)
#         profile_temp_obj = profile_temp_serializer.save()

#         information_temp_obj = InformationTemp.objects.get(
#             profile_temp=profile_temp_obj)
#         information_temp_serializer = InformationTempSerializer(
#             instance=information_temp_obj, data=information_temp_data, partial=True
#         )
#         information_temp_serializer.is_valid(raise_exception=True)
#         information_temp_serializer.save()

#         #  PDF file save
#         file_path = ''
#         consent_form_temp_data['document_file'] = file_path

#         content_form_temp_obj = ConsentFormTemp.objects.get(
#             profile_temp=profile_temp_obj)
#         content_form_temp_serializer = ContentFormTempSerializer(
#             instance=content_form_temp_obj, data=consent_form_temp_data, partial=True
#         )
#         content_form_temp_serializer.is_valid(raise_exception=True)
#         content_form_temp_serializer.save()

#         data = {
#             'success': True
#         }

#         return Response(data=data)

#     def list(self, request, *args, **kwargs):
#         print(111)
#         items = []
#         for profile_temp in self.get_queryset():
#             profile_temp_obj = get_object_or_404(
#                 ProfileTemp, id=profile_temp.id)
#             information_temp_obj = get_object_or_404(
#                 InformationTemp, profile_temp=profile_temp)
#             consent_form_temp_obj = get_object_or_404(
#                 ConsentFormTemp, profile_temp=profile_temp)
#             profile_temp_serializer = ProfileTempSerializer(
#                 instance=profile_temp_obj)
#             information_temp_serializer = InformationTempSerializer(
#                 instance=information_temp_obj)
#             consent_form_temp_serializer = ContentFormTempSerializer(
#                 instance=consent_form_temp_obj)
#             item = {
#                 'profile': profile_temp_serializer.data,
#                 'information': information_temp_serializer.data,
#                 'consent_form': consent_form_temp_serializer.data
#             }

#             items.append(item)

#         data = {
#             'total_count': len(items),
#             'items': items
#         }

#         return Response(data)

#     def post(self, request, *args, **kwargs):
#         items = []
#         for profile_temp in self.get_queryset():
#             profile_temp_obj = get_object_or_404(
#                 ProfileTemp, id=profile_temp.id)
#             information_temp_obj = get_object_or_404(
#                 InformationTemp, profile_temp=profile_temp)
#             consent_form_temp_obj = get_object_or_404(
#                 ConsentFormTemp, profile_temp=profile_temp)
#             profile_temp_serializer = ProfileTempSerializer(
#                 instance=profile_temp_obj)
#             information_temp_serializer = InformationTempSerializer(
#                 instance=information_temp_obj)
#             consent_form_temp_serializer = ContentFormTempSerializer(
#                 instance=consent_form_temp_obj)
#             item = {
#                 'profile': profile_temp_serializer.data,
#                 'information': information_temp_serializer.data,
#                 'consent_form': consent_form_temp_serializer.data
#             }

#             items.append(item)

#         data = {
#             'total_count': len(items),
#             'items': items
#         }
#         return Response(data)

#     def retrieve(self, request, *args, **kwargs):
#         print(123)
#         profile_temp_obj = self.get_object()
#         information_temp_obj = get_object_or_404(
#             InformationTemp, profile_temp=profile_temp_obj)
#         consent_form_temp_obj = get_object_or_404(
#             ConsentFormTemp, profile_temp=profile_temp_obj)
#         profile_serializer = ProfileTempSerializer(instance=profile_temp_obj)
#         information_serializer = InformationTempSerializer(
#             instance=information_temp_obj)
#         consent_form_serializer = ContentFormTempSerializer(
#             instance=consent_form_temp_obj)

#         data = {
#             'profile': profile_serializer.data,
#             'information': information_serializer.data,
#             'consent_form': consent_form_serializer.data
#         }

#         return Response(data)

#     def get_queryset(self):
#         id = self.request.query_params.get('id', None)
#         print(id)
#         profile_temp_obj = self.get_object().filter(id=id)
#         information_temp_obj = get_object_or_404(
#             InformationTemp, profile_temp=profile_temp_obj)
#         consent_form_temp_obj = get_object_or_404(
#             ConsentFormTemp, profile_temp=profile_temp_obj)
#         profile_serializer = ProfileTempSerializer(instance=profile_temp_obj)
#         information_serializer = InformationTempSerializer(
#             instance=information_temp_obj)
#         consent_form_serializer = ContentFormTempSerializer(
#             instance=consent_form_temp_obj)

#         data = {
#             'profile': profile_serializer.data,
#             'information': information_serializer.data,
#             'consent_form': consent_form_serializer.data
#         }
#         return Postcode.objects.filter(postcode__in=postcodes)

#     def partial_update(self, request, *args, **kwargs):
#         profile_temp_data = request.data.get("profile")
#         information_temp_data = request.data.get("information")
#         consent_form_temp_data = request.data.get("consent_form")

#         profile_temp_obj = self.get_object()
#         profile_temp_serializer = ProfileTempSerializer(
#             instance=profile_temp_obj, data=profile_temp_data, partial=True)
#         profile_temp_serializer.is_valid(raise_exception=True)
#         profile_temp_serializer.save()

#         information_temp_obj = InformationTemp.objects.get(
#             profile_temp=profile_temp_obj)
#         information_temp_serializer = InformationTempSerializer(
#             instance=information_temp_obj, data=information_temp_data, partial=True
#         )
#         information_temp_serializer.is_valid(raise_exception=True)
#         information_temp_serializer.save()

#         content_form_temp_obj = ConsentFormTemp.objects.get(
#             profile_temp=profile_temp_obj)
#         content_form_temp_serializer = ContentFormTempSerializer(
#             instance=content_form_temp_obj, data=consent_form_temp_data, partial=True
#         )
#         content_form_temp_serializer.is_valid(raise_exception=True)
#         content_form_temp_serializer.save()

#         res_data = {
#             "success": True,
#             "data": {
#                 "profile": profile_temp_serializer.data,
#                 "information": information_temp_serializer.data,
#                 "consent_form": content_form_temp_serializer.data
#             }
#         }

#         return Response(data=res_data)


class ProfileTempViewSet(APIView):
    queryset = ProfileTemp.objects.all()
    serializer_class = ProfileTempSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        profile_temp_data = request.data.get("profile")
        information_temp_data = request.data.get("information")
        consent_form_temp_data = request.data.get("consent_form")

        profile_temp_serializer = ProfileTempSerializer(data=profile_temp_data)
        profile_temp_serializer.is_valid(raise_exception=True)
        profile_temp_obj = profile_temp_serializer.save()

        information_temp_obj = InformationTemp.objects.get(
            profile_temp=profile_temp_obj)
        information_temp_serializer = InformationTempSerializer(
            instance=information_temp_obj, data=information_temp_data, partial=True
        )
        information_temp_serializer.is_valid(raise_exception=True)
        information_temp_serializer.save()

        #  PDF file save
        file_path = ''
        consent_form_temp_data['document_file'] = file_path

        content_form_temp_obj = ConsentFormTemp.objects.get(
            profile_temp=profile_temp_obj)
        content_form_temp_serializer = ContentFormTempSerializer(
            instance=content_form_temp_obj, data=consent_form_temp_data, partial=True
        )
        content_form_temp_serializer.is_valid(raise_exception=True)
        content_form_temp_serializer.save()

        data = {
            'success': True
        }

        return Response(data=data)

    def put(self, request):
        id = request.data.get('id', None)
        profile_temp_obj = get_object_or_404(
            ProfileTemp, id=id)

        information_temp_obj = get_object_or_404(
            InformationTemp, profile_temp=profile_temp_obj)
        consent_form_temp_obj = get_object_or_404(
            ConsentFormTemp, profile_temp=profile_temp_obj)
        profile_serializer = ProfileTempSerializer(instance=profile_temp_obj)
        information_serializer = InformationTempSerializer(
            instance=information_temp_obj)
        consent_form_serializer = ContentFormTempSerializer(
            instance=consent_form_temp_obj)

        data = {
            'profile': profile_serializer.data,
            'information': information_serializer.data,
            'consent_form': consent_form_serializer.data
        }

        return Response(data)

    def get(self, request):
        id = request.data.get('id', None)
        items = []
        for profile_temp in ProfileTemp.objects.all():
            profile_temp_obj = get_object_or_404(
                ProfileTemp, id=profile_temp.id)
            information_temp_obj = get_object_or_404(
                InformationTemp, profile_temp=profile_temp)
            consent_form_temp_obj = get_object_or_404(
                ConsentFormTemp, profile_temp=profile_temp)
            profile_temp_serializer = ProfileTempSerializer(
                instance=profile_temp_obj)
            information_temp_serializer = InformationTempSerializer(
                instance=information_temp_obj)
            consent_form_temp_serializer = ContentFormTempSerializer(
                instance=consent_form_temp_obj)
            item = {
                'profile': profile_temp_serializer.data,
                'information': information_temp_serializer.data,
                'consent_form': consent_form_temp_serializer.data
            }

            items.append(item)

        data = {
            'total_count': len(items),
            'items': items
        }

        return Response(data)


class ProfileViewSet(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):
        items = []
        for profile in self.get_queryset():
            profile_obj = get_object_or_404(Profile, id=profile.id)
            information_obj = get_object_or_404(Information, profile=profile)
            consent_form_obj = get_object_or_404(ConsentForm, profile=profile)
            profile_serializer = ProfileSerializer(instance=profile_obj)
            information_serializer = InformationSerializer(
                instance=information_obj)
            consent_form_serializer = ContentFormSerializer(
                instance=consent_form_obj)

            item = {
                'profile': profile_serializer.data,
                'information': information_serializer.data,
                'consent_form': consent_form_serializer.data
            }

            items.append(item)

        data = {
            'total_count': len(items),
            'items': items
        }

        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        profile_obj = self.get_object()
        information_obj = get_object_or_404(Information, profile=profile_obj)
        consent_form_obj = get_object_or_404(ConsentForm, profile=profile_obj)
        profile_serializer = ProfileSerializer(instance=profile_obj)
        information_serializer = InformationSerializer(
            instance=information_obj)
        consent_form_serializer = ContentFormSerializer(
            instance=consent_form_obj)

        data = {
            'profile': profile_serializer.data,
            'information': information_serializer.data,
            'consent_form': consent_form_serializer.data
        }

        return Response(data)

    def create(self, request, *args, **kwargs):
        profile_data = request.data.get("profile")
        information_data = request.data.get("information")
        consent_form_temp_data = request.data.get("consent_form")

        profile_serializer = ProfileSerializer(data=profile_data)
        profile_serializer.is_valid(raise_exception=True)
        profile_obj = profile_serializer.save()

        information_obj = Information.objects.get(profile=profile_obj)
        information_serializer = InformationSerializer(
            instance=information_obj, data=information_data, partial=True
        )
        information_serializer.is_valid(raise_exception=True)
        information_serializer.save()

        content_form_obj = ConsentForm.objects.get(profile=profile_obj)
        content_form_serializer = ContentFormSerializer(
            instance=content_form_obj, data=consent_form_temp_data, partial=True
        )
        content_form_serializer.is_valid(raise_exception=True)
        content_form_serializer.save()

        data = {
            'success': True
        }

        return Response(data=data)
