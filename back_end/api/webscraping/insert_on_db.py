import sqlite3
import time
from bs4 import BeautifulSoup


def insert_teams(teams_list, cursor):

    cursor.execute('DELETE FROM apee_team')

    cont = 1

    for team in teams_list:

        cursor.execute(f'INSERT INTO apee_team (id, name, league_id) VALUES (?, ?, ?)', (cont, team.text, 1))

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

                        # if team == 'Los Angeles Clippers':

                            # cursor.execute('SELECT id FROM apee_team WHERE name = ?', ('LA Clippers'))

                        # else:

                            # cursor.execute('SELECT id FROM apee_team WHERE name = ?', (team))

                        # team_bd = cursor.fetchone()

                        # cursor.execute(f'INSERT INTO apee_player (id, name, team_id) VALUES (?, ?, ?)', (cont, player, team_bd[0]))

                        print(team)

                        print(player)

                    else:

                        print("Não foi possível encontrar a tag 'a' dentro da tag 'td'")

                except:

                    pass

            else:

                print("Não foi possível encontrar a tag 'td' com o atributo 'data-th' igual a 'Current Team'")

        except:

            pass
