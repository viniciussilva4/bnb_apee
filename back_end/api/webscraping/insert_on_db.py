import sqlite3
import time


def insert_teams(teams_list, cursor):

    cursor.execute('DELETE FROM apee_team')

    cont = 1

    for team in teams_list:

        cursor.execute(f'INSERT INTO apee_team (id, name, league_id) VALUES (?, ?, ?)', (cont, team.text, 1))

        cont += 1

        time.sleep(1)