from django.urls import path
from .views import get_books, create_book, delete_book

urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/create/', create_book, name='create_book'),
    path('books/delete/<int:pk>', delete_book, name='delete_book'),
]
 