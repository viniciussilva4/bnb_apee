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

    url = 'https://www.nba.com/teams'

    response = requests.get(url, headers = headers)

    if response.status_code == 200:

        pag = BeautifulSoup(response.text, 'html.parser')

        teams = pag.findAll("a", class_ = 'Anchor_anchor__cSc3P TeamFigure_tfMainLink__OPLFu')

        insert_teams(teams, cursor)

        conn.commit()

        conn.close()
            
    else:

        print(response.status_code)


def get_players(headers, cursor):

    url = 'https://basketball.realgm.com/nba/players'

    response = requests.get(url, headers = headers)

    if response.status_code == 200:

        pag = BeautifulSoup(response.text, 'html.parser')

        players = pag.findAll("tr")

        insert_players(players, cursor)

        conn.commit()

        conn.close()
            
    else:

        print(response.status_code)


def get_games(headers, cursor, conn):

    cursor.execute('DELETE FROM apee_game')

    cont = 1

    for day_count in range(20):

        time.sleep(10)

        today = datetime.today() + timedelta(days = - (day_count + 1))

        today = today.strftime("%Y") + today.strftime("%m") + today.strftime("%d")

        url = f'https://www.espn.com.br/nba/resultados/_/data/{today}'

        response = requests.get(url, headers = headers)

        today = (datetime.today() + timedelta(days = - (day_count + 1))).date()

        if response.status_code == 200:

            pag = BeautifulSoup(response.text, 'html.parser')

            games = pag.findAll('div', {'class': 'ScoreboardScoreCell pa4 nba basketball ScoreboardScoreCell--post ScoreboardScoreCell--tabletPlus'})

            insert_games(games, cursor, cont, headers, today, conn)

            cont += len(games)

        else:

            print(response.status_code)

    conn.close()
get_teams(headers, cursor)
get_players(headers, cursor)
get_games(headers, cursor, conn)