from django.shortcuts import render
# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Note
from .serializers import NoteSerializer
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
def getNotes(request):
    if(request.method == 'GET'):
        notes = Note.objects.all().order_by('-updated')
        notes_ser = NoteSerializer(notes, many=True)
        return Response(notes_ser.data)
    elif (request.method == 'POST'):
        data = request.data
        note = Note.objects.create(
            body = data['body']
        )
        noteSerializer = NoteSerializer(note, many = False)
        if noteSerializer.is_valid():
            noteSerializer.save()
        return Response(noteSerializer.data)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def getNote(request, pk):
    if(request.method == 'GET'):
        note = Note.objects.get(id=pk)
        note_ser = NoteSerializer(note, many=False)
        return Response(note_ser.data)
    # elif (request.method == 'POST'):
    #     data = request.data
    #     note = Note.objects.create(
    #         body = data['body']
    #     )
    #     noteSerializer = NoteSerializer(note, many = False)
    #     if noteSerializer.is_valid():
    #         noteSerializer.save()
    #     return Response(noteSerializer.data)
    elif (request.method == 'PUT'):
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
    elif (request.method == 'DELETE'):
        note = Note.objects.get(id=pk)
        note.delete()
        return Response('Note was deleted !')
    
# =================================================

# @api_view(['POST'])
# def createNote(request):
#     data = request.data
#     note = Note.objects.create(
#         body = data['body']
#     )
#     noteSerializer = NoteSerializer(note, many = False)

    # if noteSerializer.is_valid():
    #     noteSerializer.save()
    # return Response(noteSerializer.data)

# =================================================

# @api_view(['PUT'])
# def updateNote(request, pk):
#     data = request.data
#     note = Note.objects.get(id=pk)
#     serializer = NoteSerializer(instance=note, data=data)

#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# =================================================

# @api_view(['DELETE'])
# def deleteNote(request, pk):
#     note = Note.objects.get(id=pk)
#     note.delete()
#     return Response('Note was deleted !')