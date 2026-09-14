from flask import Flask, request, jsonify, render_template
from flask_wtf.csrf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
import logging
import requests
import mysql.connector
import smtplib
from googleapiclient.http import MediaFileUpload
from Google import criar_servico
from jinja2 import Environment, FileSystemLoader
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import bleach

# Configuração do logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# Configuração de diretórios
log_directory = '/home/neeiuta1/logs'
os.makedirs(log_directory, exist_ok=True)  # Cria o diretório de logs se não existir
file_handler = logging.FileHandler(os.path.join(log_directory, 'log_Submit.log'))
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

diretorio_atual = os.path.dirname(os.path.abspath(__file__))
diretorio_modelo_email = os.path.abspath(os.path.join(diretorio_atual, '..', '..', 'Apontamentos', 'EmailTamplete'))
caminho_modelo_html = os.path.join(diretorio_modelo_email, 'tamplateFail.html')

# Variáveis de ambiente
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_pass = os.getenv('DB_PASS')
db_name = os.getenv('DB_NAME')
id_pai = os.getenv('ID_PAI')
email_remetente = os.getenv('EMAIL_REMETENTE')
host_de_email = os.getenv('HOST_EMAIL')
email_Pass = os.getenv('EMAIL_PASS')
api_key = os.getenv('API_KEY')
host_port = int(os.getenv('HOST_PORT'))

# Configuração do aplicativo Flask
app_s = Flask(__name__)
app_s.config['SECRET_KEY'] = os.urandom(24)
app_s.config['SESSION_COOKIE_SECURE'] = True
app_s.config['WTF_CSRF_ENABLED'] = True
app_s.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app_s.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'
csrf = CSRFProtect()
csrf.init_app(app_s)

limiter = Limiter(
    get_remote_address,
    app=app_s,
    default_limits=["35 per day", "12 per hour"]
)

servico = criar_servico()

# Função responsável por criar pasta no Google Drive com nome do ID da base de dados
def criar_pasta(servico_drive, id_pasta_pai, nome_pasta):
    """Cria uma pasta no Google Drive."""
    try:
        metadados_arquivo = {
            'name': nome_pasta,
            'parents': [id_pasta_pai],
            'mimeType': 'application/vnd.google-apps.folder'
        }
        pasta = servico_drive.files().create(body=metadados_arquivo, fields='id').execute()
        logger.info(f"Pasta '{nome_pasta}' criada com sucesso.")
        return pasta.get('id')
    except Exception as e:
        logger.error(f"Falha ao criar a pasta '{nome_pasta}': {e}")
        raise e

# Função responsável por fazer upload
def fazer_upload_arquivo_drive(servico_drive, caminho_arquivo, id_pasta):
    """Faz o upload de um arquivo para uma pasta no Google Drive."""
    try:
        if not os.path.isfile(caminho_arquivo):
            raise FileNotFoundError(f"Arquivo não encontrado: {caminho_arquivo}")

        metadados_arquivo = {
            'name': os.path.basename(caminho_arquivo),
            'parents': [id_pasta]
        }
        media = MediaFileUpload(caminho_arquivo, mimetype='application/octet-stream')
        arquivo = servico_drive.files().create(body=metadados_arquivo, media_body=media, fields='id').execute()
        logger.info(f"Arquivo '{os.path.basename(caminho_arquivo)}' enviado para a pasta com ID '{id_pasta}'.")
        return arquivo.get('id')
    except Exception as e:
        logger.error(f"Falha ao fazer upload do arquivo '{os.path.basename(caminho_arquivo)}': {e}")
        raise e

# Função responsável por criar o info.txt
def criar_arquivo_texto(nome, email, id_pasta, servico):
    """Cria um arquivo de texto com informações do utilizador e faz upload para o Google Drive."""
    try:
        conteudo_arquivo = f"Nome: {bleach.clean(nome)}\nEmail: {bleach.clean(email)}"
        caminho_arquivo = os.path.join(diretorio_atual, 'info.txt')
        with open(caminho_arquivo, 'w') as arquivo:
            arquivo.write(conteudo_arquivo)

        metadados_arquivo = {
            'name': 'info.txt',
            'parents': [id_pasta]
        }
        media = MediaFileUpload(caminho_arquivo, mimetype='text/plain', resumable=True)
        arquivo = servico.files().create(body=metadados_arquivo, media_body=media, fields='id').execute()
        logger.info(f"Arquivo de texto 'info.txt' criado e enviado para a pasta com ID '{id_pasta}'.")
        return arquivo.get('id')
    except Exception as e:
        logger.error(f"Falha ao criar o arquivo de texto 'info.txt': {e}")
        raise e

