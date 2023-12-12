# Use a imagem oficial do Python como base
FROM python:3.11.6-slim-bullseye

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instala as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código-fonte para o diretório de trabalho
COPY . .

# Expõe a porta que será usada pelo servidor Django
EXPOSE 8000

# Comando para executar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
