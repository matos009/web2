package com.example.web2.EBANIcontrollers;

import com.example.web2.XUEVImodel.Point;
import com.example.web2.XUEVImodel.Validator;
import com.example.web2.storage.PointStorage;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;

@WebServlet(name = "ControllerServlet", value = "/controller-servlet")
public class ControllerServlet extends HttpServlet {
    private static final String ERROR_MSG = "Incorret data: %s";
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
processRequest(request, response);
    }


    private void processRequest(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
   try {
       String x = request.getParameter("x");
       String y = request.getParameter("y");
       String r = request.getParameter("r");

       if(x == null || y == null || r == null || x.isEmpty() || y.isEmpty() || r.isEmpty()) {
           request.setAttribute("error", String.format(ERROR_MSG, "data(x, y, r) not specified or empty"));
           request.getRequestDispatcher("/error.jsp").forward(request, response);
           return;
       }


       var parsedX = Double.parseDouble(x);
       var parsedY = Double.parseDouble(y);
       var parsedR = Double.parseDouble(r);

       if(!Validator.validateX(parsedX)) {
           request.setAttribute("error", String.format(ERROR_MSG, "x is invalid"));
           request.getRequestDispatcher("/error.jsp").forward(request, response);
           return;
       }

       if(!Validator.validateY(parsedY)) {
           request.setAttribute("error", String.format(ERROR_MSG, "y is invalid"));
           request.getRequestDispatcher("/error.jsp").forward(request, response);
           return;

       }

       if(!Validator.validateR(parsedR)) {
           request.setAttribute("error", String.format(ERROR_MSG, "r is invalid"));
           request.getRequestDispatcher("/error.jsp").forward(request, response);
           return;
       }

       request.getRequestDispatcher("/areacheck-servlet").forward(request, response);

   } catch (NumberFormatException | NullPointerException e) {
       request.setAttribute("error", e.toString());
       request.getRequestDispatcher("/error.jsp").forward(request, response);
   }
    }
}
