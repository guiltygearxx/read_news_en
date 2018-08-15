CREATE TABLE low_image_size_news (

  news_id            varchar(50) NOT NULL,
  last_modified_time datetime,
  created_time       datetime,
  size               long,
  scanned_times      int,
  scan_status        varchar(20),
  link               varchar(1000),

    PRIMARY KEY (news_id)
)
  DEFAULT CHARSET = utf8;

CREATE INDEX idx_low_image_size_news_created_time
  ON low_image_size_news (created_time asc);

ALTER TABLE image
  add column size long;

ALTER TABLE image
  add column created_time datetime;

CREATE INDEX idx_image_created_time
  ON image (created_time asc);

ALTER TABLE news
  add column created_time datetime;

CREATE INDEX idx_news_created_time
  ON news (created_time asc);

update image
set size = height * width;

update news
set created_time = last_modified_time
where news.created_time is null;

update image
set created_time = last_modified_time
where image.created_time is null;

CREATE TABLE missing_size_image (

  image_id           varchar(50) NOT NULL,
  created_time       datetime,
  scan_status        varchar(20),
  last_modified_time datetime,
  scanned_times      int,

  PRIMARY KEY (image_id)
)
  DEFAULT CHARSET = utf8;

CREATE INDEX idx_missing_size_image_created_time
  ON missing_size_image (created_time asc);

insert into missing_size_image (image_id, created_time, last_modified_time, scan_status, scanned_times)
select ie.id, ie.created_time, ie.created_time, 'new', 0
from image ie
where ie.is_deleted = false
  and (ie.width is null or ie.height is null);

commit;