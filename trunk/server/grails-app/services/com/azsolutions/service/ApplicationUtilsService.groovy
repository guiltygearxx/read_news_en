package com.azsolutions.service

import grails.gorm.transactions.Transactional
import grails.web.databinding.DataBindingUtils

import java.text.SimpleDateFormat

@Transactional
class ApplicationUtilsService {

    def bindData(def target, def source) {

        DataBindingUtils.bindObjectToInstance(target, source, null, null, "");

        return target;
    }

    Date parseRssDate(String dateStr, String format, String timeZone) {

        if (!dateStr) return null;

        SimpleDateFormat sdf = new SimpleDateFormat(format, Locale.ENGLISH);

        (timeZone) && (sdf.setTimeZone(TimeZone.getTimeZone(timeZone)));

        return sdf.parse(dateStr);
    }
}
