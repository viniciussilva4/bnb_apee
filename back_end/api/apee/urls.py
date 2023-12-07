from django.urls import path
from apee.views import LeagueView


urlpatterns = [
    
   path('liga/', LeagueView.as_view()),
]