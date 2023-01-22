from django.contrib import admin
from .models import Fellowship

# Register your models here.

class FellowshipAdmin(admin.ModelAdmin):
    fields = ('title','description','users')
    list_display = ['title','description','created_at','updated_at']
    search_fields = ['title','description','created_at']
    ordering = [
        'title','description',
        '-title','-description'
    ]

admin.site.register(Fellowship,FellowshipAdmin)