from django.db import models
from django.utils import timezone
from .enums import FriendsGroupType
from guidemap.models import GuideMap

class FriendsGroup(models.Model):
    group_id = models.AutoField(primary_key=True)
    map_id = models.ForeignKey(GuideMap, related_name='friendsgroup_maps', on_delete=models.CASCADE)
    group_startdt = models.DateTimeField(default=timezone.now)
    group_enddt = models.DateTimeField(default=timezone.now)
    location_name = models.CharField(blank=True, max_length=120)
    latitude = models.DecimalField(max_digits=11, decimal_places=7)
    longitude = models.DecimalField(max_digits=11, decimal_places=7)
    address = models.CharField(blank=True, max_length=200)
    group_type = models.CharField(
      max_length=50,
      choices=[(tag, tag.value) for tag in FriendsGroupType]
    )
    group_title = models.CharField(blank=True, max_length=50)
    group_content = models.CharField(blank=True, max_length=500)
    create_dt = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    update_dt = models.DateTimeField(auto_now=True, blank=True, null=True)
    create_user = models.CharField(blank=True, max_length=120)
    join_user = models.CharField(blank=True, max_length=120)
    possible_user = models.CharField(blank=True, max_length=120)
    lower_limit = models.PositiveIntegerField(default=0)
    uppper_limit = models.PositiveIntegerField(default=0)
    
    def __unicode__(self):
        return self.group_id