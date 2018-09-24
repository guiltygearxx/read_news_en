package com.azsolutions.service

import org.jsoup.nodes.Element
import org.jsoup.nodes.Node
import org.jsoup.nodes.TextNode;

class HtmlWrapper {

    Element node;

    private def options;

    HtmlWrapper removeEmptyNode(def options) {

        this.options = options;

        removeEmptyNode_(node);

        return this;
    }

    HtmlWrapper removeStyle() {

        removeStyle_(node);

        return this;
    }

    private void removeStyle_(Node node) {

        node.removeAttr("class").removeAttr("style")

        node.childNodes().each { removeStyle_(it) };
    }

    private Boolean removeEmptyNode_(Node node) {

        Boolean shouldRemove = true;

        List<Node> removeNodes = [];

        node.childNodes().each { Node childNode ->

            if (childNode instanceof TextNode) {

                (childNode.text().trim()) && (shouldRemove = false);

            } else {

                if (options?.excludeImg && (childNode instanceof Element) && (((Element) childNode).tagName() == "img")) {

                    shouldRemove = false;

                } else {

                    (!removeEmptyNode_(childNode)) ? (shouldRemove = false) : (removeNodes << childNode);
                }
            }
        }

        removeNodes.each { it.remove() };

        return shouldRemove;
    }
}
