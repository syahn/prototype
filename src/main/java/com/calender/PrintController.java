package com.calender;

/**
 * Created by NAVER on 2017-07-06.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
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

    @PostMapping("/preview")
    public String viewPreview(HttpServletResponse response, @RequestParam String month, @ModelAttribute PrintRequest print, Model model){

        String extendIn = "C:/Users/NAVER/Desktop/prototype/target/classes/static/html/month_" + month + ".html";
        String extendOut = "C:/Users/NAVER/Desktop/prototype/target/classes/static/images/sample" + month + ".png";

        print.setIn(extendIn);
        print.setOut(extendOut);

        model.addAttribute("month", month);

        converter.createImage(print, response);

        //세로방향 미리보기 이미지 생성해둠
        String tempExtendOut = "C:/Users/NAVER/Desktop/prototype/target/classes/static/images/sample_vertical.png";
        print.setOut(tempExtendOut);
        converter.createImageVetical(print, response);

        return "preview";
    }

    @RequestMapping(value = "/preview/pdfview", method = RequestMethod.POST)
    public void pdf(HttpServletResponse response, @ModelAttribute PrintRequest print) {
        /*@RequestBody WkhtmlRequest request, */
        converter.create(print, response);
    }

    //converter for pdf save and print
    @RequestMapping(value = "/convert/{startMonth}/{endMonth}/{orientation}/{type}")
    public String convert(
            @PathVariable("startMonth") String startMonth,
            @PathVariable("endMonth") String endMonth,
            @PathVariable("orientation") int orientation,
            @PathVariable("type") String type
    ){

        int start = Integer.parseInt(startMonth);//시작달
        int end = Integer.parseInt(endMonth);//끝달

        //converting html to pdf - by url
        try {
            converter.makeAPdf(start, end, orientation);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return type.equals("print") ? "print" : "save";
    }
}