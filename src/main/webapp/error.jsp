<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ошибка</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .error-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: red;
        }
        p {
            font-size: 18px;
        }
    </style>
</head>
<body>
<div class="error-container">
    <h1>Произошла ошибка</h1>
    <% String error = (String) request.getAttribute("error");%>
    <p><strong>Сообщение об ошибке:</strong> <%=error%></p>
    <a href="index.jsp">Вернуться на главную страницу</a>
</div>
</body>
</html>