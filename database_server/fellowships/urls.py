from django.urls import path
from fellowships import views

urlpatterns = [
    path('fellowships', views.add_or_get_fellowships),
    path('fellowships/<int:id>', views.get_edit_delete_fellowship_by_id),
]