from rest_framework import serializers
from .models import FriendsGroup
from .models import GuideMap

class FriendsGroupSerializer(serializers.ModelSerializer):
    map_id = serializers.PrimaryKeyRelatedField(
        queryset=GuideMap.objects.all())
    group_dt = serializers.DateTimeField()
    location_name = serializers.CharField(max_length=120)
    latitude = serializers.DecimalField(max_digits=11, decimal_places=7)
    longitude = serializers.DecimalField(max_digits=11, decimal_places=7)
    address = serializers.CharField(max_length=200)
    group_type = serializers.CharField(max_length=50)
    group_title = serializers.CharField(max_length=50)
    group_content = serializers.CharField(max_length=500)
    create_dt = serializers.DateTimeField()
    update_dt = serializers.DateTimeField()
    create_user = serializers.CharField(max_length=120)
    join_user = serializers.CharField(max_length=120)
    possible_user = serializers.CharField(max_length=120)

    class Meta:
        model = FriendsGroup
        fields = ('group_id',
                  'map_id',
                  'group_dt',
                  'location_name',
                  'latitude',
                  'longitude',
                  'address',
                  'group_type',
                  "group_title",
                  'group_content',
                  'create_dt',
                  'update_dt',
                  'create_user',
                  'join_user',
                  'possible_user',
                  'lower_limit',
                  'upper_limit'
                  )