create or replace view v_news as
  select cns.id                 AS id,
         ns.id                  AS news_id,
         ns.is_deleted          AS is_deleted,
         ns.last_modified_user  AS last_modified_user,
         ns.last_modified_time  AS last_modified_time,
         ns.title               AS title,
         ns.link                AS link,
         ns.pub_date            AS pub_date,
         ns.guid                AS guid,
         ns.description         AS description,
         ns.rss_source_group_id AS rss_source_group_id,
         cns.category_id        AS category_id,
         rsg.title              AS rss_source_group_title,
         (nct.id is not null)   AS has_detail
  from category_news cns
         join news ns on ns.id = cns.news_id and ns.is_deleted = FALSE
         join rss_source_group rsg on rsg.id = ns.rss_source_group_id and rsg.is_deleted = FALSE
         left join news_content nct on nct.id = ns.id and nct.is_deleted = false
  where cns.is_deleted = FALSE;