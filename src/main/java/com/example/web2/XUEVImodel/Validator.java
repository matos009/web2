package com.example.web2.XUEVImodel;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;

public class Validator {
    private static Set<Double> ALLOWED_RADIUS = IntStream.rangeClosed(1, 5)
            .mapToDouble(i -> i)
            .boxed()
            .collect(Collectors.toSet());


    public static boolean validateX(double x){
        if(x > 3 || x < -5){
            return false;
        }
        return true;
    }
    public static boolean validateY(double y){
        if(y > 3 || y < -5){
            return false;
        }
        return true;
    }
    public static boolean validateR(double r){
        if(!ALLOWED_RADIUS.contains(r)){
            return false;
        }
        return true;
    }
}
