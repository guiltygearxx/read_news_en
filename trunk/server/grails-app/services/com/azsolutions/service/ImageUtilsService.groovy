package com.azsolutions.service

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.ImageSize
import grails.converters.JSON
import grails.gorm.transactions.Transactional

import javax.imageio.ImageIO
import java.awt.image.BufferedImage

@Transactional
class ImageUtilsService {

    public static final int HTTP_CONNECT_TIME_OUT = 1000;
    public static final int HTTP_READ_TIME_OUT = 1000;

    ImageSize detectImageSize(String urlStr) {

        URL url = urlStr.toURL();

        HttpURLConnection connection = url.openConnection();

        connection.setRequestProperty("User-Agent", ApplicationConstant.HTTP_REQUEST_DEFAULT_USER_AGENT);
        connection.setConnectTimeout(HTTP_CONNECT_TIME_OUT);
        connection.setReadTimeout(HTTP_READ_TIME_OUT);

        BufferedImage image = ImageIO.read(connection.getInputStream());

        return new ImageSize(height: image.height, width: image.width);
    }
}
