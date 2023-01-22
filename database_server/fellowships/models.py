from django.db import models
from users.models import User



class Fellowship(models.Model):
    users = models.ManyToManyField(User, related_name='fellowships')
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title