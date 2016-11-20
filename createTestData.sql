DELETE FROM "Routes";
DELETE FROM "Categories";
DELETE FROM "Pictures";
DELETE FROM "Points";
ALTER SEQUENCE "Routes_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Categories_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Pictures_id_seq" RESTART WITH 1;
ALTER SEQUENCE "Points_id_seq" RESTART WITH 1;

INSERT INTO "Categories" VALUES
    (DEFAULT, 'Лето'),
    (DEFAULT, 'Центр города'),
    (DEFAULT, 'Для плохой погоды'),
    (DEFAULT, 'Зима'),
    (DEFAULT, 'Активный отдых');

INSERT INTO "Pictures" VALUES
    (DEFAULT, 'divoostrov.jpg'),
    (DEFAULT, 'spb_center.jpg'),
    (DEFAULT, 'circus.jpg'),
    (DEFAULT, 'aquapark.jpg'),
    (DEFAULT, 'isaacs_square.jpg'),
    (DEFAULT, 'bump_club.jpg'),
    (DEFAULT, 'anticafe.jpg'),
    (DEFAULT, 'cpkio.jpg'),
    (DEFAULT, 'dv_square.jpg'),
    (DEFAULT, 'mich_square.jpg');

INSERT INTO "Points" VALUES
    (DEFAULT, 'Летний сад', 59.2, 30.1, '10:00-22:00', 1),
    (DEFAULT, 'Ресторан Mama Roma', 59.2001, 30.9995, '9:00-23:00', 2),
    (DEFAULT, 'Кинотеатр Синема Стар', 59.1, 30.3, '8:00-23:30', 3),
    (DEFAULT, 'Диво Остров', 59.971928, 30.256958, '10:00-20:00', 3),
    (DEFAULT, 'ЦПКиО', 59.978848, 30.260345, '06:00-00:00', 3),
    (DEFAULT, 'Буше', 59.987661, 30.262935, '09:00-21:00', 3),
    (DEFAULT, 'Исаакиевский собор', 59.934144, 30.306932, '10:30-22:30', 3),
    (DEFAULT, 'Дворцовая площадь', 59.938656, 30.314490, '', 3),
    (DEFAULT, 'Михайловский замок', 59.940206, 30.337621, '', 3),
    (DEFAULT, 'Цирк на Фонтанке', 59.938376, 30.341527, '11:00-19:00', 3),
    --- 10 ---
    (DEFAULT, 'Аквапарк "Питерлэнд"', 59.981469, 30.210899, '10:00-22:30', 3),
    (DEFAULT, 'Дом кошек', 59.933109, 30.301222, '10:00-17:00', 3),
    (DEFAULT, 'Ресторан "счастье"', 59.934029, 30.309117, '09:00-01:00', 3),
    (DEFAULT, 'Батутный центр Bump', 59.931362, 30.265627, '12:00-23:30', 3),
    (DEFAULT, 'Антикафе', 59.936757, 30.313585, '11:00-23:00', 3),
    (DEFAULT, 'Музей иллюзий', 59.936790, 30.312598, '10:00-21:00', 3);

INSERT INTO "Routes" VALUES
    (DEFAULT, 'Для любителей повеселиться', 'В этом варианте свидания мы предлагаем вам посетить парк аттракционов Диво Остров на Крестовском острове. Рядом находится центральный парк культуры и отдыха - красивое и приятное место. А после можно будет зайти перекусить в Буше около станции метро "Старая Деревня".', 4, 3, 2000, 1),
    (DEFAULT, 'Прогулка по центру города', 'Этот маршрут очень понравится тем, кто любит проводить время в исторической части Санкт-Петербурга. Пройдите мимо основных достопримечательностей города.', 5, 2, 0, 2),
    (DEFAULT, 'Поход в цирк', 'Посетите цирк на фонтанке - хорошее настроение и заряд позитива вам гарантированы.', 4.5, 1.5, 500, 3),
    (DEFAULT, 'Аквапарк', 'В аквапарке вы точно сможете отвлечься от ежедневной рутины и отлично провести время вместе. Особенно приятно посещать это место зимой.', 4.8, 5, 3000, 4),
    (DEFAULT, 'Маршрут около Исаакиевской площади', 'В этой части города очень много интересных мест. Мы предлагаем вам посетить дом кошек, полюбоваться видом с Исаакиевского собора, а после вкусно поесть в ресторане "Счастье".', 5.0, 4, 3000, 5),
    (DEFAULT, 'Батутный центр', 'Этот вариант как нельзя лучше подойдет для тех, чья девушка любит спорт. Вы обязательно получите заряд позитивных эмоций, сходив в батутный центр Bump на Василеостровской. А завершить свидание можно прогулкой по набережной Невы', 3.6, 4, 1000, 6),
    (DEFAULT, 'Антикафе и музей иллюзий', 'Находящиеся на Адмиралтейской музей иллюзий и антикафе помогут вам весело провести время вдвоем. А необычные фото из музея останутся вам на память',  4.1, 3, 1500, 7);

INSERT INTO "RouteCategory" VALUES
    (1, 1),
    (2, 2),
    (3, 2),
    (3, 3),
    (4, 3),
    (4, 4),
    (4, 5),
    (5, 2),
    (6, 5),
    (7, 3),
    (7, 4);

INSERT INTO "RoutePoint" VALUES
    (1, 4),
    (1, 5),
    (1, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (2, 2),
    (3, 10),
    (3, 2),
    (4, 11),
    (5, 12),
    (5, 7),
    (5, 13),
    (6, 14),
    (7, 15),
    (7, 16);

INSERT INTO "RoutePicture" VALUES
    (1, 1),
    (1, 8),
    (2, 9),
    (2, 5),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7);



