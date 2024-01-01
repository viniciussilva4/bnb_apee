from django.urls import path
from apee.views import LeagueOnlyView, LeagueView, LeagueGamesView, LeagueTeamGamesView


urlpatterns = [  
   path('league/', LeagueOnlyView.as_view()),
   path('league/<int:league_id>', LeagueView.as_view()),
   path('league/<int:league_id>/<int:team_id>', LeagueTeamGamesView.as_view()),
   path('league/<int:league_id>/games', LeagueGamesView.as_view()),
]