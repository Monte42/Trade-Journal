from django.urls import path
from portfolios import views

urlpatterns = [
    path('portfolios', views.get_or_add_portfolio_list),
    path('portfolios/<int:id>', views.get_edit_delete_portfolio_by_id),
    path('portfolios/user/<int:id>', views.get_portfolio_buy_user_id)
]