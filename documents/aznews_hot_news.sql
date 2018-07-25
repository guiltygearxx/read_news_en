CREATE TABLE aznews.hot_news
(
  id                 varchar(50) PRIMARY KEY NOT NULL,
  version            bigint(20)              NOT NULL,
  is_deleted         bit(1),
  last_modified_user varchar(255),
  last_modified_time datetime,

  news_id            varchar(50)
);

create index hot_news_news_id_idx
  on hot_news (news_id);
