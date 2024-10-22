package com.example.web2.storage;

import com.example.web2.XUEVImodel.Point;
import com.example.web2.XUEVImodel.PointResult;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;

import java.io.Serializable;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@SessionScoped
@Stateful
public class PointStorage implements Serializable {
    private final  List<PointResult> points = new CopyOnWriteArrayList<>();

    public void addPoint(PointResult point){
        points.add(point);
    }

    public List<PointResult> getPoints(){
        return points;
    }
}
