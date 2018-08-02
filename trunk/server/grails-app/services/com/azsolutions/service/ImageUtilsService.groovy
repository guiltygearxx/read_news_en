package com.azsolutions.service

import com.azsolutions.bean.ImageSize
import grails.gorm.transactions.Transactional

import javax.imageio.ImageIO
import java.awt.image.BufferedImage

@Transactional
class ImageUtilsService {

    ImageSize detectImageSize(String url) {

        BufferedImage image = ImageIO.read(url.toURL());

        return new ImageSize(height: image.height, width: image.width);
    }
}
