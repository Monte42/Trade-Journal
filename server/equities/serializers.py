from rest_framework import serializers
from .models import Equity

class EquitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Equity
        fields = ['id','portfolio','purchase','symbol','sector','buy_price','quantity','last_updated_price','price_difference','created_at','updated_at']