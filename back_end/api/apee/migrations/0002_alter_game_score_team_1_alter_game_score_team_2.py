# Generated by Django 4.2.7 on 2023-12-08 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apee', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='score_team_1',
            field=models.CharField(max_length=14),
        ),
        migrations.AlterField(
            model_name='game',
            name='score_team_2',
            field=models.CharField(max_length=14),
        ),
    ]