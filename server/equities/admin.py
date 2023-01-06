from django.contrib import admin
from equities.models import Equity

# Register your models here.

class EquityAdmin(admin.ModelAdmin):
    fields = ('portfolio','purchase','symbol','sector','buy_price','quantity','last_updated_price','price_difference')
    list_display = ['portfolio','purchase','symbol','buy_price','quantity','last_updated_price']
    search_fields = ['portfolio','purchase','symbol']
    ordering = [
        'portfolio','purchase','symbol','buy_price','quantity','last_updated_price',
        '-portfolio','-purchase','-symbol','-buy_price','-quantity','-last_updated_price'
    ]

admin.site.register(Equity,EquityAdmin)