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

       curent_date = timezone.now().date()

       day_diference = (curent_date - update_instance.date).days

       diference_limit = 1

<<<<<<< HEAD
       if (day_diference + 1) > diference_limit:
          
          path_file = os.path.abspath(__file__)
=======
       if (diferenca_dias + 1) > limite_diferenca:
         
          caminho_do_arquivo = 'C:/Usuários/naoac/bnb_apee/back_end/api/apee/get.py'
>>>>>>> 3db56a9aec261be933d6920270a57fa78c5ed667

          path_file = path_file[:-8] + 'get.py'

          os.system(f'python {path_file}')
          
          update_instance.date = curent_date

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
