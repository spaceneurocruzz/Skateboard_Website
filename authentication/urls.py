from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import CustomTokenObtainPairView, CustomUserGet, CustomUserCreate, CustomUserUpdate, LogoutAndBlacklistRefreshTokenForUserView, UserList
from django.conf.urls import url
# from authentication.views import GoogleLogin

urlpatterns = [
    path('user/get/username=<str:username>', CustomUserGet.as_view(), name="get_user"),
    path('user/', UserList.as_view(), name="get_userList"),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/update/username=<str:username>', CustomUserUpdate.as_view(), name="update_user"),
    path('token/obtain/', CustomTokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    # url('', include('social_django.urls', namespace='social')),
    # path('token/obtainGoogle/', GoogleLogin.as_view()),
]