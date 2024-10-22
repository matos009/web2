<%@ page import="com.example.web2.storage.PointStorage" %>
<%@ page import="com.example.web2.XUEVImodel.PointResult" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Проверка попадания на плоскости</title>
  <link rel="stylesheet" href="styles/styles.css">
  <script src="scripts/script.js" defer></script>
</head>

<body>
<header>
  <h2>Матевосян Артур Русланович</h2>
  <p1>Р3232</p1>
  <p>409100</p>
</header>
<section>
  <div id="error" hidden></div>

  <form id="coordinate-form" method="GET">

    <label>Изменение X: </label>
    <div id = "x-select">
      <label for="x-5">X=-5</label>
      <input type="radio" id="x-5" name="x" value="-5" required>

      <label for="x-4">X=-4</label>
      <input type="radio" id="x-4" name="x" value="-4">

      <label for="x-3">X=-3</label>
      <input type="radio" id="x-3" name="x" value="-3">

      <label for="x-2">X=-2</label>
      <input type="radio" id="x-2" name="x" value="-2">

      <label for="x-1">X=-1</label>
      <input type="radio" id="x-1" name="x" value="-1">

      <label for="x0">X=0</label>
      <input type="radio" id="x0" name="x" value="0">

      <label for="x1">X=1</label>
      <input type="radio" id="x1" name="x" value="1">

      <label for="x2">X=2</label>
      <input type="radio" id="x2" name="x" value="2">

      <label for="x3">X=3</label>
      <input type="radio" id="x3" name="x" value="3">
    </div>

    <!-- Поле для Y -->
    <label for="y-select">Изменение Y: </label>
    <input type="text" name="y" id="y-select" placeholder="Введите Y (-5...3)" required pattern="-?[0-9]+(\.[0-9]+)?">

    <!-- Радиокнопки для R -->
    <div id = "r-select">
      <label for="r1">R=1</label>
      <input type="radio" id="r1" name="r" value="1" required>

      <label for="r2">R=2</label>
      <input type="radio" id="r2" name="r" value="2">

      <label for="r3">R=3</label>
      <input type="radio" id="r3" name="r" value="3">

      <label for="r4">R=4</label>
      <input type="radio" id="r4" name="r" value="4">

      <label for="r5">R=5</label>
      <input type="radio" id="r5" name="r" value="5">
    </div>

    <button type="submit">Отправить</button>
  </form>
</section>

<div id="coordinate-plane">
  <svg width="300" height="300">
    <line x1="150" y1="0" x2="150" y2="300" stroke="black"/>
    <line x1="0" y1="150" x2="300" y2="150" stroke="black"/>

    <text x="285" y="145" fill="white">X</text>
    <text x="155" y="10">Y</text>

    <text x="255" y="145" fill="red">R</text>
    <text x="195" y="145" fill="black">R/2</text>

    <text x="25" y="145" fill="red">-R</text>
    <text x="90" y="145" fill="black">-R/2</text>

    <text x="155" y="45" fill="red">R</text>
    <text x="155" y="95" fill="black">R/2</text>

    <text x="155" y="255" fill="red">-R</text>
    <text x="155" y="205" fill="black">-R/2</text>

<%--    <rect x="100" y="150" width="50" height="100" fill="blue" fill-opacity="0.3"/>--%>

<%--    <!-- Треугольник -->--%>
<%--    <polygon points="150,150 35,150 150,90" fill="blue" fill-opacity="0.3"/>--%>

<%--    <!-- Сектор круга -->--%>
<%--    <path d="M 150 150 L 150 40 A 100 100 0 0 1 260 150 Z" fill="blue" fill-opacity="0.3"/>--%>
  </svg>
</div>

<table id="result-table">
  <thead>
  <tr>
    <th>X</th>
    <th>Y</th>
    <th>R</th>
    <th>Время</th>
    <th>Время выполнения</th>
    <th>Результат</th>
  </tr>
  </thead>
  <tbody>

  <%PointStorage points = (PointStorage) session.getAttribute("bean");
  if(points != null){

  for (PointResult pointResult : points.getPoints()){
  %>
  <tr>
    <td><%=pointResult.getX()%></td>
    <td><%=pointResult.getY()%></td>
    <td><%=pointResult.getR()%></td>
    <td><%=pointResult.getTime()%></td>
    <td><%=pointResult.getRunTime()%></td>
    <td><%=pointResult.isResult() ? "Goal" : "Missed"%></td>
  </tr>
  <%}}else {%>
  <tr>
    <td colspan="6">Нет данных для отображения.</td>
  </tr>
  <%}%>
  </tbody>
</table>
</body>
</html>