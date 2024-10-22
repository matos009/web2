package com.example.web2.XUEVImodel;

public class AreaChecker {
    public static boolean fuckedIn(Point point) {
        var x = point.x();
        var y = point.y();
        var r = point.r();

        if (x > 0 && y < 0) {
            return false;
        }
        if (x > 0 && y > 0) {
            if (x * x + y * y <= r * r) {
                return true;
            }
        }

        if (x < 0 && y < 0) {
            if (x > -r / 2 && y > -r) {
                return true;
            }
        }

        if (x < 0 && y > 0) {
            if (x / 2 + r / 2 > y) {
                return true;
            }
        }

        return false;
    }
}
