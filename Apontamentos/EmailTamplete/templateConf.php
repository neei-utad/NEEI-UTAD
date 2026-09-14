<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmar Processo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
            text-align: center;
        }
        .container img {
            max-width: 150px; /* Control image size */
            margin-bottom: 20px;
        }
        h1 {
            color: #333;
            font-size: 24px;
        }
        p {
            color: #555;
            font-size: 16px;
            margin: 10px 0 20px; /* Adjust spacing */
        }
        .button {
            display: inline-block;
            padding: 10px 25px;
            background-color: #ffa500;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px; /* Make the button text larger */
            box-shadow: 0 2px 5px rgba(0,0,0,0.2); /* Slight shadow for the button for better visibility */
        }
        .footer {
            font-size: 14px;
            color: #777;
            text-align: center;
            padding: 20px 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://neei-utad.pt/assets/images/logos/logo.png" alt="NEEI Logo">
        <h1>Obrigado/a %name% por ter submetido os apontamentos</h1>
        <p>Por favor clique no botão abaixo para confirmar.</p>
        <a href="%confirmationLink%" class="button">Confirmar</a>
        <p>Obrigado, NEEI-Apontamentos</p>
        <div class="footer">
            &copy; Copyright 2023-2024 NEEI Todos os Direitos Reservados
        </div>
    </div>
</body>
</html>
