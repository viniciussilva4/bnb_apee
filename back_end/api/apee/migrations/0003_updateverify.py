# Generated by Django 4.2.7 on 2023-12-13 23:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apee', '0002_alter_game_score_team_1_alter_game_score_team_2'),
    ]

    operations = [
        migrations.CreateModel(
            name='UpdateVerify',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default='2023-12-12')),
            ],
        ),
    ]