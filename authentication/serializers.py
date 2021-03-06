from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
# from google.oauth2 import id_token
# from google.auth.transport import requests
from .models import CustomUser

# from settings import SOCIAL_GOOGLE_CLIENT_ID
# from authentication.models import SocialAccount


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        return token


class CustomUserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=True)
    # username = serializers.CharField()
    # password = serializers.CharField(min_length=8, write_only=True)
    avatar = serializers.ImageField(max_length=None, use_url=True, required=False)
    map_create = serializers.ListField(required=False, allow_null=True)
    map_like = serializers.ListField(required=False, allow_null=True)
    group_create = serializers.ListField(required=False, allow_null=True)
    group_like = serializers.ListField(required=False, allow_null=True)
    group_join = serializers.ListField(required=False, allow_null=True)

    class Meta:
        model = CustomUser
        fields = ('id',
                  'email',
                  'username',
                  'password',
                  'last_login',
                  'location',
                  'intro',
                  'nickname',
                  'avatar',
                  "group_create",
                  "group_join",
                  "group_like",
                  "map_create",
                  "map_like",
                  "map_add",
                  "map_comment",
                #   "activity_like",
                #   "activity_add",
                #   "article_like",
                #   "article_add",
                  )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance

# class SocialLoginSerializer(serializers.Serializer):
#     token = serializers.CharField(required=True)

#     def verify_token(self, token):
#         try:
#             idinfo = id_token.verify_oauth2_token(
#                 token, requests.Request(), '150926167922-v60e6s4va6hqgbnaan1qia4tkqogbju6.apps.googleusercontent.com')
#             if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
#                 raise ValueError('Wrong issuer.')
#             if idinfo['aud'] not in ['150926167922-v60e6s4va6hqgbnaan1qia4tkqogbju6.apps.googleusercontent.com']:
#                 raise ValueError('Could not verify audience.')
#             return idinfo
#         except ValueError:
#             pass

#     def create(self, validated_data):
#         idinfo = self.verify_token(validated_data.get('token'))
#         if idinfo:
#             if not SocialAccount.objects.filter(unique_id=idinfo['sub']).exists():
#                 user = User.objects.create_user(
#                     username=f"{idinfo['name']} {idinfo['email']}", # Username has to be unique
#                     first_name=idinfo['given_name'],
#                     last_name=idinfo['family_name'],
#                     email=idinfo['email']
#                 )
#                 SocialAccount.objects.create(
#                     user=user,
#                     unique_id=idinfo['sub']
#                 )
#                 return user
#             else:
#                 social = SocialAccount.objects.get(unique_id=idinfo['sub'])
#                 return social.user
#         else:
#             raise ValueError("Incorrect Credentials")

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'first_name', 'last_name']
