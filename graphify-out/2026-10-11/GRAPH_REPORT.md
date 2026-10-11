# Graph Report - public_html  (2026-10-10)

## Corpus Check
- 94 files · ~17,052,288 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 88 file(s) not represented in the graph (top: .ttf 34, .css 27, (none) 11)

## Summary
- 498 nodes · 749 edges · 97 communities (11 shown, 86 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `511af003`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- composer.json
- SMTP
- PHPMailer
- Exception
- t
- Submit.py
- SendEmailFail.py
- PHPMailer – A full-featured email creation and transfer class for PHP
- OAuth
- .msgHTML
- POP3
- os
- Google.py
- notes.js
- DSNConfigurator
- SendEmail.php
- menu.js
- calendar.js
- events.js
- utad-code-and-conquer-mockup/js/popup.js
- utadsummit2022-inativo-backup/js/popup.js
- script.js
- CountDownTimer
- CLAUDE.md
- NeeiFooter

## God Nodes (most connected - your core abstractions)
1. `PHPMailer` - 128 edges
2. `SMTP` - 44 edges
3. `Exception` - 31 edges
4. `t` - 23 edges
5. `PHPMailer – A full-featured email creation and transfer class for PHP` - 16 edges
6. `execute()` - 13 edges
7. `POP3` - 12 edges
8. `suggest` - 10 edges
9. `require-dev` - 9 edges
10. `DSNConfigurator` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Installation & loading` --references--> `Exception`  [INFERRED]
  php/phpmailer/README.md → php/phpmailer/src/Exception.php
- `Installation & loading` --references--> `SMTP`  [INFERRED]
  php/phpmailer/README.md → php/phpmailer/src/SMTP.php
- `obter_conexao_bd()` --calls--> `Exception`  [INFERRED]
  php/confirm.php → php/phpmailer/src/Exception.php
- `verificar_token()` --calls--> `Exception`  [INFERRED]
  php/confirm.php → php/phpmailer/src/Exception.php
- `confirmar_submissao()` --calls--> `Exception`  [INFERRED]
  php/confirm.php → php/phpmailer/src/Exception.php

## Import Cycles
- None detected.

## Communities (97 total, 86 thin omitted)

### Community 0 - "composer.json"
Cohesion: 0.04
Nodes (44): dealerdirect/phpcodesniffer-composer-installer, authors, autoload, autoload-dev, psr-4, psr-4, config, allow-plugins (+36 more)

### Community 3 - "Exception"
Cohesion: 0.14
Nodes (8): confirmar_submissao(), escrever_log(), executar_script_python(), obter_conexao_bd(), redirecionar_para(), validar_parametros(), verificar_token(), Exception

### Community 5 - "Submit.py"
Cohesion: 0.13
Nodes (7): criar_arquivo_texto(), criar_pasta(), enviar_email(), execute(), fazer_upload_arquivo_drive(), remover_da_base_de_dados(), scan_file_with_metadefender()

### Community 6 - "SendEmailFail.py"
Cohesion: 0.12
Nodes (6): enviar_email(), deletar_da_base_de_dados(), deletar_pasta_google_drive(), enviar_email(), obter_informacoes_primeira_pasta(), pesquisar_na_base_por_nome()

### Community 7 - "PHPMailer – A full-featured email creation and transfer class for PHP"
Cohesion: 0.09
Nodes (19): A Simple Example, Changelog, Contributing, Documentation, Features, History, Installation & loading, Legacy versions (+11 more)

### Community 11 - "os"
Cohesion: 0.17
Nodes (5): obter_dados_email(), deletar_arquivos_em_diretorio(), deletar_arquivos_em_diretorio(), deletar_arquivo_especifico(), verificar_e_deletar_se_necessario()

### Community 13 - "Google.py"
Cohesion: 0.24
Nodes (3): criar_servico(), enviar_email(), verificar_arquivos()

### Community 14 - "notes.js"
Cohesion: 0.27
Nodes (10): changeType(), changeYear(), displayNotes(), filterNotes(), notes, typeDisplay, types, updateFilterUI() (+2 more)

### Community 17 - "SendEmail.php"
Cohesion: 0.33
Nodes (5): enviar_email_confirmacao(), escrever_log(), limpar_pasta_uploads(), validar_csrf(), validar_ficheiro()

### Community 18 - "menu.js"
Cohesion: 0.25
Nodes (4): breakpoints, notificationsBtn, page, themeBtn

### Community 19 - "calendar.js"
Cohesion: 0.29
Nodes (5): calendar, container, Evento, eventos, options

## Knowledge Gaps
- **86 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PHPMailer` connect `PHPMailer` to `PHPMailer.php`, `.setBoundaries`, `SMTP`, `Exception`, `PHPMailer – A full-featured email creation and transfer class for PHP`, `OAuth`, `.msgHTML`, `.preSend`, `DSNConfigurator`, `.createBody`, `SendEmail.php`, `.addOrEnqueueAnAddress`, `.DKIM_Add`, `.clearQueuedAddresses`, `.wrapText`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Are the 26 inferred relationships involving `Exception` (e.g. with `confirmar_submissao()` and `obter_conexao_bd()`) actually correct?**
  _`Exception` has 26 INFERRED edges - model-reasoned connections that need verification._
- **Should `composer.json` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Why does `SMTP` connect `SMTP` to `PHPMailer – A full-featured email creation and transfer class for PHP`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Should `SMTP` be split into smaller, more focused modules?**
  _Cohesion score 0.09745293466223699 - nodes in this community are weakly interconnected._
- **Why does `Exception` connect `Exception` to `PHPMailer – A full-featured email creation and transfer class for PHP`, `.preSend`, `DSNConfigurator`, `.createBody`, `SendEmail.php`, `.addOrEnqueueAnAddress`, `.DKIM_Add`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `PHPMailer` be split into smaller, more focused modules?**
  _Cohesion score 0.04878048780487805 - nodes in this community are weakly interconnected._