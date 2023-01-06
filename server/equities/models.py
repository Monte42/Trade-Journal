from django.db import models
from portfolios.models import Portfolio
from purchases.models import Purchase
# Create your models here.

SECTORS = [
    ('Energy','Energy'),
    ('Materials','Materials'),
    ('Industrials','Industrials'),
    ('Consumer Discretionary','Consumer Discretionary'),
    ('Consumer Staples','Consumer Staples'),
    ('Health Care','Health Care'),
    ('Financials','Financials'),
    ('Information Technology','Information Technology'),
    ('Telecommunication Services','Telecommunication Services'),
    ('Utilities','Utilities'),
    ('Real Estate','Real Estate'),
]

class Equity(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    sector = models.CharField(max_length=50,choices=SECTORS,default='Energy')
    buy_price = models.IntegerField()
    quantity = models.IntegerField()
    last_updated_price = models.IntegerField()
    price_difference = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.symbol
