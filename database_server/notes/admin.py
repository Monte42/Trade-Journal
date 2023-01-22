from django.contrib import admin
from .models import Note

# Register your models here.

class NoteAdmin(admin.ModelAdmin):
    fields = ('content','purchase')
    list_display = ['content','purchase','created_at','updated_at']
    search_fields = ['content']
    ordering = [
        'content','created_at','updated_at',
        '-created_at','-updated_at', 'purchase'
    ]

admin.site.register(Note, NoteAdmin)