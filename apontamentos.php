<?php
session_start();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="pt-pt" class="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="./JS/theme.js"></script>
  <title>Apontamentos</title>
  <link rel="stylesheet" href="./CSS/reset.css">
  <link rel="icon" type="image/x-icon" href="./assets/images/favicon.ico" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
  <link rel="stylesheet" href="./CSS/reset.css">
  <link rel="stylesheet" href="./CSS/palette.css">
  <link rel="stylesheet" href="./CSS/styles.css">
  <link rel="stylesheet" href="./CSS/apontamentos.css">
  <script src="./JS/menu.js" defer></script>
</head>

<body>
  <header>
    <div class="hamburger-menu">
      <input id="menu-toggle" type="checkbox" />
      <label class="menu__btn" for="menu-toggle">
        <span></span>
      </label>
      <ul class="menu-box">
        <div id="menu-items">
          <li>
            <img src="./assets/images/logos/logo.png" alt="NEEI's Logo">
          </li>
          <li class="menu-item">
            <i class="bi bi-house-door-fill"></i>
            <a href="./index.html">Início</a>
          </li>
          <li class="line"></li>
          <li class="menu-item">
            <i class="bi bi-chat-left-text-fill"></i>
            <a href="https://forum.neei-utad.pt/" target="_blank" rel="noopener noreferrer">Fórum</a>
          </li>
          <li class="line"></li>
          <li class="menu-item">
            <i class="bi bi-calendar-fill"></i>
            <a href="./events.html">Eventos</a>
          </li>
          <li class="line"></li>
          <li class="menu-item">
            <i class="bi bi-cart-fill"></i>
            <a href="./merch.html">Merch</a>
          </li>
          <li class="line"></li>
          <li class="menu-item">
            <i class="bi bi-share-fill"></i>
            <a href="./links.html">Links</a>
          </li>
          <li class="line"></li>
          <li id="active-page" class="menu-item">
            <i class="bi bi-pencil-fill"></i>
            <a href=".#">Apontamentos</a>
          </li>
          <li class="line"></li>
          <li class="menu-item">
            <i id="theme-toggle-icon" class="bi bi-brightness-high-fill"></i>
            <button class="theme-toggle"></button>
          </li>
          <li class="line"></li>
        </div>
        <li>
          <footer>
            <p>Redes Sociais:</p>
            <div id="social">
              <a href="https://www.twitch.tv/neeiutad" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-twitch"></i>
              </a>
              <a href="https://www.instagram.com/neei.utad/" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-instagram"></i>
              </a>
              <a href="https://www.facebook.com/neei.utad" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-facebook"></i>
              </a>
              <a href="https://www.youtube.com/@neeiutad" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-youtube"></i>
              </a>
              <a href="https://www.linkedin.com/company/neei/about/" target="_blank" rel="noopener noreferrer">
                <i class="bi bi-linkedin"></i>
              </a>
              <br>
            </div>
            <div id="version_menu">
             Versão 1.2.1
            </div>
            <p id="copyright">&copy;Copyright <b>2023-2024 NEEI</b>. Todos os Direitos Reservados</p>
            <p id="credits-main"> Sistema de apontamentos: Arquitetado e construído por:<a href="https://www.linkedin.com/in/jos%C3%A9-pedro-meireles-alves-783a9994/" target="_blank" rel="noopener noreferrer">José Pedro Meireles</a> </p>
          </footer>
        </li>
      </ul>
    </div>
  </header>
  <main>
    <section>
      <div>
        <a id="drive" class="btn" href="https://drive.google.com/drive/u/0/folders/1DTM6YgAH7x0IT3ligKDh2HEri4rHEEFZ" target="_blank" rel="noopener noreferrer">
          Google Drive
        </a>
      </div>
      <form id="Formulario" action="#" method="POST" enctype="multipart/form-data" onsubmit="return false;">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
        <div class="input-group">
          <input type="text" class="form-control" id="name" name="name" placeholder="Nome" required>
        </div>
        <div class="input-group">
          <input type="email" id="email" class="form-control" name="email" placeholder="E-mail" required>
        </div>
        <div class="input-group">
          <div>
            <input type="file" class="custom-file-input" id="file" name="file" accept=".zip,.rar,.tar,.bz2,.gz" required>
            <label class="custom-file-label" for="file">Escolher ficheiros</label>
          </div>
        </div>
        <br>
        <label>O ficheiro deve ter até 75 MB e só pode ter as seguintes extensões: 'zip', 'rar', 'tar', 'tar.bz2', 'tar.gz' e 'tar.zip'.</label>
        <br><br>
        <div>
          <input type="checkbox" id="termsCheckbox">
          <label for="termsCheckbox">Li e concordo com os termos da <a href="./politica.html">Política de Privacidade</a> e <a href="./servicos.html">Termos de Serviço</a>.</label>
        </div>
        <div>
          <button class="btn" type="submit" id="submitBtn" disabled>
            Submeter
          </button>
        </div>
      </form>
    </section>
  </main>
  <footer id="footer-large">
      <div id="large-contact-area">
        <p>Contactos:</p>
        <div>
          <a href="https://www.twitch.tv/neeiutad" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-envelope-fill"></i>neei@utad.pt
          </a>
        </div>
      </div>
      <div id="credits">
        <p id="large-copyright">&copy; Copyright <b>2023-2024 NEEI</b>. Todos os direitos reservados.</p>
        <p id="large-credits-main">
          Sistema de submissão de apontamentos
        </p>
        <p id="large-credits-main">
          Arquitetado e construído por:
          <a href="https://www.linkedin.com/in/jos%C3%A9-pedro-meireles-alves-783a9994/" target="_blank" rel="noopener noreferrer">José Pedro Meireles</a>
        </p>
        <p id="large-credits-secondary">
          Front:
          <a href="https://www.linkedin.com/in/rodrigo-ven%C3%A2ncio77" target="_blank" rel="noopener noreferrer">Rodrigo Venâncio,</a>
          <a href="https://www.linkedin.com/in/patr%C3%ADcio-sim%C3%B5es-668219201/" target="_blank" rel="noopener noreferrer">Patrício Simões,</a>
          <a href="https://www.linkedin.com/in/ana-p-330486268/" target="_blank" rel="noopener noreferrer">Ana Beatriz Pinto,</a>
          <a href="https://www.linkedin.com/in/s%C3%A9rgio-magalh%C3%A3es-b46075309/" target="_blank" rel="noopener noreferrer">Sérgio Magalhães</a>
          <a> e Rui Vasconcelos</a>
        </p>
      </div>
      <div id="large-social-area">
        <p>Redes Sociais:</p>
        <div>
          <a href="https://www.twitch.tv/neeiutad" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-twitch"></i>
          </a>
          <a href="https://www.instagram.com/neei.utad/" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-instagram"></i>
          </a>
          <a href="https://www.facebook.com/neei.utad" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@neeiutad" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-youtube"></i>
          </a>
          <a href="https://www.linkedin.com/company/neei/about/" target="_blank" rel="noopener noreferrer">
            <i class="bi bi-linkedin"></i>
          </a>
        </div>
        <div id="version">
             Versão 1.2.1
        </div>
      </div>
    </footer>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var fileInput = document.getElementById('file');
      var fileLabel = document.querySelector('label[for="file"]');
      var submitBtn = document.getElementById('submitBtn');
      var termsCheckbox = document.getElementById('termsCheckbox');
  
      var allowedExtensions = ['zip', 'rar', 'tar', 'tar.bz2', 'tar.gz', 'tar.zip'];
  
      fileInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        if (file) {
          var fileSize = file.size / 1024 / 1024; // tamanho do arquivo em MB
          var fileName = file.name;
          var fileExtension = fileName.split('.').pop().toLowerCase();
          
          // Tratamento especial para extensões duplas como 'tar.bz2', 'tar.gz' e 'tar.zip'
          if (fileName.match(/\.tar\.(bz2|gz|zip)$/)) {
            fileExtension = fileName.split('.').slice(-2).join('.');
          }
  
          if (fileSize > 75) { // se o arquivo for maior que 75 MB
            alert('O arquivo excede o limite máximo de 150MB.');
            fileInput.value = ''; // limpa o campo do arquivo
            fileLabel.textContent = 'Escolher ficheiros'; // reset para o texto original
          } else if (!allowedExtensions.includes(fileExtension)) {
            alert('Tipo de arquivo inválido. Permitidos: ' + allowedExtensions.join(', '));
            fileInput.value = ''; // limpa o campo do arquivo
            fileLabel.textContent = 'Escolher ficheiros'; // reset para o texto original
          } else {
            fileLabel.textContent = fileName; // mostra o nome do arquivo
          }
        }
      });
  
      termsCheckbox.addEventListener('change', function() {
        submitBtn.disabled = !this.checked; // Habilita o botão somente se a checkbox estiver marcada
      });
    });
  
  </script>
  </body>
</html>
