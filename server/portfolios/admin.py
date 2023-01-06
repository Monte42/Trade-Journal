from django.contrib import admin
from .models import Portfolio

# Register your models here.

class PortfolioAdmin(admin.ModelAdmin):
    fields = ('user','account_number','balance')
    list_display = ['user','account_number','balance','created_at']
    search_fields = ['user','account_number','balance','created_at']
    ordering = [
            'user','account_number',
            '-user','-account_number'
        ]

admin.site.register(Portfolio, PortfolioAdmin)