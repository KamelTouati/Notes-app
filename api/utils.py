from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


def getNotesList(request):
    notes = Note.objects.all().order_by('-updated')
    notes_ser = NoteSerializer(notes, many=True)
    return Response(notes_ser.data)

def createNote(request):
    data = request.data
    note = Note.objects.create(
        body = data['body']
    )
    noteSerializer = NoteSerializer(note, many = False)
    if noteSerializer.is_valid():
        noteSerializer.save()
    return Response(noteSerializer.data)

def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

def getNoteDetail(request, pk):
    note = Note.objects.get(id=pk)
    note_ser = NoteSerializer(note, many=False)
    return Response(note_ser.data)

def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted !')