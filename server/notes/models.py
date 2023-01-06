from django.db import models
from purchases.models import Purchase



class Note(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.content