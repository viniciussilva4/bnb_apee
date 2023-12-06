from rest_framework.serializers import ModelSerializer
from apee.models import League, Team, Player, Game


class TeamsSerializerForLeague(ModelSerializer):

    class Meta:

        model = Team

        fields = ['id', 'name']


class LeaguesSerializer(ModelSerializer):
   
    teams = TeamsSerializerForLeague(many = True)

    class Meta:
       
       model = League

       fields = '__all__'