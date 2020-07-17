from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions, generics, viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import FriendsGroupSerializer
from .models import FriendsGroup
from .models import GuideMapComments
from rest_framework.permissions import IsAuthenticated

class GuideMapViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = FriendsGroup.objects.all()
    serializer_class = FriendsGroupSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ['map_id', 'modified_user']