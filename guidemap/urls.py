from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
# from .views import CustomTokenObtainPairView, CustomUserGet, CustomUserCreate, CustomUserUpdate, LogoutAndBlacklistRefreshTokenForUserView
from django.conf.urls import url, include
# from authentication.views import GoogleLogin
from rest_framework.routers import DefaultRouter
from guidemap import views

router = DefaultRouter()
router.register(r'guideMap', views.GuideMapViewSet)
router.register(r'guideMapComments', views.GuideMapCommentsViewSet)

urlpatterns = [
    url(r'^map/', include(router.urls)),
    # url(r'^guideMapComments/', include(router.urls))
]