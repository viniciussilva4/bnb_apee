from rest_framework.serializers import ModelSerializer
from apee.models import League, Team, Player, Game


class LeagueSerializer(ModelSerializer):

    class Meta:

        model = League

        fields = '__all__'


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

        fields = '__all__'


class LeagueGamesSerializer(ModelSerializer):

    games = GamesSerializer(many = True)

    class Meta:

        model = League

        fields = ['id', 'name', 'games']


class TeamGamesSerializer(ModelSerializer):

    league = LeagueSerializer()

    team_1 = TeamsSerializer()

    team_2 = TeamsSerializer()

    class Meta:

        model = Game

        fields = ['id', 'date', 'league', 'team_1', 'score_team_1', 'team_2', 'score_team_2']