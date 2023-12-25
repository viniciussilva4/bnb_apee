import os

# Obtendo o caminho absoluto do arquivo atual
caminho_script = os.path.abspath(__file__)

print(caminho_script)

caminho_script = caminho_script[:-8] + 'get.py'

print(caminho_script)
