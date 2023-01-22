from django.contrib import admin
from .models import User

# Register your models here.

class UserAdmin(admin.ModelAdmin):
    fields = ('first_name','last_name','email','username','user_image_url','password')
    list_display = ['first_name','last_name','email','username','password']
    search_fields = ['first_name','last_name','email','username']
    ordering = [
        'first_name','last_name','email','username',
        '-first_name','-last_name','-email','-username'
    ]

admin.site.register(User, UserAdmin)