# Função responsável por remover o ficheiro da pasta uploads
def deletar_arquivo_especifico(diretorio, nome_arquivo):
    """Deleta um arquivo específico em um diretório especificado."""
    try:
        caminho_arquivo = os.path.join(diretorio, nome_arquivo)
        if os.path.isfile(caminho_arquivo):
            os.unlink(caminho_arquivo)
            logger.info(f"Arquivo '{nome_arquivo}' eliminado da pasta '{diretorio}'.")
        else:
            logger.warning(f"Arquivo '{nome_arquivo}' não encontrado na pasta '{diretorio}'.")
    except Exception as e:
        logger.error(f"Falha ao excluir o arquivo {caminho_arquivo}: {e}")
        raise e

# Função responsável por verificar se a pasta uploads tem mais ou igual a 5 arquivos, todos eles vão ser removidos
def verificar_e_deletar_se_necessario(diretorio):
    """Verifica se a pasta tem mais de 5 arquivos e deleta todos se necessário."""
    try:
        arquivos = os.listdir(diretorio)
        if (len(arquivos)) >= 5:
            for nome_arquivo in arquivos:
                caminho_arquivo = os.path.join(diretorio, nome_arquivo)
                if os.path.isfile(caminho_arquivo):
                    os.unlink(caminho_arquivo)
                    logger.info(f"Arquivo '{nome_arquivo}' eliminado da pasta '{diretorio}'.")
            logger.info(f"Todos os arquivos foram eliminados da pasta '{diretorio}' porque havia mais de 5 arquivos.")
        else:
            logger.info(f"A pasta '{diretorio}' contém {len(arquivos)} arquivos, nenhum arquivo foi deletado.")
    except Exception as e:
        logger.error(f"Falha ao verificar ou deletar arquivos no diretório '{diretorio}': {e}")
        raise e

# Função responsável por verificar se o ficheiro tem vírus

# Função responsável por verificar se o ficheiro tem vírus usando Metadefender
def scan_file_with_metadefender(api_key, file_path):
    """Scan de um arquivo usando a API do Metadefender."""
    try:
        if not os.path.isfile(file_path):
            raise FileNotFoundError(f"Arquivo não encontrado: {file_path}")

        logger.info(f"Scan do arquivo: {file_path}")
        url = 'https://api.metadefender.com/v4/file'
        headers = {
            'apikey': api_key,
            'Content-Type': 'application/octet-stream'
        }
        with open(file_path, 'rb') as f:
            response = requests.post(url, headers=headers, data=f)
        
        if response.status_code != 200:
            logger.error(f"Erro na resposta da API do Metadefender: {response.status_code} - {response.text}")
            raise Exception(f"Erro na resposta da API do Metadefender: {response.status_code} - {response.text}")
        
        result = response.json()
        return result
    except Exception as e:
        logger.error(f"Erro a fazer scan o arquivo com Metadefender: {e}")
        raise e

# Função responsável por remover informação da base de dados
def remover_da_base_de_dados(nome_pasta):
    """Remove uma entrada da base de dados."""
    try:
        conexao = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database=db_name
        )
        cursor = conexao.cursor(prepared=True)  # Utiliza prepared statements
        cursor.execute("DELETE FROM submit WHERE ID = %s", (nome_pasta,))
        conexao.commit()
        cursor.close()
        conexao.close()
        logger.info("Entrada eliminada da base de dados.")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao deletar da base de dados: {e}")

# Dependendo da situação, vai ser enviado um email ao utilizador a informar o que aconteceu (vírus ou problemas técnicos)
def enviar_email(nome, email, tipo):
    """Envia um email de notificação para o utilizador."""
    nome_remetente = "NEEI-Apontamentos"
    email_destinatario = bleach.clean(email)

    if tipo:
        assunto = "Processo concluído: Apontamentos não aceites"
        env = Environment(loader=FileSystemLoader(diretorio_modelo_email))
        template = env.get_template('tamplateFail.html')
        corpo_html = template.render(name=bleach.clean(nome), content="O nosso sistema verificou que o seu ficheiro continha vírus. Tente novamente mais tarde.")
    else:
        assunto = "Problemas Técnicos"
        env = Environment(loader=FileSystemLoader(diretorio_modelo_email))
        template = env.get_template('tamplateFail.html')
        corpo_html = template.render(name=bleach.clean(nome), content="Infelizmente, devido a um problema técnico, o nosso sistema não consegue processar o seu pedido. Tente mais tarde. Se o problema persistir, contacte um membro do NEEI. Pedimos desculpa pelo incómodo.")

    msg = MIMEMultipart()
    msg['From'] = f"{nome_remetente} <{email_remetente}>"
    msg['To'] = email_destinatario
    msg['Subject'] = assunto
    msg.attach(MIMEText(corpo_html, 'html', 'utf-8'))

    try:
        with smtplib.SMTP_SSL(host_de_email, host_port) as servidor_smtp:
            servidor_smtp.login(email_remetente, email_Pass)
            servidor_smtp.sendmail(email_remetente, email_destinatario, msg.as_string())
        logger.info("Email enviado com sucesso!")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao enviar o email: {e}")

