package com.example.web2.XUEVImodel;

public record Point(double x, double y, double r) {
    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

}