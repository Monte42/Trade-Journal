from django.db import models




class User(models.Model):
    first_name = models.CharField(max_length=100, blank=False,null=False)
    last_name = models.CharField(max_length=100, blank=False,null=False)
    username = models.CharField(max_length=100, blank=False,null=False, unique=True)
    email = models.EmailField(max_length=200, blank=False,null=False, unique=True)
    password = models.CharField(max_length=250, blank=False,null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f'{self.first_name} {self.last_name}'