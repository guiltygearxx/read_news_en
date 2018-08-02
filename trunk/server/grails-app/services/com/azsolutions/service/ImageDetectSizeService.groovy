package com.azsolutions.service

import com.azsolutions.bean.ImageSize
import com.azsolutions.domain.Image
import grails.gorm.transactions.Transactional

@Transactional
class ImageDetectSizeService {

    def imageUtilsService;

    private List<Image> getMissingSizeImages(Integer max) {

        return Image.createCriteria().list([max: max], {

            or {
                isNull("width");
                isNull("height");
            }

            eq("isDeleted", false);
        });
    }

    def detect() {

        List<Image> images;

        Date now = new Date();

        while (images = this.getMissingSizeImages(100)) {

//        images = this.getMissingSizeImages(1000);

            println images.size();

            images.each { Image image ->

                try {

                    ImageSize size = imageUtilsService.detectImageSize(image.url);

                    if (size) image.with {

                        height = size.height;
                        width = size.width;
                        lastModifiedTime = now;
                        lastModifiedUser = 'system';
                    }

                } catch (FileNotFoundException e) {

                    image.with {

                        isDeleted = false;
                        lastModifiedTime = now;
                        lastModifiedUser = 'system';
                    }
                } catch (Exception e) {

                    println "ImageDetectSizeService.detect: error: image.id=${image.id}";

                    e.printStackTrace();
                }
            }

            Image.withSession { def session ->

                images.each { it.save() };

                session.flush();

                session.clear();
            }
        }
    }
}
