from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from friendsgroup import views

router = DefaultRouter()
router.register(r'friendsgroup', views.FriendsGroup)

urlpatterns = [
    url(r'^friends/', include(router.urls)),
]