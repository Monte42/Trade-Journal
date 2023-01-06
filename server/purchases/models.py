from django.db import models
from portfolios.models import Portfolio

# models.DecimalField(max_digits=12, decimal_places=2)

class Purchase(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)
    quantity = models.IntegerField()
    share_buy_price = models.IntegerField()
    total_buy_price = models.IntegerField()
    is_sold = models.BooleanField(default=False)
    share_sell_price = models.IntegerField(blank=True, null=True)
    total_sell_price = models.IntegerField(blank=True, null=True)
    profit_loss = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.symbol} ({self.quantity})"

    def set_p_n_l(self):
        self.profit_loss = self.total_sell_price - self.total_buy_price