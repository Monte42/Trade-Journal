from django.urls import path
from equities import views

urlpatterns = [
    path('equities', views.add_or_get_equities),
    path('equities/<int:id>', views.get_edit_delete_equity_by_id),
    path('equities/portfolio/<int:id>', views.get_equity_by_portfolio_id),
    path('equities/purchase/<int:id>', views.get_equity_by_purchase_id),
]
