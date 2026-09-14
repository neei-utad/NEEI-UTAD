import os
import sys
import logging
import mysql.connector
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Environment, FileSystemLoader

from Google import criar_servico

# Configurando o logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')

# Diretório de logs
log_directory = os.getenv('LOG_DIRECTORY', '/home/neeiuta1/logs')
os.makedirs(log_directory, exist_ok=True)  # Cria o diretório de logs se não existir

file_handler = logging.FileHandler(os.path.join(log_directory, 'log_Fail.log'))
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Diretórios e variáveis de ambiente para credenciais
diretorio_atual = os.path.dirname(os.path.abspath(__file__))
diretorio_modelo_email = os.path.abspath(os.path.join(diretorio_atual, '..', '..', 'Apontamentos', 'EmailTamplete'))
caminho_modelo_html = os.path.join(diretorio_modelo_email, 'tamplateFail.html')

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

# Função para enviar email
def enviar_email(nome, email, conteudo=None):
    nome_remetente = "NEEI-Apontamentos"
    assunto = "Processo concluído: Apontamentos não aceites"

    env = Environment(loader=FileSystemLoader(diretorio_modelo_email))
    template = env.get_template('tamplateFail.html')

    if conteudo is not None:
        corpo_html = template.render(name=nome, content=conteudo)
    else:
        corpo_html = template.render(name=nome, content_not_found=True)

    msg = MIMEMultipart()
    msg['From'] = f"{nome_remetente} <{email_remetente}>"
    msg['To'] = email
    msg['Subject'] = assunto

    msg.attach(MIMEText(corpo_html, 'html', 'utf-8'))

    try:
        with smtplib.SMTP_SSL(host_de_email, host_port) as servidor_smtp:
            servidor_smtp.login(email_remetente, email_Pass)
            servidor_smtp.sendmail(email_remetente, email, msg.as_string())
        logger.info("Email enviado com sucesso!")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao enviar o email: {e}")

# Função para pesquisar informações na base de dados pelo nome da pasta
def pesquisar_na_base_por_nome(nome_pasta):
    try:
        conexao = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database=db_name
        )
        cursor = conexao.cursor()

        cursor.execute("SELECT Nome, Email FROM submit WHERE ID = %s", (nome_pasta,))
        
        linha = cursor.fetchone()

        cursor.close()
        conexao.close()

        return linha  

    except Exception as e:
        logger.error(f"Ocorreu um erro: {e}")
        return None

# Função para obter informações da primeira pasta no Google Drive
def obter_informacoes_primeira_pasta(parent_id):
    try:
        consulta = f"'{parent_id}' in parents and mimeType = 'application/vnd.google-apps.folder'"
        
        resultados = servico.files().list(q=consulta, fields="files(id, name)", pageSize=1).execute()

        pastas = resultados.get('files', [])

        if pastas:
            pasta = pastas[0]
            nome_pasta = pasta['name']
            id_pasta = pasta['id']

            notas_txt_existe = False
            consulta_arquivo = f"'{id_pasta}' in parents and name = 'Notas.txt'"
            resultados_arquivo = servico.files().list(q=consulta_arquivo, fields="files(id)", pageSize=1).execute()
            arquivos = resultados_arquivo.get('files', [])
            if arquivos:
                notas_txt_existe = True

            if notas_txt_existe:
                id_arquivo = arquivos[0]['id']
                conteudo_arquivo = servico.files().get_media(fileId=id_arquivo).execute()
                return nome_pasta, id_pasta, conteudo_arquivo.decode('utf-8')
            else:
                logger.info("Ficheiro 'Notas.txt' não encontrado na pasta.")
                return nome_pasta, id_pasta, None
        else:
            logger.info("Nenhuma pasta encontrada na pasta principal.")
            return None, None, None
        
    except Exception as e:
        logger.error(f"Ocorreu um erro: {e}")
        return None, None, None

# Função para deletar arquivos em um diretório
def deletar_arquivos_em_diretorio(diretorio):
    for nome_arquivo in os.listdir(diretorio):
        caminho_arquivo = os.path.join(diretorio, nome_arquivo)
        try:
            if os.path.isfile(caminho_arquivo):
                os.unlink(caminho_arquivo)
        except Exception as e:
            logger.error(f"Falha ao excluir {caminho_arquivo}. Razão: {e}")

# Função para deletar uma entrada da base de dados pelo nome da pasta
def deletar_da_base_de_dados(nome_pasta):
    try:
        conexao = mysql.connector.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            database=db_name
        )
        cursor = conexao.cursor()

        cursor.execute("DELETE FROM submit WHERE ID = %s", (nome_pasta,))
        
        conexao.commit()

        cursor.close()
        conexao.close()

        logger.info("Entrada eliminada da base de dados.")
    except Exception as e:
        logger.error(f"Ocorreu um erro: {e}")

# Função para deletar uma pasta no Google Drive pelo ID
def deletar_pasta_google_drive(id_pasta):
    try:
        servico.files().delete(fileId=id_pasta).execute()
        logger.info("Pasta eliminada com sucesso.")
    except Exception as e:
        logger.error(f"Ocorreu um erro ao eliminar a pasta: {e}")

if __name__ == "__main__":
    id_pasta_principal=os.getenv('ID_Fail')

    if servico is None:
        sys.exit(1)
    
    while True:
        nome_pasta, id_pasta, conteudo = obter_informacoes_primeira_pasta(id_pasta_principal)

        if nome_pasta:
            logger.info(f"O nome da primeira pasta na pasta principal é: {nome_pasta}")
            logger.info(f"O ID da primeira pasta na pasta principal é: {id_pasta}")
            
            informacao_base = pesquisar_na_base_por_nome(nome_pasta)

            if informacao_base:
                logger.info(f"Informação da pasta recuperada da base de dados: {informacao_base}")
                nome, email = informacao_base
                
                if conteudo is not None:
                    if conteudo == "":
                        logger.info("O conteúdo de 'Notas.txt' está vazio.")
                        enviar_email(nome, email)
                    else:
                        logger.info(f"O conteúdo de 'Notas.txt' é: {conteudo}")
                        enviar_email(nome, email, conteudo)
                else:
                    logger.info("Ficheiro 'Notas.txt' não encontrado na pasta")
                    enviar_email(nome, email)

                deletar_pasta_google_drive(id_pasta)
                deletar_da_base_de_dados(nome_pasta)
                logger.info("Processo concluído...")
            else:
                logger.error("Informação da pasta não encontrada na base de dados.")
                break
        else:
            logger.info("Nenhuma pasta encontrada na pasta principal.")
            break

    diretorio_uploads = os.path.join(diretorio_atual, 'uploads')
    deletar_arquivos_em_diretorio(diretorio_uploads)
