from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.db.models import Q

from apee.models import League, Team, Player, Game


class LeagueSerializer(ModelSerializer):

    class Meta:

        model = League

        fields = ['id', 'name']


class PlayersSerializer(ModelSerializer):

    class Meta:

        model = Player

        fields = ['id', 'name']


class TeamsSerializer(ModelSerializer):

    league = LeagueSerializer()

    players = PlayersSerializer(many = True)

    class Meta:

        model = Team

        fields = ['id', 'name', 'league', 'players']


class LeaguesSerializer(ModelSerializer):
   
    teams = TeamsSerializer(many = True)

    class Meta:
       
       model = League

       fields = ['id', 'name', 'teams']


class TeamSerializerForGame(ModelSerializer):

    class Meta:

        model = Team

        fields = ['id','name']


class GamesSerializer(ModelSerializer):

    team_1 = TeamSerializerForGame(read_only = True)

    team_2 = TeamSerializerForGame(read_only = True)

    class Meta:

        model = Game

        fields = ['id', 'date', 'team_1', 'score_team_1', 'team_2', 'score_team_2']


class LeagueGamesSerializer(ModelSerializer):

    games = GamesSerializer(many = True)

    class Meta:

        model = League

        fields = ['id', 'name', 'games']


class TeamGamesSerializer(ModelSerializer):

    league = LeagueSerializer()

    games = serializers.SerializerMethodField()

    class Meta:

        model = Team

        fields = ['id', 'name', 'league', 'games']

    def get_games(self, team):

        games = Game.objects.filter(Q(team_1 = team) | Q(team_2 = team))

        games_serializer = GamesSerializer(games, many=True)

        return games_serializer.data