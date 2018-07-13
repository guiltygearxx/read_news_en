package com.azsolutions.service

import com.azsolutions.bean.Rss
import com.azsolutions.domain.RssConfig
import grails.converters.JSON
import grails.gorm.transactions.Transactional
import groovy.util.slurpersupport.NodeChildren
import org.xml.sax.InputSource

@Transactional
class ReadRssService {

    def applicationUtilsService;
    def jsoupUtilsService;

    private Object getChildNodes(def node, String path) {

        path.split("\\.").each { node = node?."${it}"; };

        return node;
    }

    private Integer convertToInteger(def node) {

        if (node == null || !(node as String)) return null;

        return (node as String) as Integer;
    }

    private String getConvertType(String mappingPath) {

        switch (mappingPath) {

            case "root.image":
                return "object";

            case "root.items":
            case "root.items.thumbnails":
                return "list";

            case "root.items.thumbnails.height":
            case "root.items.thumbnails.width":
                return "integer";

            default:
                return "string";
        }
    }

    private Object initNewBean(String mappingPath) {

        switch (mappingPath) {

            case "root.image":
                return new Rss.Image();

            case "root.items":
                return new Rss.Item();

            case "root.items.thumbnails":
                return new Rss.Thumbnail();

            default:
                return new Rss();
        }
    }

    private Object runExpression(def childNodes, String expression) {

        return !expression ? childNodes :
                applicationUtilsService.runExpression(expression, [childNodes: childNodes, utils: jsoupUtilsService]);
    }

    private Object parseXML(Map config, def node, String mappingPath) {

        def bean = initNewBean(mappingPath);

        config.keySet().each { String key ->

            Map propertyConfig = config[key];

            String path = propertyConfig["path"];

            String expression = (propertyConfig["expression"] as String)?.trim();

            def childNodes = path ? getChildNodes(node, path) : node;

            String convertType = getConvertType(mappingPath + "." + key);

            switch (convertType) {

                case "integer":
                    bean."${key}" = convertToInteger(childNodes);
                    break;

                case "object":
                    bean."${key}" = parseXML(propertyConfig["config"], childNodes, mappingPath + "." + key);
                    break;

                case "list":

                    def propertyConfig_config = propertyConfig["config"];

                    bean."${key}" = !propertyConfig_config ? null : runExpression(childNodes, expression).collect {

                        return parseXML(propertyConfig_config, it, mappingPath + "." + key);
                    };

                    break;

                default:
                    bean."${key}" = expression ? runExpression(childNodes, expression) : childNodes?.text()?.trim();
                    break;
            }
        }

        return bean;
    }

    Rss readRss(RssConfig rssConfig) {

        String json = rssConfig.configJson;

        String url = rssConfig.rssUrl;

//        println "ReadRssService.readRss: url=${url}";

        Map mappingConfig = JSON.parse(json);

        XmlSlurper parser = new XmlSlurper();

        BufferedReader reader = url.toURL().newReader(requestProperties: ['User-Agent': 'AZNews']);

        def channel = parser.parse(reader).channel;

        return parseXML(mappingConfig, channel, "root");
    }
}
