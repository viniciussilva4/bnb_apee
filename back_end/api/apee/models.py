from django.db import models


class League(models.Model):

   name = models.CharField(max_length = 30)


class Team(models.Model):

   name = models.CharField(max_length = 30)

   league = models.ForeignKey('League', on_delete = models.DO_NOTHING, related_name = 'teams')


class Player(models.Model):

   name = models.CharField(max_length = 30)

   team = models.ForeignKey('Team', on_delete = models.DO_NOTHING, related_name = 'players')


class Game(models.Model):

   date = models.DateField()

   score_team_1 = models.CharField(max_length = 14)

   score_team_2 = models.CharField(max_length = 14)

   team_1 = models.ForeignKey('Team', on_delete = models.DO_NOTHING, related_name = 'games_1')

   team_2 = models.ForeignKey('Team', on_delete = models.DO_NOTHING, related_name = 'games_2')

   league = models.ForeignKey('League', on_delete = models.DO_NOTHING, related_name = 'games')