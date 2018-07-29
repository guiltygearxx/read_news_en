package com.azsolutions.service;

interface RssReaderEventHandler {

    void handleEvent(Map<String, Object> context, String mappingPath);
}
