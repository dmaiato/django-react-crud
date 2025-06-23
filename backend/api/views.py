from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer

@api_view(['GET'])
def get_books(request):
  books = Book.objects.all()
  serialized_data = BookSerializer(books, many=True).data
  return Response(serialized_data)

@api_view(['POST'])
def create_book(request):
  data = request.data
  serializer = BookSerializer(data=data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_book(request, pk):
  try:
    book = Book.objects.get(pk=pk)
  except Book.DoesNotExist:
    return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
  
  book.delete()
  return Response(status=status.HTTP_204_NO_CONTENT)