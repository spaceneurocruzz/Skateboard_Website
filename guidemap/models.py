from django.contrib.postgres.fields import JSONField
from django.db import models
from .enums import LocationType
import datetime

class GuideMap(models.Model):
    location_id = models.AutoField(primary_key=True)
    location_name = models.CharField(blank=True, max_length=120)
    location_type = models.CharField(
      max_length=50,
      choices=[(tag, tag.value) for tag in LocationType]
    )
    latitude = models.DecimalField(max_digits=11, decimal_places=7)
    longitude = models.DecimalField(max_digits=11, decimal_places=7)
    address = models.CharField(blank=True, max_length=200)
    traffic = models.CharField(blank=True, max_length=200)
    intro = models.CharField(blank=True, max_length=200)
    openhours = JSONField()
    phone = models.CharField(max_length=20, null=True)
    rating = models.DecimalField(default=0, max_digits=4, decimal_places=1)
    create_dt = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    update_dt = models.DateTimeField(auto_now=True, blank=True, null=True)
    modified_user = models.CharField(blank=True, max_length=120)

    def __unicode__(self):
        return self.location_name

class GuideMapComments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    map_id = models.ForeignKey(GuideMap, related_name='guidemaps', on_delete=models.CASCADE)
    commentTitle = models.CharField(blank=True, max_length=50)
    comment = models.CharField(blank=True, max_length=500)
    rating = models.DecimalField(default=0, max_digits=4, decimal_places=1)
    username = models.CharField(blank=True, max_length=120)
    create_dt = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    update_dt = models.DateTimeField(auto_now=True, blank=True, null=True)

    def __unicode__(self):
        return self.comment