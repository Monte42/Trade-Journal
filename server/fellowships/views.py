from .models import Fellowship
from .serializers import FellowshipSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def add_or_get_fellowships(request, format=None):
    fellowships = Fellowship.objects.all()
    if request.method == 'GET':
        serializer = FellowshipSerializer(fellowships, many=True)
        return Response(serializer.data)
    serializer = FellowshipSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def get_edit_delete_fellowship_by_id(request, id,  format=None):
    try:
        fellowship = Fellowship.objects.get(pk=id)
    except Fellowship.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = FellowshipSerializer(fellowship, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        fellowship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = FellowshipSerializer(note)
    return Response(serializer.data)

