create table news_content
(
  id                 varchar(50)  not null
    primary key,
  version            bigint       not null,
  is_deleted         bit          null,
  last_modified_user varchar(255) null,
  last_modified_time datetime     null,
  content            text         null
)
  charset = utf8;
  
create table missing_content_news
(
  news_id                        varchar(50) not null
    primary key,
  last_modified_time             datetime    null,
  created_time                   datetime    null,
  scanned_times                  int         null,
  scan_status                    varchar(20) null,
  news_content_crawler_config_id varchar(50)
)
  charset = utf8;

create index idx_missing_content_news_created_time
  on missing_content_news (created_time);
  
create table news_content_crawler_config
(
  id                 varchar(50)   not null primary key,
  version            bigint        not null,
  is_deleted         bit           null,
  last_modified_user varchar(255)  null,
  last_modified_time datetime      null,
  config_json        text          null,
  url_pattern        varchar(1000) null
)
  charset = utf8;  