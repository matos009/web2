package com.example.web2.EBANIcontrollers;

import com.example.web2.XUEVImodel.AreaChecker;
import com.example.web2.XUEVImodel.Point;
import com.example.web2.XUEVImodel.PointResult;
import com.example.web2.storage.PointStorage;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;

@WebServlet(name = "AreaCheckServlet", value = "/areacheck-servlet")
public class AreaCheckServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(AreaCheckServlet.class.getName());
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        processRequest(request, response);
    }

    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try{
            String x = request.getParameter("x");
            String y = request.getParameter("y");
            String r = request.getParameter("r");
            logger.info("Получаем параметры запроса и проверяем\n");
            if(x == null || y == null || r == null){
                throw new IllegalArgumentException("X and Y are required");
            }
            var parsedX = Double.parseDouble(x);
            var parsedY = Double.parseDouble(y);
            var parsedR = Double.parseDouble(r);
            logger.info("Создаем точку для проверок\n");
            var point = new Point(parsedX, parsedY, parsedR);
            long startTime = System.nanoTime();
            var result = AreaChecker.fuckedIn(point);
            long endTime = System.nanoTime();
            long executionTime = endTime - startTime;
            String formattedNow = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            PointResult resultPoint = new PointResult(point.x(), point.y(), point.r(), result, executionTime, formattedNow);

            logger.info("Получаем сессию запроса для получения и создания bean\n");
            var session = request.getSession();
            var bean = (PointStorage) session.getAttribute("bean");
            if(bean == null){
                bean = new PointStorage();
                session.setAttribute("bean", bean);
                session.setAttribute("bean", bean);
            }
            bean.addPoint(resultPoint);
            request.setAttribute("point", resultPoint);
            request.getRequestDispatcher("/result.jsp").forward(request, response);
        } catch (NullPointerException | IllegalArgumentException e){
            e.printStackTrace();
            request.setAttribute("errorMessage", "Некорректные параметры. Попробуйте ещё раз.");
            request.getRequestDispatcher("./index.jsp").forward(request, response);
        }
    }
}
