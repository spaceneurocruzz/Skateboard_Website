from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import User

class CustomUser(AbstractUser):
    location = models.CharField(blank=True, max_length=120)
    nickname = models.CharField(blank=True, max_length=120)
    intro = models.CharField(blank=True, max_length=800)
    avatar = models.ImageField(upload_to='avatar', default='default.jpg')

# class SocialAccount(models.Model):
#     provider = models.CharField(max_length=200, default='google')
#     user = models.ForeignKey(
#         User, related_name='social', on_delete=models.CASCADE)