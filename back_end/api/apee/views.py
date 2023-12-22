from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q
from django.utils import timezone
import os


from .serializers import LeaguesSerializer, TeamGamesSerializer, LeagueGamesSerializer
from apee.models import League, Team, UpdateVerify


class LeagueView(APIView):
   
   def get(self, request, league_id):
       
       update_instance = UpdateVerify.objects.get(pk = 1)

       data_atual = timezone.now().date()

       diferenca_dias = (data_atual - update_instance.date).days

       limite_diferenca = 1

       if (diferenca_dias + 1) > limite_diferenca:
          
          
          
          caminho_do_arquivo = 'C:/Usuários/bnb_apee/back_end/api/apee/get.py'

          os.system(f'python {caminho_do_arquivo}')
          
          update_instance.date = data_atual

          update_instance.save()
       
       league = League.objects.get(pk = league_id)

       league_serializer = LeaguesSerializer(league)

       return Response(league_serializer.data, status = status.HTTP_200_OK)
    

class LeagueGamesView(APIView):

    def get(self, request, league_id):

        league = League.objects.get(pk = league_id)

        league_games_serializer = LeagueGamesSerializer(league)

        return Response(league_games_serializer.data, status = status.HTTP_200_OK)
    

class LeagueTeamGamesView(APIView):

    def get(self, request, league_id, team_id):

        team_games = Team.objects.get(pk = team_id, league_id = league_id)

        games_serializer = TeamGamesSerializer(team_games)

        return Response(games_serializer.data, status = status.HTTP_200_OK)