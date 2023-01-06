from django.contrib import admin
from .models import Purchase

# Register your models here.

class PurchaseAdmin(admin.ModelAdmin):
    fields = (
        'portfolio',
        'symbol',
        'quantity',
        'share_buy_price',
        'total_buy_price',
        'is_sold',
        'share_sell_price',
        'total_sell_price',
        'profit_loss'
    )
    list_display = [
        'portfolio',
        'symbol',
        'quantity',
        'is_sold',
        'share_buy_price',
        'total_buy_price',
        'share_sell_price',
        'total_sell_price',
        'profit_loss'
    ]
    search_fields = ['portfolio','symbol']
    ordering = [
        'portfolio',
        'symbol',
        'quantity',
        'share_buy_price',
        'total_buy_price',
        'share_sell_price',
        'total_sell_price',
        'profit_loss',
        '-portfolio',
        '-symbol',
        '-quantity',
        '-share_buy_price',
        '-total_buy_price',
        '-share_sell_price',
        '-total_sell_price',
        '-profit_loss'
    ]

admin.site.register(Purchase, PurchaseAdmin)