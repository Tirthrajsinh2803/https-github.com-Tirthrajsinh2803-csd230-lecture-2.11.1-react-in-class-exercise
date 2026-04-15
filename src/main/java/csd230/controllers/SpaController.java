package csd230.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping(value = {
            "/",
            "/login",
            "/books",
            "/magazines",
            "/add-book",
            "/add-magazine"
    })
    public String forward() {
        return "forward:/index.html";
    }
}