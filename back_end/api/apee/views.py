from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import LeaguesSerializer, TeamsSerializerForLeague
from apee.models import League, Team, Player, Game


class LeagueView(APIView):
   
   def get(self, request):
       
       league = League.objects.all()

       league_serializer = LeaguesSerializer(league, many = True)

       return Response(league_serializer.data, status = status.HTTP_200_OK)