from django.urls import path
from users import views

urlpatterns = [
    path('users', views.fetch_all_users),
    path('users/new', views.create_user),
    path('users/login', views.login),
    path('user/<str:username>', views.fetch_user_by_username),
    path('users/<int:id>', views.get_edit_delete_user_by_id),
]
