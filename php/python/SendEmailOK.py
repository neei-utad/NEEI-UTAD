import os
import sys
import logging
import mysql.connector
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from Google import criar_servico
from jinja2 import Environment, FileSystemLoader
import logging


# Configurando o logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# Diretório de logs
log_directory = os.getenv('LOG_DIRECTORY', '/home/neeiuta1/logs')
os.makedirs(log_directory, exist_ok=True)  # Cria o diretório de logs se não existir

file_handler = logging.FileHandler(os.path.join(log_directory, 'log_OK.log'))
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


# Diretórios e credenciais
diretorio_atual = os.path.dirname(os.path.abspath(__file__))
diretorio_modelo_email = os.path.abspath(os.path.join(diretorio_atual, '..', '..', 'Apontamentos', 'EmailTamplete'))
caminho_modelo_html = os.path.join(diretorio_modelo_email, 'tamplateOK.html')

# Criar serviço Google Drive
servico = criar_servico()

# Variáveis de ambiente para credenciais
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_pass = os.getenv('DB_PASS')
db_name = os.getenv('DB_NAME')
email_remetente = os.getenv('EMAIL_REMETENTE')
email_Pass = os.getenv('EMAIL_PASS')
host_de_email = os.getenv('HOST_EMAIL')
host_port = int(os.getenv('HOST_PORT'))

def deletar_pasta_google_drive(id_pasta):
    """Deleta uma pasta no Google Drive pelo ID."""
    try:
        servico.files().delete(fileId=id_pasta).execute()
        logger.info("Pasta eliminada com sucesso.")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao eliminar a pasta: {e}")

def obter_informacoes_primeira_pasta(parent_id):
    """Obtém informações da primeira pasta dentro de um diretório no Google Drive."""
    try:
        consulta = f"'{parent_id}' in parents and mimeType = 'application/vnd.google-apps.folder'"
        resultados = servico.files().list(q=consulta, fields="files(id, name)", pageSize=1).execute()
        pastas = resultados.get('files', [])

        if pastas:
            pasta = pastas[0]
            return pasta['name'], pasta['id']
        else:
            logger.info("Nenhuma pasta encontrada na pasta principal.")
            return None, None
    except Exception as e:
        logger.error(f"Ocorreu um erro ao obter informações da pasta: {e}")
        return None, None

def pesquisar_na_base_por_nome(nome_pasta):
    """Pesquisa informações de uma pasta pelo nome na base de dados."""
    try:
        with mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database=db_name
        ) as conexao:
            cursor = conexao.cursor()
            cursor.execute("SELECT Nome, Email FROM submit WHERE ID = %s", (nome_pasta,))
            linha = cursor.fetchone()
            return linha
    except Exception as e:
        logger.error(f"Ocorreu um erro ao pesquisar na base de dados: {e}")
        return None

def enviar_email(nome, email):
    """Envia um email notificando o utilizador sobre a conclusão do processo."""
    nome_remetente = "NEEI-Apontamentos"
    assunto = "Processo concluído: Apontamentos aceites"

    env = Environment(loader=FileSystemLoader(diretorio_modelo_email))
    template = env.get_template('tamplateOK.html')
    corpo_html = template.render(name=nome)

    msg = MIMEMultipart()
    msg['From'] = f"{nome_remetente} <{email_remetente}>"
    msg['To'] = email
    msg['Subject'] = assunto

    part_html = MIMEText(corpo_html, 'html', 'utf-8')
    msg.attach(part_html)
    try:
        with smtplib.SMTP_SSL(host_de_email, host_port) as servidor_smtp:
            servidor_smtp.login(email_remetente, email_Pass)
            servidor_smtp.sendmail(email_remetente, email, msg.as_string())
        logger.info("Email enviado com sucesso!")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao enviar o email: {e}")

def deletar_arquivos_em_diretorio(diretorio):
    """Deleta todos os arquivos em um diretório especificado."""
    for nome_arquivo in os.listdir(diretorio):
        caminho_arquivo = os.path.join(diretorio, nome_arquivo)
        try:
            if os.path.isfile(caminho_arquivo):
                os.unlink(caminho_arquivo)
        except Exception as e:
            logger.error(f"Falha ao excluir {caminho_arquivo}. Razão: {e}")

def deletar_da_base_de_dados(nome_pasta):
    """Deleta uma entrada da base de dados pelo nome da pasta."""
    try:
        with mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database=db_name
        ) as conexao:
            cursor = conexao.cursor()
            cursor.execute("DELETE FROM submit WHERE ID = %s", (nome_pasta,))
            conexao.commit()
            logger.info("Entrada eliminada da base de dados.")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao deletar do base de dados: {e}")

if __name__ == "__main__":
    id_pasta_principal=os.getenv('ID_OK')
    if servico is None:
        sys.exit(1)

    while True:
        nome_pasta, id_pasta = obter_informacoes_primeira_pasta(id_pasta_principal)

        if nome_pasta:
            logger.info(f"O nome da primeira pasta na pasta principal é: {nome_pasta}")
            logger.info(f"O ID da primeira pasta na pasta principal é: {id_pasta}")

            informacao_pasta = pesquisar_na_base_por_nome(nome_pasta)
            if informacao_pasta:
                nome, email = informacao_pasta
                enviar_email(nome, email)
                deletar_pasta_google_drive(id_pasta)
                deletar_da_base_de_dados(nome_pasta)
            else:
                logger.error("Informação da pasta não encontrada na base de dados.")
                break
        else:
            logger.info("Nenhuma pasta encontrada na pasta principal.")
            uploads_directory = os.path.join(diretorio_atual, 'uploads')
            deletar_arquivos_em_diretorio(uploads_directory)
            break
