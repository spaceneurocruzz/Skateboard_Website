from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import GuideMap
from .models import GuideMapComments


class GuideMapSerializer(serializers.ModelSerializer):
    location_name = serializers.CharField(max_length=120)
    location_type = serializers.CharField(max_length=50)
    latitude = serializers.DecimalField(max_digits=11, decimal_places=7)
    longitude = serializers.DecimalField(max_digits=11, decimal_places=7)
    address = serializers.CharField(max_length=200)
    traffic = serializers.CharField(max_length=200)
    intro = serializers.CharField(max_length=200)
    openhours = serializers.JSONField()
    phone = serializers.CharField(max_length=20)
    # rating = serializers.PositiveSmallIntegerField()
    modified_user = serializers.CharField(max_length=120)
    create_dt = serializers.DateTimeField()
    update_dt = serializers.DateTimeField()

    class Meta:
        model = GuideMap
        fields = ('location_id',
                  'location_name',
                  'location_type',
                  'latitude',
                  'longitude',
                  'address',
                  'traffic',
                  "intro",
                  'openhours',
                  'phone',
                  'rating',
                  'create_dt',
                  'update_dt',
                  'modified_user',
                  )

    # def create(self, validated_data):
    #     return GuideMap.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance


class GuideMapCommentsSerializer(serializers.ModelSerializer):
    map_id = serializers.PrimaryKeyRelatedField(queryset=GuideMap.objects.all())
    commentTitle = serializers.CharField(max_length=50)
    comment = serializers.CharField(max_length=500)
    username = serializers.CharField(max_length=120)
    create_dt = serializers.DateTimeField()
    update_dt = serializers.DateTimeField()

    class Meta:
        model = GuideMapComments
        fields = ('map_id',
                  'commentTitle',
                  'comment',
                  'rating',
                  'username',
                  'create_dt',
                  'update_dt',
                  )

    # def create(self, validated_data):
    #     return GuideMapComments.objects.create(**validated_data)

    # def update(self, instance, validated_data):
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance
