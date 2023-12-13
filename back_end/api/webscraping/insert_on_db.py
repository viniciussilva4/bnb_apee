import sqlite3
import time
from bs4 import BeautifulSoup
import datetime


def insert_teams(teams_list, cursor):

    cursor.execute('DELETE FROM apee_team')

    cont = 1

    for team in teams_list:

        cursor.execute(f'INSERT INTO apee_team (id, name, league_id) VALUES (%s, %s, %s)', (cont, team.text, 1))

        cont += 1

        time.sleep(1)


def insert_players(players_list, cursor):

    cursor.execute('DELETE FROM apee_player')

    cont = 1

    for player_row in players_list:
        
        try:

            team_td = player_row.find('td', {'data-th': 'Current Team'})

            player_td = player_row.find('td', {'data-th': 'Player'})
            
            if team_td:

                try:
    
                    team_a = team_td.find('a')

                    player_a = player_td.find('a')
                    
                    if team_a:

                        player = player_a.text

                        team = team_a.text

                        if team == 'Los Angeles Clippers':

                            cursor.execute('SELECT id, name FROM apee_team WHERE name = %s', ('LA Clippers',))

                        else:

                            if team == 'Philadelphia Sixers':
                            
                                cursor.execute('SELECT id, name FROM apee_team WHERE name = %s', ('Philadelphia 76ers',))

                            else:

                                cursor.execute('SELECT id, name FROM apee_team WHERE name = %s', (team,))

                        team_bd = cursor.fetchone()

                        cursor.execute('INSERT INTO apee_player (id, name, team_id) VALUES (%s, %s, %s)', (cont, player, team_bd[0]))

                        print(team_bd)

                        print(team)

                        print(player)

                        cont += 1

                    else:

                        print("Não foi possível encontrar a tag 'a' dentro da tag 'td'")

                except:

                    pass

            else:

                print("Não foi possível encontrar a tag 'td' com o atributo 'data-th' igual a 'Current Team'")

        except:

            pass


def insert_games(games_list, cursor, cont, headers, date, conn):

    for game in games_list:

        infos = game.findAll('li')

        team_1_name = infos[0].find('div', {'class': 'ScoreCell__TeamName ScoreCell__TeamName--shortDisplayName truncate db'})

        team_2_name = infos[1].find('div', {'class': 'ScoreCell__TeamName ScoreCell__TeamName--shortDisplayName truncate db'})

        print(team_1_name.text)

        print(team_2_name.text)

        score_team_1 = ''

        score_team_2 = ''

        score_1 = infos[0].findAll('div', {'class': 'ScoreboardScoreCell__Value flex justify-center pl2 basketball'})

        score_2 = infos[1].findAll('div', {'class': 'ScoreboardScoreCell__Value flex justify-center pl2 basketball'})

        for score in score_1:

            score_team_1 += score.text + ', '

        for score in score_2:

            score_team_2 += score.text + ', '

        cursor.execute('SELECT id, name FROM apee_team WHERE name LIKE ?', ('%' + team_1_name.text,))

        team_1_id = cursor.fetchone()

        cursor.execute('SELECT id, name FROM apee_team WHERE name LIKE ?', ('%' + team_2_name.text,))

        team_2_id = cursor.fetchone()

        #cursor.execute('INSERT INTO apee_game (id, date, team_1_id, team_2_id, score_team_1, score_team_2, league_id) VALUES (%s, %s, %s, %s, %s, %s, %s)', (cont, date.isoformat(), team_1_id[0], team_2_id[0], str(score_team_1), str(score_team_2), 1))

        cursor.execute('INSERT INTO apee_game (id, date, team_1_id, team_2_id, score_team_1, score_team_2, league_id) VALUES (?, ?, ?, ?, ?, ?, ?)', (cont, date.isoformat(), team_1_id[0], team_2_id[0], score_team_1, score_team_2, 1))

        cont += 1

        conn.commit()



