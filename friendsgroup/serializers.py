from rest_framework import serializers
from .models import FriendsGroup, FriendsGroupComments, GuideMap

class FriendsGroupSerializer(serializers.ModelSerializer):
    group_id = serializers.CharField(max_length=50)
    map_id = serializers.PrimaryKeyRelatedField(
        queryset=GuideMap.objects.all())
    group_startdt = serializers.DateTimeField()
    group_enddt = serializers.DateTimeField()
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
    join_user = serializers.ListField(child=serializers.CharField())
    possible_user = serializers.ListField(child=serializers.CharField())

    class Meta:
        model = FriendsGroup
        fields = ('group_id',
                  'map_id',
                  'group_startdt',
                  'group_enddt',
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

    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance

class FriendsGroupCommentsSerializer(serializers.ModelSerializer):
    group_id = serializers.PrimaryKeyRelatedField(
        queryset=FriendsGroup.objects.all())
    comment = serializers.CharField(max_length=500)
    comment_user = serializers.CharField(max_length=120)
    create_dt = serializers.DateTimeField()
    update_dt = serializers.DateTimeField()

    class Meta:
        model = FriendsGroupComments
        fields = ('comment_id',
                  'group_id',
                  'comment',
                  'comment_user',
                  'create_dt',
                  'update_dt',
                  )

    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance