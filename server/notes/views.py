from .models import Note
from .serializers import NoteSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def add_or_get_notes(request, format=None):
    notes = Note.objects.all()
    if request.method == 'GET':
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    errors = validate_form(request.data)
    if bool(errors): return Response(errors, status.HTTP_400_BAD_REQUEST)
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def get_add_delete_note_by_id(request, id,  format=None):
    try:
        note = Note.objects.get(pk=id)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    serializer = NoteSerializer(note)
    return Response(serializer.data)

@api_view(['GET'])
def get_note_by_purcahse_id(request,id,format=None):
    notes = Note.objects.filter(purchase=id)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

def validate_form(formData):
    if len(formData['content'])<5: return {'content': 'Notes should be at least 5 character'}