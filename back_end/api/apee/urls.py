from django.urls import path
from apee.views import LeagueView


urlpatterns = [
    
   path('ligas/', LeagueView.as_view()),
]