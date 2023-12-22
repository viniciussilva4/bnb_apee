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

    sum_first_time_team_1 = serializers.SerializerMethodField()

    sum_first_time_team_2 = serializers.SerializerMethodField()

    sum_second_time_team_1 = serializers.SerializerMethodField()

    sum_second_time_team_2 = serializers.SerializerMethodField()

    sum_first_time = serializers.SerializerMethodField()

    class Meta:

        model = Game

        fields = ['id', 'date', 'team_1', 'score_team_1', 'team_2', 'score_team_2', 'sum_first_time_team_1', 'sum_first_time_team_2', 'sum_first_time', 'sum_second_time_team_1', 'sum_second_time_team_2']

    def get_sum_first_time_team_1(self, game):

        first_time_sum = int(game.score_team_1[0:2]) + int(game.score_team_1[4:6])

        return first_time_sum
    
    def get_sum_first_time_team_2(self, game):

        first_time_sum = int(game.score_team_2[0:2]) + int(game.score_team_2[4:6])

        return first_time_sum
    
    def get_sum_second_time_team_1(self, game):

        first_time_sum = int(game.score_team_1[8:10]) + int(game.score_team_1[12:14])

        return first_time_sum
    
    def get_sum_second_time_team_2(self, game):

        first_time_sum = int(game.score_team_2[8:10]) + int(game.score_team_2[12:14])

        return first_time_sum
    
    def get_sum_first_time(self, game):

        first_time_sum = int(game.score_team_1[0:2]) + int(game.score_team_1[4:6]) + int(game.score_team_2[0:2]) + int(game.score_team_2[4:6])

        return first_time_sum


class LeagueGamesSerializer(ModelSerializer):

    games = GamesSerializer(many = True)

    class Meta:

        model = League

        fields = ['id', 'name', 'games']

    def to_representation(self, instance):

        games_queryset = instance.games.all().order_by('date')

        games_data = GamesSerializer(games_queryset, many = True).data

        representation = super(LeagueGamesSerializer, self).to_representation(instance)

        representation['games'] = games_data

        return representation


class TeamGamesSerializer(ModelSerializer):

    players = PlayersSerializer(many = True)

    league = LeagueSerializer()

    games = serializers.SerializerMethodField()

    class Meta:

        model = Team

        fields = ['id', 'name', 'league', 'games', 'players'] 

    def get_games(self, team):

        games = Game.objects.filter(Q(team_1 = team) | Q(team_2 = team)).order_by('-date')

        games_serializer = GamesSerializer(games, many=True)

        return games_serializer.data