# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Estudantes de Engenharia Informática da UTAD (DEI), atuais e futuros, que procuram eventos do núcleo, apontamentos/material de apoio ao curso, o guia do curso, merchandising e contactos oficiais do NEEI.

## Product Purpose

Hub de informação e serviços do NEEI-UTAD (Núcleo de Estudantes de Engenharia Informática da Universidade de Trás-os-Montes e Alto Douro): divulgar eventos, partilhar apontamentos e o guia do curso, vender merch e ser o ponto de contacto oficial do núcleo. Sucesso é o estudante encontrar rapidamente a informação ou serviço que procura e confiar que é o canal oficial do NEEI.

## Operating Context

- Site estático (HTML/CSS/JS) com componentes PHP para formulários de contacto/apontamentos, usando PHPMailer/SMTP para envio de email.
- Hospedado via GitHub Pages (repo `neei-utad/NEEI-UTAD`), branch `main` estável.
- Páginas principais: início, eventos, guia do curso, apontamentos, merch, links/contactos, política de privacidade, termos de serviço, páginas de workshops pontuais.

## Capabilities and Constraints

- Sem framework/build step; ficheiros HTML/CSS/JS servidos diretamente.
- Formulários dependem de backend PHP (PHPMailer) — qualquer alteração de UI nesses formulários tem de preservar os campos e o fluxo de envio.
- `graphify-out/` mantém um grafo de conhecimento do código; atualizar com `graphify update .` após alterações relevantes.

## Brand Commitments

Identidade visual do NEEI-UTAD (logótipo, nome, cores institucionais) é oficial e fixa — não deve ser alterada livremente num redesign; trabalho futuro deve preservar esta identidade, mesmo ao melhorar layout, tipografia ou animações.

## Product Principles

- A identidade oficial do NEEI-UTAD é inegociável; melhorias visuais trabalham dentro dela, não contra ela.
- Clareza e rapidez de acesso à informação (eventos, apontamentos, contactos) têm prioridade sobre expressão visual ousada.
- O site é o canal de confiança oficial do núcleo — tom e aparência devem reforçar essa credibilidade institucional.
- Simplicidade técnica (sem build step) é uma escolha deliberada, não uma lacuna a corrigir.
