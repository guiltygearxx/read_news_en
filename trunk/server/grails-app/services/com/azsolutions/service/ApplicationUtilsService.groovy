package com.azsolutions.service

import grails.gorm.transactions.Transactional
import grails.web.databinding.DataBindingUtils
import groovy.time.TimeCategory

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

    def runExpression(String expression, Map variableValueMap) {

        Binding binding = new Binding();

        variableValueMap.each { def name, def value ->

            binding.setVariable(name, value);
        }

        GroovyShell shell = new GroovyShell(binding);

        return shell.evaluate(expression);
    }

    void scan(Date fromDate, Date toDate, Integer scanRangeInMinutes, Integer maxScannedTimes, Closure processClosure) {

        Date fromDate_;
        Date toDate_ = toDate;

        while (toDate_ > fromDate) {

            use(TimeCategory) { fromDate_ = [toDate_ - scanRangeInMinutes.minutes, fromDate].max() }

            ((maxScannedTimes ?: 1)..1).each { Integer scannedTimes ->

                processClosure(fromDate_, toDate_, scannedTimes - 1);
            }

            toDate_ = fromDate_;
        }
    }

    void scan(Date fromDate, Date toDate, Integer scanRangeInMinutes, Closure processClosure) {

        this.scan(fromDate, toDate, scanRangeInMinutes, 1, processClosure);
    }

    static void main(String[] args) {

        println new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss").format(new Date());
    }
}
