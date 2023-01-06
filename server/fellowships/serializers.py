from rest_framework import serializers
from .models import Fellowship

class FellowshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fellowship
        fields = ['id','users','title','description','created_at','updated_at']