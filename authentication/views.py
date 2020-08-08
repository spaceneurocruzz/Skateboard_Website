from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
# from authentication.serializers import SocialLoginSerializer
from rest_framework.generics import UpdateAPIView
from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer
from .models import CustomUser


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, username):
        usernameList = self.request.query_params.get('username', None)
        if usernameList is not None:
            usernames = [str(x) for x in usernameList.split(',')]
            users = CustomUser.objects.filter(username__in=usernames)
            serializer = CustomUserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            users = CustomUser.objects.all()
            serializer = CustomUserSerializer(users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class CustomUserGet(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, username):
        return CustomUser.objects.get(username=username)

    def get(self, request, username, format='json'):
        user = self.get_object(username)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserUpdate(generics.UpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    parser_classes = (JSONParser, MultiPartParser, FormParser)
    queryset = CustomUser.objects.all()

    def get_object(self, username):
        return CustomUser.objects.get(username=username)

    def patch(self, request, username, format='json'):
        user = self.get_object(username)

        serializer = CustomUserSerializer(
            user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def patch(self, request, format='json'):
    #     serializer = CustomUserSerializer(self, data=request.data, partial=True)
    #     lookup_field = 'username'
    #     if serializer.is_valid():
    #         user = serializer.save()
    #         if user:
    #             json = serializer.data
    #             return Response(json, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

# class GoogleLogin(TokenObtainPairView):
#     permission_classes = (permissions.AllowAny, ) # AllowAny for login
#     serializer_class = SocialLoginSerializer

#     def post(self, request):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             user = serializer.save()
#             return Response(get_tokens_for_user(user))
#         else:
#             raise ValueError('Not serializable')
