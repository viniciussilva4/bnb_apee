from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from apee.models import League, Team, Player, Game
import datetime


class TeamsSerializerForLeague(ModelSerializer):

    class Meta:

        model = Team

        fields = ['id', 'name']


class LeaguesSerializer(ModelSerializer):
   
    teams = TeamsSerializerForLeague(many = True)

    class Meta:
       
       model = League

       fields = '__all__'


class PlayersSerializerForTeam(ModelSerializer):

    class Meta:

        model = Player

        fields = ['id', 'name']


class TeamsSerializer(ModelSerializer):

    players = PlayersSerializerForTeam(many = True)

    class Meta:

        model = Team

        fields = '__all__'


class TeamSerializerForGame(ModelSerializer):

    class Meta:

        model = Team

        fields = ['id','name']


class GamesSerializer(ModelSerializer):

    team_1 = TeamSerializerForGame(read_only = True)

    team_2 = TeamSerializerForGame(read_only = True)

    class Meta:

        model = Game

        fields = '__all__'


class LeagueGamesSerializer(ModelSerializer):

    games = GamesSerializer(many = True)

    class Meta:

        model = League

        fields = '__all__'


class TeamForGameSerializer(ModelSerializer):

    class Meta:

        model = Team

        fields = ['id', 'name']


class LeagueForGameSerializer(ModelSerializer):

    class Meta:

        model = League

        fields = '__all__'    


class TeamGamesSerializer(ModelSerializer):

    league = LeagueForGameSerializer(read_only = True)

    team_1 = TeamForGameSerializer(read_only = True)

    team_2 = TeamForGameSerializer(read_only = True)

    class Meta:

        model = Game

        fields = '__all__'