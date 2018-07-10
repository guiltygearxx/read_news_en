CREATE TABLE aznews.rss_config
(
    id varchar(50) PRIMARY KEY NOT NULL,
    version bigint(20) NOT NULL,
    is_deleted bit(1),
    last_modified_user varchar(255),
    last_modified_time datetime,
    rss_url varchar(1000),
    config_json text,
    rss_source_id varchar(50),
    date_format varchar(50),
    time_zone varchar(50)
);
INSERT INTO aznews.rss_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, config_json, rss_source_id, date_format, time_zone) VALUES ('10c419dc-4cf8-4567-a729-83938d79c8ce', 0, false, 'admin', '2018-06-27 14:18:01', 'http://vietnamnet.vn/rss/home.rss ', '{"title":{"path":"title"},"description":{"path":"description"},"link":{"path":"link"},"items":{"path":"item","config":{"title":{"path":"title"},"link":{"path":"link"},"pubDate":{"path":"pubDate"},"guid":{"path":"link"},"description":{"path":"description"},"thumbnails":{"path":"image","config":{"url":{"path":""}}}}}}', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', 'dd/mm/yyyy', 'GMT+7');
INSERT INTO aznews.rss_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, config_json, rss_source_id, date_format, time_zone) VALUES ('2b9a7053-2ea2-4f45-9ba3-044b40429563', 0, true, 'admin', '2018-06-27 14:18:01', 'http://dantri.com.vn/trangchu.rss', '{"title":{"path":"title"},"description":{"path":"description"},"link":{"path":"link"},"image":{"path":"image","config":{"url":{"path":"url"},"title":{"path":"title"},"link":{"path":"link"}}},"items":{"path":"item","config":{"title":{"path":"title"},"link":{"path":"link"},"pubDate":{"path":"pubDate"},"guid":{"path":"guid"},"description":{"path":"description"}}}}', '3e99c9aa-c83c-4c13-8ff5-a8df7153a577', 'EEE, dd MMM yyyy HH:mm:ss', 'GMT+7');
INSERT INTO aznews.rss_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, config_json, rss_source_id, date_format, time_zone) VALUES ('39a80ceda7884e98b3ebe33c2769944e', 0, true, 'admin', '2018-06-23 04:20:17', 'http://feeds.foxnews.com/foxnews/latest?format=xml', '{"title":{"path":"title"},"description":{"path":"description"},"link":{"path":"link"},"image":{"path":"image","config":{"url":{"path":"url"},"title":{"path":"title"},"link":{"path":"link"}}},"items":{"path":"item","config":{"title":{"path":"title"},"link":{"path":"link"},"pubDate":{"path":"pubDate"},"guid":{"path":"guid"},"description":{"path":"description"},"thumbnails":{"path":"group.content","config":{"type":{"path":"@medium"},"width":{"path":"@width"},"height":{"path":"@height"},"url":{"path":"@url"}}}}}}', '8414a41e4cc14eacb6e027ea58b9722c', null, null);
INSERT INTO aznews.rss_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, config_json, rss_source_id, date_format, time_zone) VALUES ('44832381-67a8-40e4-89ba-b64bbeadf9c5', 0, false, 'admin', '2018-06-27 14:18:01', 'http://vietnamnet.vn/rss/thoi-su.rss', '{"title":{"path":"title"},"description":{"path":"description"},"link":{"path":"link"},"items":{"path":"item","config":{"title":{"path":"title"},"link":{"path":"link"},"pubDate":{"path":"pubDate"},"guid":{"path":"link"},"description":{"path":"description"},"thumbnails":{"path":"image","config":{"url":{"path":""}}}}}}', '378e9ca0-b46b-4351-80d8-91504e8dd909', 'dd/mm/yyyy', 'GMT+7');
INSERT INTO aznews.rss_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, config_json, rss_source_id, date_format, time_zone) VALUES ('47e45d42-d2fa-4802-89b7-144c7d1b78e3', 0, true, 'admin', '2018-06-27 14:18:01', 'https://laodong.vn/rss/thoi-su.rss', '{"title":{"path":"title"},"description":{"path":"description"},"link":{"path":"link"},"image":{"path":"image","config":{"url":{"path":"url"},"title":{"path":"title"},"link":{"path":"link"}}},"items":{"path":"item","config":{"title":{"path":"title"},"link":{"path":"link"},"pubDate":{"path":"pubDate"},"guid":{"path":"guid"},"description":{"path":"description"}}}}', '3fbef76e-97ed-43e9-95f8-11d722156f20', 'EEE, dd MMM yyyy HH:mm:ss', 'GMT+7');
INSERT INTO aznews.rss_config (id, version, is_deleted, last_modified_user, last_modified_time, rss_url, config_json, rss_source_id, date_format, time_zone) VALUES ('6371799e-0d44-46be-98c4-a4caccf0fe07', 0, true, 'admin', '2018-06-27 14:18:01', 'https://laodong.vn/rss/home.rss', '{"title":{"path":"title"},"description":{"path":"description"},"link":{"path":"link"},"image":{"path":"image","config":{"url":{"path":"url"},"title":{"path":"title"},"link":{"path":"link"}}},"items":{"path":"item","config":{"title":{"path":"title"},"link":{"path":"link"},"pubDate":{"path":"pubDate"},"guid":{"path":"guid"},"description":{"path":"description"}}}}', 'aac72d12-c71f-4a7f-927d-e5ae230b484c', 'EEE, dd MMM yyyy HH:mm:ss', 'GMT+7');