from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Q

from .serializers import LeaguesSerializer, TeamsSerializer, TeamGamesSerializer, LeagueGamesSerializer
from apee.models import League, Team, Player, Game


class LeagueView(APIView):
   
   def get(self, request, league_id):
       
       league = League.objects.get(pk = league_id)

       league_serializer = LeaguesSerializer(league)

       return Response(league_serializer.data, status = status.HTTP_200_OK)
   

class TeamView(APIView):

    def get(self, request, league_id, team_id):

        team = Team.objects.get(pk = team_id, league_id = league_id)

        team_serializer = TeamsSerializer(team)

        return Response(team_serializer.data, status = status.HTTP_200_OK)
    

class LeagueGamesView(APIView):

    def get(self, request, league_id):

        league = League.objects.get(pk = league_id)

        league_games_serializer = LeagueGamesSerializer(league)

        return Response(league_games_serializer.data, status = status.HTTP_200_OK)
    

class LeagueTeamGamesView(APIView):

    def get(self, request, league_id, team_id):

        games = Game.objects.filter(Q(league_id = league_id) & Q(team_1_id = team_id) | Q(team_2_id = team_id))

        games_serializer = TeamGamesSerializer(games, many = True)

        return Response(games_serializer.data, status = status.HTTP_200_OK)