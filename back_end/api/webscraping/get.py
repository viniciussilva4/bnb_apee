import requests
from bs4 import BeautifulSoup
import sqlite3
import time
from insert_on_db import insert_teams, insert_players


conn = sqlite3.connect(r'C:\Users\Nildes\Documents\bnb_apee\back_end\api\db.sqlite3')

cursor = conn.cursor()

def get_teams():

    url = 'https://www.nba.com/teams'

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    response = requests.get(url, headers=headers)


    if response.status_code == 200:

        pag = BeautifulSoup(response.text, 'html.parser')

        teams = pag.findAll("a", class_ = 'Anchor_anchor__cSc3P TeamFigure_tfMainLink__OPLFu')

        insert_teams(teams, cursor)

        conn.commit()

        conn.close()
            
    else:

        print(response.status_code)


def get_players():

    url = 'https://basketball.realgm.com/nba/players'

    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

    response = requests.get(url, headers=headers)


    if response.status_code == 200:

        pag = BeautifulSoup(response.text, 'html.parser')

        players = pag.findAll("tr")

        insert_players(players, cursor)

        # conn.commit()

        # conn.close()
            
    else:

        print(response.status_code)

get_players()

