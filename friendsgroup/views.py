from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions, generics, viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FriendsGroupSerializer, FriendsGroupCommentsSerializer
from .models import FriendsGroup, FriendsGroupComments
from rest_framework.permissions import IsAuthenticated


class FriendsGroupViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = FriendsGroup.objects.all()
    serializer_class = FriendsGroupSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['map_id', 'create_user', 'group_id']

    # def get_object(self, groupId):
    #     return FriendsGroup.objects.filter(group_id=groupId)

    # def patch(self, request, groupId):
    #     instance = self.get_object(groupId)
    #     if not instance:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
    #     serializer = self.get_serializer(instance,
    #                                      data=request.data,
    #                                      partial=True)
    #     if not serializer.is_valid():
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #     serializer.save()
    #     return Response(serializer.data, status=status.HTTP_200_OK)


class FriendsGroupCommentsViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = FriendsGroupComments.objects.all()
    serializer_class = FriendsGroupCommentsSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['group_id', 'comment_user']

    def get_object(self, groupId):
        return FriendsGroupComments.objects.get(group_id=groupId)

    def patch(self, request, groupId):
        instance = self.get_object(groupId)
        if not instance:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance,
                                         data=request.data,
                                         partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
