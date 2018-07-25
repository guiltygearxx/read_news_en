CREATE TABLE aznews.rss_source_group
(
    id varchar(50) PRIMARY KEY NOT NULL,
    version bigint(20) NOT NULL,
    is_deleted bit(1),
    last_modified_user varchar(255),
    last_modified_time datetime,
    title varchar(100)
);
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('06e9ceb3-a518-42bf-920b-f4b44e62a00c', 0, null, 'admin', '2018-06-27 14:10:24', 'Giáo dục thời đại');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('0d2426ec-1358-4db4-a66a-fa9e55eb3514', 0, null, 'admin', '2018-06-27 14:10:24', 'Công an nhân dân');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('0dbdc216-d4e2-4fbd-8637-4601847bdf6d', 0, false, 'admin', '2018-06-27 14:10:24', 'VOV');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('148359d0-a2b4-40a0-aed6-f81c0b8468db', 0, false, 'admin', '2018-06-27 14:10:24', 'VTC');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('1aa3c687-467a-4d61-94c5-043009e76a08', 0, null, 'admin', '2018-06-27 14:10:24', 'Info Net');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('1d71f736-8294-4f47-a407-defd60c8d57b', 0, false, 'admin', '2018-06-27 14:10:24', 'Báo Kiến thức');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('22743849-d9f4-45cb-ac0d-f26c08737543', 0, null, 'admin', '2018-06-27 14:10:24', 'An ninh thủ đô');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('35f8f475-f4c6-4e86-92d9-ab451654fbf6', 0, false, 'admin', '2018-06-27 14:10:24', 'Bnews');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('386b9bd6-1fe5-4c38-91d8-8c2bbb3866a5', 0, null, 'admin', '2018-06-27 14:10:24', 'Lao Động Online');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('45d48537-cd83-44f1-adbe-d36ee773dd09', 0, null, 'admin', '2018-06-27 14:10:24', 'Dân trí điện tử');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('513e4ec1-7b17-4f32-9ce7-754021de1bff', 0, false, 'admin', '2018-06-27 14:10:24', 'Sài gòn giải phóng');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('52dc5458-20c0-4732-beab-fec7b5820e63', 0, false, 'admin', '2018-06-27 14:10:24', 'Đời sống pháp luật');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('691dd3b4-85b3-4e70-a7e7-1b3b2b7d092d', 0, null, 'admin', '2018-06-27 14:10:24', 'Người đưa tin');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('6c7ab451-247d-492d-86fb-fe1122291f2a', 0, null, 'admin', '2018-06-27 14:10:24', 'Báo tin tức');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('adcea372-17dd-4249-8e64-94322d6aba96', 0, null, 'admin', '2018-06-27 14:10:24', 'Dân việt');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('becf40d5-7f71-4a53-88ac-f19d50f38176', 0, null, 'admin', '2018-06-27 14:10:24', 'VietNamNet ');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('c73f98f2-3012-4151-90e8-ad894ee1378d', 0, false, 'admin', '2018-06-27 14:10:24', 'Tạp chí giao thông');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('c82927ee-11b4-4f2f-b99f-1de47a3f66b0', 0, null, 'admin', '2018-06-27 14:10:24', 'Thanh niên');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('c8b1337f-47be-4ce7-9bc2-b5846d48f33b', 0, false, 'admin', '2018-06-27 14:10:24', 'PLO');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('cc3af1bb-230e-4b86-b749-b3b08c29816e', 0, null, 'admin', '2018-06-27 14:10:24', 'Việt báo');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('cf2f0080-a7d0-438f-a466-7823872eeb80', 0, null, 'admin', '2018-06-27 14:10:24', 'Tuổi trẻ');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('e0d43eef-18ad-47b3-8dbd-7413ba9fca23', 0, false, 'admin', '2018-06-27 14:10:24', 'Tiền Phong');
INSERT INTO aznews.rss_source_group (id, version, is_deleted, last_modified_user, last_modified_time, title) VALUES ('f37cc038-e1e2-45e2-bbcf-513fc31f864b', 0, null, 'admin', '2018-06-27 14:10:24', 'Người tiêu dùng');