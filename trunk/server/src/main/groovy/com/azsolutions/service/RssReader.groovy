package com.azsolutions.service

import com.azsolutions.ApplicationConstant
import com.azsolutions.bean.Rss
import com.azsolutions.domain.RssConfig

class RssReader {

    ApplicationUtilsService applicationUtilsService;

    JsoupUtilsService jsoupUtilsService;

    RssConfigService rssConfigService;

    RssReaderEventHandler eventHandler;

    private Map<String, Object> context;

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

        def obj;

        switch (mappingPath) {

            case "root.image":

                this.context << [image: (obj = new Rss.Image())];

                break;

            case "root.items":

                this.context << [item: (obj = new Rss.Item())];

                break;

            case "root.items.thumbnails":

                this.context << [thumbnail: (obj = new Rss.Thumbnail())];

                break;

            default:

                this.context << [rss: (obj = new Rss())];

                break;
        }

        return obj;
    }

    private Object runExpression(def childNodes, String expression) {

        return !expression ? childNodes :
                applicationUtilsService.runExpression(expression, [childNodes: childNodes, utils: jsoupUtilsService]);
    }

    private void raiseEvent(String mappingPath) {

        this.eventHandler.handleEvent(this.context, mappingPath);
    }

    private List<String> getProperties(String mappingPath) {

        switch (mappingPath) {

            case "root.image":
                return ["url", "title", "link"];


            case "root.items":
                return ["title", "link", "pubDate", "guid", "description", "thumbnails"];

            case "root.items.thumbnails":
                return ["type", "width", "height", "url"];

            default:
                return ["title", "description", "link", "image", "items"];
        }
    }

    private void parseXML(Map config, def node, String mappingPath) {

        def bean = initNewBean(mappingPath);

        Boolean isEventRise = false;

        getProperties(mappingPath).each { String key ->

            Map propertyConfig = config[key];

            if (!propertyConfig) return;

            String path = propertyConfig["path"];

            String expression = (propertyConfig["expression"] as String)?.trim();

            def childNodes = path ? getChildNodes(node, path) : node;

            String convertType = getConvertType(mappingPath + "." + key);

            switch (convertType) {

                case "integer":

                    bean."${key}" = convertToInteger(childNodes);

                    break;

                case "object":

                    if (!isEventRise) {

                        this.raiseEvent(mappingPath);

                        isEventRise = true;
                    };

                    parseXML(propertyConfig["config"], childNodes, mappingPath + "." + key);

                    break;

                case "list":

                    def propertyConfig_config = propertyConfig["config"];

                    if (!isEventRise) {

                        this.raiseEvent(mappingPath);

                        isEventRise = true;
                    };

                    propertyConfig_config && (runExpression(childNodes, expression).each {

                        parseXML(propertyConfig_config, it, mappingPath + "." + key);
                    });

                    break;

                default:

                    bean."${key}" = expression ? runExpression(childNodes, expression) : childNodes?.text()?.trim();

                    break;
            }
        }

        if (!isEventRise) {

            this.raiseEvent(mappingPath);

            isEventRise = true;
        };
    }

    Rss readRss(RssConfig rssConfig) {

        String url = rssConfig.rssUrl;

//        println "ReadRssService.readRss: url=${url}";

        Map mappingConfig = rssConfigService.getConfigJsonByRssConfigId(rssConfig.id);

        XmlSlurper parser = new XmlSlurper();

        BufferedReader reader = url.toURL().newReader(requestProperties: ['User-Agent': ApplicationConstant.HTTP_REQUEST_DEFAULT_USER_AGENT]);

        def channel = parser.parse(reader).channel;

        this.context = [:];

        return parseXML(mappingConfig, channel, "root");
    }
}
