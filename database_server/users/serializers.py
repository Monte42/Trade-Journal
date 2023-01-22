from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id','first_name','last_name','email','username','user_image_url',
            'password','created_at','updated_at' 
            ]