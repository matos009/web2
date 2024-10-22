<%@ page import="com.example.web2.XUEVImodel.Point" %>
<%@ page import="com.example.web2.XUEVImodel.PointResult" %><%--
  Created by IntelliJ IDEA.
  User: arturmatevosan
  Date: 17.10.2024
  Time: 05:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Result</title>
</head>
<body>
<h1>Result of hitting the point</h1>>
<table>
    <% PointResult point = (PointResult) request.getAttribute("point");%>
    <tr><th>parameter</th><th>value</th>></tr>
    <tr><th>x</th><th><%=point.getX()%></th>></tr>
    <tr><th>y</th><th><%=point.getY()%></th>></tr>
    <tr><th>r</th><th><%=point.getR()%></th>></tr>
    <tr><th>result</th><th><%=point.isResult()%></th>></tr>
    <a href="index.jsp">Вернуться на главную страницу</a>
</table>>

</body>
</html>
