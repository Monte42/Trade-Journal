from django.db import models
from users.models import User
import random



class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_number = models.IntegerField()
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Account: {self.account_number}"
    

    def genAccountNumber():
        generated_number = f"636{random.randint(10,99)}{random.randint(10,99)}{random.randint(0,9)}"
        return  int(generated_number)