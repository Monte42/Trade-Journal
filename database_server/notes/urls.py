from django.urls import path
from notes import views

urlpatterns = [
    path('notes', views.add_or_get_notes),
    path('notes/<int:id>', views.get_add_delete_note_by_id),
    path('notes/purchase/<int:id>', views.get_note_by_purcahse_id),
]
