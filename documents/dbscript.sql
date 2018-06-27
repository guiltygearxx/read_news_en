CREATE TABLE aznews.category
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  title              varchar(1000),
  code               varchar(100),
  parent_category_id varchar(50)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.image
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  type               varchar(100),
  width              integer,
  height             integer,
  url                varchar(255),
  reference_id       varchar(50),
  reference_type     varchar(20)

)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.news
(
  id                  varchar(50) PRIMARY KEY NOT NULL,
  version             bigint(20)              NOT NULL,
  is_deleted          bit(1),
  last_modified_user  varchar(255),
  last_modified_time  datetime,

  title               varchar(1000),
  link                varchar(1000),
  pub_date            datetime,
  guid                varchar(1000),
  description         text,
  rss_source_group_id varchar(50)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.rss_source
(
  id                  varchar(50) PRIMARY KEY NOT NULL,
  version             bigint(20)              NOT NULL,
  is_deleted          bit(1),
  last_modified_user  varchar(255),
  last_modified_time  datetime,

  code                varchar(100),
  category_id         varchar(100),
  rss_url             varchar(1000),
  rss_source_group_id varchar(50)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.rss_config
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  rss_url            varchar(1000),
  config_json        text,
  rss_source_id      varchar(50)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.category_news
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  category_id        varchar(100),
  news_id            varchar(100)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.news_rss_source
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  rss_source_id      varchar(100),
  news_id            varchar(100)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE aznews.rss_source_group
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  title              varchar(100)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

alter table aznews.news
  add index news_guid(guid);

alter table aznews.image
  add index image_reference_id(reference_id);

alter table aznews.category_news
  add index category_news_category_id(category_id),
  add index category_news_news_id(news_id);

alter table aznews.news_rss_source
  add index news_rss_source_rss_source_id(rss_source_id),
  add index news_rss_source_news_id(news_id);

alter table aznews.category
  add index category_parent_category_id(parent_category_id);

create or replace view v_news as
  select
    cns.id,
    ns.id     as news_id,
    ns.is_deleted,
    ns.last_modified_user,
    ns.last_modified_time,
    ns.title,
    ns.link,
    ns.pub_date,
    ns.guid,
    ns.description,
    ns.rss_source_group_id,
    cns.category_id,
    rsg.title as rss_source_group_title
  from category_news cns
    join news ns on ns.id = cns.news_id and ns.is_deleted = false
    join rss_source_group rsg on rsg.id = ns.rss_source_group_id and rsg.is_deleted = false
  where cns.is_deleted = false;