from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions, generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.generics import UpdateAPIView
from .serializers import GuideMapSerializer, GuideMapCommentsSerializer
from .models import GuideMap
from .models import GuideMapComments
from rest_framework.permissions import IsAuthenticated

class GuideMapViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = GuideMap.objects.all()
    serializer_class = GuideMapSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['location_type', 'modified_user']

class GuideMapCommentsViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = GuideMapComments.objects.all()
    serializer_class = GuideMapCommentsSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['map_id', 'username']

# class GuideMapGet(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()
#     parser_classes = (MultiPartParser, FormParser)

#     def get_object(self, username):
#         return GuideMap.objects.get(username=username)

#     def get(self, request, username, format='json'):
#         user = self.get_object(username)
#         serializer = GuideMapSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)


# class GuideMapCreate(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()

#     def post(self, request, format='json'):
#         serializer = CustomUserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if user:
#                 json = serializer.data
#                 return Response(json, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GuideMapUpdate(generics.UpdateAPIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = ()
#     parser_classes = (MultiPartParser, FormParser)
#     queryset = CustomUser.objects.all()

#     def get_object(self, username):
#         return CustomUser.objects.get(username=username)

#     def patch(self, request, username, format='json'):
#         user = self.get_object(username)

#         serializer = CustomUserSerializer(
#             user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
