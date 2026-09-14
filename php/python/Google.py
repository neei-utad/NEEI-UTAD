import pickle
import os
import logging
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from smtplib import SMTP_SSL
from email.message import EmailMessage

# Configuração de logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# Modo servidor
MODO_SERVIDOR = True

# Definir diretório de logs
if MODO_SERVIDOR:
    diretorio_logs = '/home/neeiuta1/logs'
else:
    diretorio_logs = os.path.dirname(os.path.abspath(__file__))
os.makedirs(diretorio_logs, exist_ok=True)
manipulador_arquivo = logging.FileHandler(os.path.join(diretorio_logs, 'create_service.log'))
manipulador_arquivo.setFormatter(formatter)
logger.addHandler(manipulador_arquivo)

# Caminhos para credentials.json e token.pickle
def obter_caminhos_credenciais():
    if MODO_SERVIDOR:
        return {
            "CREDENTIALS_FILE": '/home/neeiuta1/credenciais/credentials.json',
            "TOKEN_PICKLE": '/home/neeiuta1/credenciais/token_drive_v3.pickle',
            "SCOPES": ['https://www.googleapis.com/auth/drive']
        }
    else:
        diretorio_atual = os.path.dirname(os.path.abspath(__file__))
        return {
            "CREDENTIALS_FILE": os.path.join(diretorio_atual, 'credentials.json'),
            "TOKEN_PICKLE": os.path.join(diretorio_atual, 'token_drive_v3.pickle'),
            "SCOPES": ['https://www.googleapis.com/auth/drive']
        }

caminhos_credenciais = obter_caminhos_credenciais()
CREDENTIALS_FILE = caminhos_credenciais["CREDENTIALS_FILE"]
TOKEN_PICKLE = caminhos_credenciais["TOKEN_PICKLE"]
SCOPES = caminhos_credenciais["SCOPES"]

# Dados de email
def obter_dados_email():
    if MODO_SERVIDOR:
        return {
            "DE_EMAIL": os.getenv('EMAIL_REMETENTE'),
            "SMTP_PASSWORD": os.getenv('EMAIL_PASS'),
            "SMTP_SERVER": os.getenv('HOST_EMAIL'),
            "SMTP_PORT": int(os.getenv('HOST_PORT')),
            "IMAGEM_URL": "https://neei-utad.pt/assets/images/logos/logo.png"
        }
    else:
        return {
            "DE_EMAIL": "",
            "SMTP_PASSWORD": "",
            "SMTP_SERVER": "",
            "SMTP_PORT": "",
            "IMAGEM_URL": "https://neei-utad.pt/assets/images/logos/logo.png"
        }

dados_email = obter_dados_email()
DE_EMAIL = dados_email["DE_EMAIL"]
SMTP_PASSWORD = dados_email["SMTP_PASSWORD"]
SMTP_SERVER = dados_email["SMTP_SERVER"]
SMTP_PORT = dados_email["SMTP_PORT"]
IMAGEM_URL = dados_email["IMAGEM_URL"]

def enviar_email(assunto, corpo, para_email):
    html_content = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }}
                .header,
                .footer {{
                    background-color: #000000;
                    color: white;
                    padding: 10px 20px;
                    text-align: center;
                }}
                .content {{
                    padding: 20px;
                }}
                img {{
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 50%;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <img src="{IMAGEM_URL}" alt="NEEI Logo" style="width:150px;">
            </div>
            <div class="content">
                <p>{corpo}</p>
            </div>
            <div class="footer">
                <p>&copy; Copyright 2023-2024 NEEI Todos os Direitos Reservados</p>
            </div>
        </body>
    </html>
    """

    msg = EmailMessage()
    msg.set_content(html_content, subtype='html')
    msg['Subject'] = assunto
    msg['From'] = f"Apontamentos-Manutenção <{DE_EMAIL}>"
    msg['To'] = para_email

    try:
        with SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(DE_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)
        logger.info("Email enviado com sucesso")
    except Exception as e:
        logger.error(f"Falha ao enviar email: {e}")

def verificar_arquivos():
    logger.info(f"Caminho para o ficheiro de credenciais: {CREDENTIALS_FILE}")
    logger.info(f"Caminho para o ficheiro pickle: {TOKEN_PICKLE}")

def criar_servico():
    verificar_arquivos()

    creds = None
    try:
            with open(TOKEN_PICKLE, 'rb') as token:
                creds = pickle.load(token)
            logger.info('Credenciais carregadas a partir do ficheiro pickle.')
    except Exception as e:
        logger.error('Falha ao carregar token.', exc_info=True)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
                with open(TOKEN_PICKLE, 'wb') as token:
                    pickle.dump(creds, token)
                logger.info('Token renovado com sucesso e ficheiro pickle atualizado.')
            except Exception as e:
                logger.error('Falha ao atualizar token.', exc_info=True)
                enviar_email(
                    "Ação Necessária: Autenticação Precisa de ser Renovada",
                    "As credenciais expiraram e não puderam ser renovadas automaticamente. Por favor, renove manualmente.",
                    'utadneei@gmail.com'
                )
                return None
        else:
            logger.error('Credenciais expiradas e não renováveis.')
            enviar_email(
                "Ação Necessária: Autenticação Precisa de ser Renovada",
                "As credenciais expiraram e não puderam ser renovadas automaticamente. Por favor, renove manualmente.",
                'utadneei@gmail.com'
            )
            if not MODO_SERVIDOR:
                fluxo = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
                creds = fluxo.run_local_server()
                with open(TOKEN_PICKLE, 'wb') as token:
                    pickle.dump(creds, token)
                logger.info('Autenticação manual realizada com sucesso e ficheiro pickle atualizado.')
            else:
                logger.info('Modo servidor ativado, não é possível renovar credenciais manualmente.')
                return None
    try:
        service = build('drive', 'v3', credentials=creds)
        logger.info('Serviço do Google Drive criado com sucesso.')
        return service
    except Exception as e:
        logger.error('Falha ao criar o serviço do Google Drive:', exc_info=True)
        return None

if __name__ == "__main__":
    criar_servico()
