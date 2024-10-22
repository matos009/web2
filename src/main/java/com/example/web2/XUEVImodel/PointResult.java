package com.example.web2.XUEVImodel;

public class PointResult {
    private double x;
    private double y;
    private double r;
    private String time;
    private  long runTime;
    private boolean result;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public long getRunTime() {
        return runTime;
    }

    public void setRunTime(long runTime) {
        this.runTime = runTime;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }




    public PointResult(double x, double y, double r, boolean result,  long runTime, String time) {
        this.y = y;
        this.runTime = runTime;
        this.time = time;
        this.r = r;
        this.x = x;
        this.result = result;
    }


    @Override
    public String toString() {
        return "PointResult{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", time='" + time + '\'' +
                ", runTime=" + runTime +
                ", result=" + result +
                '}';
    }
}
