from django.urls import path
from purchases import views

urlpatterns = [
    path('purchases', views.add_or_get_purchases),
    path('purchases/<int:id>', views.get_edit_delete_purchase_by_id),
    path('purchases/portfolio/<int:id>', views.get_purchases_by_portfolio_id)
]
