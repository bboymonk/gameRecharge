package com.wjb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Created by Administrator on 2017/9/1.
 */
@Controller
public class CaptchaController {
    private static final int WIDTH = 80;
    private static final int HEIGHT = 26;
    private static final int SIZE = 4;
    private static final int LINES = 80;
    private static final String[] CHARS = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F",
            "G", "H", "I", "J", "K", "L", "M", "N" };
    private static final int FONT_SIZE = 23;
    private static Random in = new Random();
    private static final Color[] colors = { new Color(0, 0, 0), new Color(240, 124, 21), new Color(112, 112, 112),
            new Color(88, 88, 255), new Color(255, 88, 88) };

    private static Map<String, Object> randomImage() {
        BufferedImage image = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        StringBuffer captcha = new StringBuffer();
        Graphics graphics = image.getGraphics();
        graphics.setColor(new Color(234, 234, 234)); // 画出矩形区域
        graphics.fillRect(0, 0, WIDTH, HEIGHT);

        // 随机画字符
        for (int i = 1; i <= SIZE; i++) {
            graphics.setColor(randomCharColor());
            int j = in.nextInt(CHARS.length);
            graphics.setFont(new Font("宋体", Font.BOLD + Font.ITALIC, FONT_SIZE));
            graphics.drawString(CHARS[j], 3 + (i - 1) * WIDTH / SIZE, HEIGHT / 2 + 8);
            captcha.append(CHARS[j]);
        }

        // 随机画干扰点
        for (int i = 1; i <= LINES; i++) {
            int x = in.nextInt(WIDTH - 1);
            int y = in.nextInt(HEIGHT);
            graphics.setColor(randomColor());
            graphics.setFont(new Font("Arial", Font.ITALIC, 1));
            graphics.drawLine(x, y, x + 1, y);
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("captcha", captcha.toString());
        map.put("image", image);
        return map;
    }

    /**
     * 获取随机颜色的方法；
     *
     * @return
     */
    private static Color randomColor() {
        return new Color(in.nextInt(256), in.nextInt(256), in.nextInt(256));
    }

    private static Color randomCharColor() {
        return colors[in.nextInt(colors.length)];
    }

    @RequestMapping("/getCode")
    public void captcha(HttpSession session, HttpServletRequest req, HttpServletResponse resp) throws Exception {



        resp.setContentType("image/jpeg");
        Long imgtime = (Long)session.getAttribute("imgtime");
        if (imgtime != null && System.currentTimeMillis() - imgtime <= 2000) {
            BufferedImage image = (BufferedImage)session.getAttribute("image");
            ImageIO.write(image, "JPEG", resp.getOutputStream());
            return;
        }

        Map<String, Object> map = randomImage();
        session.setAttribute("imgcaptcha", map.get("captcha"));
        session.setAttribute("imgtime", System.currentTimeMillis());
        BufferedImage image = (BufferedImage) map.get("image");
        session.setAttribute("image", image);
        ImageIO.write(image, "JPEG", resp.getOutputStream());
        map.clear();
    }
}