@app_s.route('/', methods=['POST'])
@csrf.exempt
def execute():
    servico = criar_servico()

    try:
        caminho_arquivo_para_upload = bleach.clean(request.form['target_file'])
        nome_pasta = bleach.clean(request.form['folder_name'])
        nome = bleach.clean(request.form['name'])
        email = bleach.clean(request.form['email'])
        logger.info("target_file=%s, folder_name=%s, name=%s, email=%s", caminho_arquivo_para_upload, nome_pasta, nome, email)

        if not caminho_arquivo_para_upload or not nome_pasta or not nome or not email:
            logger.error("Dados em falta: target_file=%s, folder_name=%s, name=%s, email=%s", caminho_arquivo_para_upload, nome_pasta, nome, email)
            return jsonify({'status': 'FALHA', 'erro': 'Dados em falta'}), 400

        if caminho_arquivo_para_upload.startswith('python/'):
            caminho_arquivo_para_upload = caminho_arquivo_para_upload[len('python/'):]

        caminho_absoluto_arquivo = os.path.join(diretorio_atual, caminho_arquivo_para_upload)
        logger.info(f"Caminho absoluto do arquivo recebido: {caminho_absoluto_arquivo}, nome da pasta: {nome_pasta}, nome: {nome}, email: {email}")

        if servico is None:
            enviar_email(nome, email, False)
            remover_da_base_de_dados(nome_pasta)
            return jsonify({'status': 'FALHA', 'erro': 'Serviço não disponível'}), 400

        # Verificar o tamanho do arquivo
        tamanho_arquivo = os.path.getsize(caminho_absoluto_arquivo)
        logger.info(f"Tamanho do arquivo: {tamanho_arquivo} bytes")

        if tamanho_arquivo >= 75 * 1024 * 1024:  # 75 MB
            logger.error(f"Arquivo muito grande: {tamanho_arquivo} bytes")
            return jsonify({'status': 'FALHA', 'erro': 'Arquivo maior que 75MB'}), 400

        # Scan do arquivo com Metadefender
        scan_result = scan_file_with_metadefender(api_key, caminho_absoluto_arquivo)
        if 'scan_id' in scan_result:
            logger.info("ID do Scan: %s", scan_result['scan_id'])
            logger.info("Resultado do Scan: %s", scan_result['verbose_msg'])

        if 'positives' in scan_result:
            logger.error("Número de positivos: %s", scan_result['positives'])
            logger.info("Caminho do arquivo recebido: %s", caminho_absoluto_arquivo)
            diretorio_uploads = os.path.join(diretorio_atual, 'uploads')
            deletar_arquivo_especifico(diretorio_uploads, caminho_absoluto_arquivo)
            verificar_e_deletar_se_necessario(diretorio_uploads)
            enviar_email(nome, email, True)
            remover_da_base_de_dados(nome_pasta)
            logger.error("O script será encerrado devido à detecção de vírus")
            return jsonify({'status': 'FALHA', 'erro': 'Vírus detectados'}), 400

        id_pasta = criar_pasta(servico, id_pai, nome_pasta)
        logger.info(f"Pasta criada com ID '{id_pasta}'")

        fazer_upload_arquivo_drive(servico, caminho_absoluto_arquivo, id_pasta)
        criar_arquivo_texto(nome, email, id_pasta, servico)
        logger.info(f"Arquivos enviados com sucesso para a pasta com ID '{id_pasta}'.")

        diretorio_uploads = os.path.join(diretorio_atual, 'uploads')
        deletar_arquivo_especifico(diretorio_uploads, caminho_absoluto_arquivo)
        verificar_e_deletar_se_necessario(diretorio_uploads)
        return jsonify({'status': 'SUCESSO'})
    except Exception as e:
        logger.exception("Erro ao executar o script")
        return jsonify({'status': 'FALHA', 'erro': str(e)}), 400



if __name__ == "__main__":
    try:
        app_s.run()
    except Exception as e:
        logger.exception("Erro ao iniciar o servidor Flask")
    finally:
        for handler in logger.handlers:
            handler.close()
            logger.removeHandler(handler)
