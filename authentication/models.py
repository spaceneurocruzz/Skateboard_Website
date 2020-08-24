from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.contrib.auth.models import User

class CustomUser(AbstractUser):
    location = models.CharField(blank=True, max_length=120)
    nickname = models.CharField(blank=True, max_length=120)
    intro = models.CharField(blank=True, max_length=800)
    avatar = models.ImageField(upload_to='avatar', default="avatar/default.png")
    map_like = ArrayField(models.IntegerField(blank=True, null=True), null=True)
    map_add = ArrayField(models.IntegerField(blank=True, null=True), null=True)
    map_comment = ArrayField(models.IntegerField(blank=True, null=True), null=True)
    group_create = ArrayField(models.IntegerField(blank=True, null=True), null=True)
    group_join = ArrayField(models.IntegerField(blank=True, null=True), null=True)
    group_like = ArrayField(models.IntegerField(blank=True, null=True), null=True)
    # activity_like = ArrayField(models.IntegerField(blank=True))
    # activity_add = ArrayField(models.IntegerField(blank=True))
    # article_like = ArrayField(models.IntegerField(blank=True))
    # article_add = ArrayField(models.IntegerField(blank=True))
    
# class SocialAccount(models.Model):
#     provider = models.CharField(max_length=200, default='google')
#     user = models.ForeignKey(
#         User, related_name='social', on_delete=models.CASCADE)