CREATE TABLE aznews.hot_news_config
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  rss_url            varchar(1000),
  last_modified_user varchar(255),
  last_modified_time datetime,
  root_expression    text,
  config_json        text,
  date_format        varchar(50),
  time_zone          varchar(50)
);

INSERT INTO aznews.hot_news_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, root_expression, config_json, date_format, time_zone)
VALUES ('c671cd8f-8c80-4719-be04-3666804dcebd', 0, false, 'admin', '2018-07-24 16:24:03', 'http://vietnamnet.vn/',
        'return node.selectFirst(''.TopArticle'')',
        '{"title":{"expression":"return node.selectFirst(''.articletype_1'').text()"},"link":{"expression":"return \\"http://vietnamnet.vn\\" + node.selectFirst(''.articletype_1'').attr(\\"href\\")"},"guid":{"expression":"return \\"http://vietnamnet.vn\\" + node.selectFirst(''.articletype_1'').attr(\\"href\\")"},"pubDate":{"expression":""},"description":{"expression":" return node.selectFirst(''.TopLead'').text()"},"thumbnails":{"expression":" return node.select(\\"img\\")","config":{"url":{"expression":"return node.attr(\\"src\\")"},"width":{"expression":"return node.attr(\\"width\\")"},"height":{"expression":"return node.attr(\\"height\\");"}}}}',
        null, 'GMT+7');