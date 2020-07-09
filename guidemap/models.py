from django.contrib.postgres.fields import JSONField
from django.db import models
from .enums import LocationType

class GuideMap(models.Model):
    location_id = models.AutoField(primary_key=True)
    location_name = models.CharField(blank=True, max_length=120)
    location_type = models.CharField(
      max_length=50,
      choices=[(tag, tag.value) for tag in LocationType]
    )
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    address = models.CharField(blank=True, max_length=200)
    traffic = models.CharField(blank=True, max_length=200)
    openhours = JSONField()
    phone = models.CharField(max_length=20, null=True)
    rating = models.PositiveSmallIntegerField(default=0)
    create_dt = models.DateTimeField(auto_now_add=True)
    update_dt = models.DateTimeField(auto_now=True)
    modified_user = models.CharField(blank=True, max_length=120)

    def __unicode__(self):
        return self.location_name

class GuideMapComments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    map_id = models.ForeignKey(GuideMap, related_name='guidemaps', on_delete=models.CASCADE)
    comment = models.CharField(blank=True, max_length=500)
    username = models.CharField(blank=True, max_length=120)
    create_dt = models.DateTimeField(auto_now_add=True)
    update_dt = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.comment