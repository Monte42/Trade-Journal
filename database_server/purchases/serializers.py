from rest_framework import serializers
from .models import Purchase

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Purchase
        fields = [
            'id',
            'portfolio',
            'symbol',
            'quantity',
            'share_buy_price',
            'total_buy_price',
            'is_sold',
            'share_sell_price',
            'total_sell_price',
            'profit_loss',
            'created_at',
            'updated_at'
        ]