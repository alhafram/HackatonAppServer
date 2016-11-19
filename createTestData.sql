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
    (DEFAULT, 'Центр'),
    (DEFAULT, 'Парк'),
    (DEFAULT, 'Кино');

INSERT INTO "Pictures" VALUES
    (DEFAULT, '1.jpg'),
    (DEFAULT, '2.jpg'),
    (DEFAULT, '3.jpg'),
    (DEFAULT, '4.jpg'),
    (DEFAULT, '5.jpg');

INSERT INTO "Points" VALUES
    (DEFAULT, 'Летний сад', 59.2, 30.1, '10:00-22:00', 1),
    (DEFAULT, 'Ресторан Mama Roma', 59.2001, 30.9995, '9:00-23:00', 2),
    (DEFAULT, 'Кинотеатр Синема Стар', 59.1, 30.3, '8:00-23:30', 3);

INSERT INTO "Routes" VALUES
    (DEFAULT, 'Кино', 'Ну кинотеатр тип', 4, 2.5, 600, 4),
    (DEFAULT, 'Прогулка в центре', 'Несвкий там, например', 5, 3, 1200, 5);

INSERT INTO "RouteCategory" VALUES
    (1, 4),
    (2, 2),
    (2, 3);

INSERT INTO "RoutePoint" VALUES
    (1, 3),
    (2, 1),
    (2, 2);

INSERT INTO "RoutePicture" VALUES
    (1, 3),
    (1, 4),
    (2, 1),
    (2, 2),
    (2, 5);



