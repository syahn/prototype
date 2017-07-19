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

    private String tempUrl;
    private String month;

    @Autowired
    private PrintConverter converter;

    @RequestMapping("/month_6")
    public String month_6(){  return "month_6"; }
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

    @ResponseBody
    @RequestMapping("/save-url")
    public void saveUrl(
        @RequestParam("previewUrl") String preview,
        @RequestParam("month") String monthVal
    ){

        tempUrl = preview;
        month = monthVal;
        System.out.println(month);
    }

    @RequestMapping("/preview")
    public String viewPreview(Model model){

        model.addAttribute("previewurl", tempUrl);
        model.addAttribute("month", month);

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