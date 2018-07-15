SELECT * FROM rss_source where category_id ='6a494fbc-0f09-4ab0-95a3-12c1b7e02945';

SELECT * FROM v_news where rss_source_group_id ='becf40d5-7f71-4a53-88ac-f19d50f38176';

SELECT * FROM v_news where category_id ='1bc09a1e-d8d4-4b01-b081-cf14b1463444';

SELECT * FROM rss_config where  rss_source_id = '5c56d2f5-150e-493d-a48c-e150a5241b28';

UPDATE rc rss_config set rc.is_deleted = false, rc.date_format = 'yyyy-mm-dd' where rss_source_id = 'b60f5d96-c1ce-42f6-a4da-05c1acc5ed8b';

SELECT * FROM rss_source where rss_source_group_id = 'f37cc038-e1e2-45e2-bbcf-513fc31f864b';


UPDATE rss_config rc set rc.is_deleted = false, rc.date_format = 'EEE, dd MMM yyyy HH:mm:ss' where rss_source_id in ();

UPDATE rss_config rc set rc.is_deleted = false, rc.date_format = 'dd/mm/yyyy HH:mm:ss' where rss_source_id in ();

Select * from rss_config where rss_source_id in ();




truncate TABLE image;
truncate table news;
truncate table news_rss_source;
truncate table category_news;

select link, count(1) from news
group by link having count(1) > 1;

commit;