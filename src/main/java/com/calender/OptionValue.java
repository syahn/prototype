package com.calender;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by NAVER on 2017-07-13.
 */

public class OptionValue {

    @JsonProperty("startMonth")
    private int startMonth;

    @JsonProperty("endMonth")
    private int endMonth;

    @JsonProperty("orientation")
    private int orientation;

    public int getStartMonth() {
        return startMonth;
    }

    public void setStartMonth(int startMonth) {
        this.startMonth = startMonth;
    }

    public int getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(int endMonth) {
        this.endMonth = endMonth;
    }

    public int getOrientation() {
        return orientation;
    }

    public void setOrientation(int orientation) {
        this.orientation = orientation;
    }
}
