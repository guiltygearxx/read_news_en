CREATE TABLE aznews.hot_news_config
(
  id varchar(50) PRIMARY KEY NOT NULL,
  version bigint(20) NOT NULL,
  is_deleted bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  rss_url varchar(1000),
  root_expression text,
  config_json text,

  date_format varchar(50),
  time_zone varchar(50)
);