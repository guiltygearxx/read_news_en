CREATE TABLE aznews.news_rss_source
(
    id varchar(50) PRIMARY KEY NOT NULL,
    version bigint(20) NOT NULL,
    is_deleted bit(1),
    last_modified_user varchar(255),
    last_modified_time datetime,
    rss_source_id varchar(100),
    news_id varchar(100)
);
CREATE INDEX news_rss_source_rss_source_id ON aznews.news_rss_source (rss_source_id);
CREATE INDEX news_rss_source_news_id ON aznews.news_rss_source (news_id);
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd0e0050', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bbb50000');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd0f0051', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc190002');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd100052', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc200004');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd110053', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc250006');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd120054', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc290008');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd130055', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc2d000a');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd150056', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc32000c');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd160057', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc35000e');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd190058', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc3b0010');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd1a0059', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc3e0012');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd1b005a', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc430014');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd1c005b', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc470016');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd1d005c', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc4a0018');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd1e005d', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc4e001a');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd1f005e', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc53001c');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd21005f', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc59001e');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd220060', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc5e0020');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd230061', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc630022');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd240062', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc660024');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd240063', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc6a0026');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd250064', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc6d0028');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd260065', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc70002a');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd280066', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc75002c');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd290067', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc77002e');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd2b0068', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc7a0030');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd2c0069', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc7d0032');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd2d006a', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc800034');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd2e006b', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc840036');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd2f006c', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc880038');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd30006d', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc8b003a');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd31006e', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc8e003c');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd31006f', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc91003e');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd320070', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc950040');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd330071', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc970042');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd340072', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc9a0044');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd350073', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc9c0046');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd360074', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bc9f0048');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd370075', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bca2004a');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd370076', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bca6004c');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652bd390077', 0, false, 'system', '2018-06-28 19:16:23', '4fb742c0-b8dc-4ed6-936b-30feec5a2e44', '8a59f6dd6446515401644652bca9004e');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1300be', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bde500a0');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1500bf', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bde700a2');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1600c0', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdea00a4');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1800c1', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bded00a6');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1900c2', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdf000a8');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1a00c3', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdf300aa');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1a00c4', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdf600ac');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1b00c5', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdf800ae');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1c00c6', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdfb00b0');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1d00c7', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652bdfe00b2');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1e00c8', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652be0100b4');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be1f00c9', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652be0400b6');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be2000ca', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652be0700b8');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be2100cb', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652be0900ba');
INSERT INTO aznews.news_rss_source (id, version, is_deleted, last_modified_user, last_modified_time, rss_source_id, news_id) VALUES ('8a59f6dd6446515401644652be2200cc', 0, false, 'system', '2018-06-28 19:16:23', '378e9ca0-b46b-4351-80d8-91504e8dd909', '8a59f6dd6446515401644652be0d00bc');