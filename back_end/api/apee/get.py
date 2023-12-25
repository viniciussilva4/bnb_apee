import requests
from bs4 import BeautifulSoup
import sqlite3
import time
from datetime import datetime, timedelta

from insert_on_db import insert_teams, insert_players, insert_games


headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

conn = sqlite3.connect(r'C:\Users\Nildes\Documents\bnb_apee\back_end\api\db.sqlite3')

# conn = connection = psycopg2.connect(
        # dbname = 'postgre',
        # user = 'vin',
        # password = 'vin',
        # host = 'localhost',
        # port = '5432'
    # )

cursor = conn.cursor()

def get_teams(headers, cursor):

    cursor.execute('SELECT COUNT(*) FROM apee_team')

    have_team = cursor.fetchone()

    if have_team[0] == 0:

        pass

    else:

        url = 'https://www.nba.com/teams'

        response = requests.get(url, headers = headers)

        if response.status_code == 200:

            pag = BeautifulSoup(response.text, 'html.parser')

            teams = pag.findAll("a", class_ = 'Anchor_anchor__cSc3P TeamFigure_tfMainLink__OPLFu')

            insert_teams(teams, cursor)

            conn.commit()

                
        else:

            print(response.status_code)


def get_players(headers, cursor):

    cursor.execute('SELECT COUNT(*) FROM apee_player')

    have_player = cursor.fetchone()

    if have_player[0] != 0:

        pass

    else:

        url = 'https://basketball.realgm.com/nba/players'

        response = requests.get(url, headers = headers)

        if response.status_code == 200:

            pag = BeautifulSoup(response.text, 'html.parser')

            players = pag.findAll("tr")

            insert_players(players, cursor)

            conn.commit()
                
        else:

            print(response.status_code)


def get_games(headers, cursor, conn):

    cursor.execute('SELECT COUNT(*) FROM apee_game')

    cont = cursor.fetchone()

    if cont[0] == 0:

        contt = 0

        games_list = insert_games(20, cursor)

        for id in range(len(games_list), 0, -1):

            print(id)
            
            cursor.execute('INSERT INTO apee_game (id, date, team_1_id, team_2_id, score_team_1, score_team_2, league_id) VALUES (?, ?, ?, ?, ?, ?, ?)', (id, games_list[contt][0].isoformat(), games_list[contt][1], games_list[contt][2], games_list[contt][3], games_list[contt][4], 1))

            # cursor.execute('INSERT INTO apee_game (id, date, team_1_id, team_2_id, score_team_1, score_team_2, league_id) VALUES (%s, %s, %s, %s, %s, %s, %s)', (cont, date.isoformat(), team_1_id[0], team_2_id[0], str(score_team_1), str(score_team_2), 1))

            contt += 1

        conn.commit()

    else:

        cursor.execute('SELECT id, date FROM apee_game WHERE id = ?', (cont))

        game = cursor.fetchone()

        last_game_date = datetime.strptime(game[1], "%Y-%m-%d")

        today = datetime.now() - timedelta(days = 1)

        days_difference = today - last_game_date

        games_list = insert_games(days_difference.days, cursor)

        print(games_list)

        print(len(games_list))

        contt = 0

        for id in range((len(games_list) + int(cont[0])), cont[0], -1):

            print(id)

            print(games_list[contt])
            
            cursor.execute('INSERT INTO apee_game (id, date, team_1_id, team_2_id, score_team_1, score_team_2, league_id) VALUES (?, ?, ?, ?, ?, ?, ?)', (id, games_list[contt][0].isoformat(), games_list[contt][1], games_list[contt][2], games_list[contt][3], games_list[contt][4], 1))

            # cursor.execute('INSERT INTO apee_game (id, date, team_1_id, team_2_id, score_team_1, score_team_2, league_id) VALUES (%s, %s, %s, %s, %s, %s, %s)', (cont, date.isoformat(), team_1_id[0], team_2_id[0], str(score_team_1), str(score_team_2), 1))

            contt += 1

        conn.commit()

get_teams(headers, cursor)

get_players(headers, cursor)
            
get_games(headers, cursor, conn)

conn.close()