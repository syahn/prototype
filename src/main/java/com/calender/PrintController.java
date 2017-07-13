package com.calender;

/**
 * Created by NAVER on 2017-07-06.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

/**
 * Created by saltfactory on 10/29/15.
 */
@Controller
@EnableAutoConfiguration
public class PrintController {

    @Autowired
    private PrintConverter converter;

    @RequestMapping("/month_6")
    public String month_6(){
        return "month_6";
    }

    @RequestMapping("/month_7")
    public String month_7() { return "month_7"; }

    @RequestMapping("/month_8")
    public String month_8() {
        return "month_8";
    }
    @RequestMapping("/month_9")
    public String month_9() {
        return "month_9";
    }
    @RequestMapping("/month_10")
    public String month_10() {
        return "month_10";
    }

    @PostMapping("/preview")
    public String viewPreview(@RequestParam String month, Model model){

        PrintRequest print = new PrintRequest();

        String extendIn = "C:/Users/NAVER/Desktop/prototype/target/classes/static/html/month_" + month + ".html";
        String extendOut = "C:/Users/NAVER/Desktop/prototype/target/classes/static/images/sample" + month + ".png";

        print.setIn(extendIn);
        print.setOut(extendOut);

        model.addAttribute("month", month);

        //가로방향 미리보기 이미지
        converter.createImage(print,0);

        //세로방향 미리보기 이미지 생성해둠
        String tempExtendOut = "C:/Users/NAVER/Desktop/prototype/target/classes/static/images/sample_vertical"+month+".png";
        print.setOut(tempExtendOut);
        converter.createImage(print,1);

        return "preview";
    }

    //converter for pdf save and print
    @RequestMapping(value = "/convert", method = RequestMethod.POST)
    public String convert(
        @RequestParam("startMonth") int startMonth,
        @RequestParam("endMonth") int endMonth,
        @RequestParam("orientation") int orientation
    ){
        //converting html to pdf - by url
        try {
            converter.makeAPdf(startMonth, endMonth, orientation);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "preview";
    }
}