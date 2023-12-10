from django.urls import path
from apee.views import LeagueView, LeagueGamesView, LeagueTeamGamesView, TeamView


urlpatterns = [  
   path('liga/<int:league_id>', LeagueView.as_view()),
   path('liga/<int:league_id>/<int:team_id>', TeamView.as_view()),
   path('liga/<int:league_id>/games', LeagueGamesView.as_view()),
   path('liga/<int:league_id>/games/<int:team_id>', LeagueTeamGamesView.as_view()),

]