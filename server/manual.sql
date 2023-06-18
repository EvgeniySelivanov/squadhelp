-- SELECT "Offers"."id",
--   "Offers"."userId",
--   "Offers"."contestId",
--   "Offers"."text",
--   "Offers"."fileName",
--   "Offers"."originalFileName",
--   "Offers"."status",
--   "Contest"."id" AS "Contest.id"
-- FROM public."Offers" AS "Offers"
--   INNER JOIN "Contests" AS "Contest" ON "Offers"."contestId" = "Contest"."id"
-- WHERE "Offers"."status" = 'pending'
-- LIMIT '8' OFFSET '0';

-- SELECT *
-- FROM public."Offers" AS "Offers"
--   INNER JOIN "Contests" AS "Contest" ON "Offers"."contestId" = "Contest"."id"
-- WHERE "Offers"."status" = 'pending'
-- LIMIT '8' OFFSET '0';


-- UPDATE public."Offers"
-- SET "status"='pending'
-- WHERE "status"='approved'
-- RETURNING *;

-- -- step1
-- INSERT INTO public."conversations" ("title") 
-- VALUES ('user2');
-- -- step2

SELECT * 
FROM public."users_to_conversations";
INSERT INTO public."users_to_conversations" ("user_id", "conversation_id")
VALUES (1,2),(2,2);
-- -- step3
INSERT INTO public."Messages" ("user_id", "conversation_id", "body")
VALUES (1, 2, 'test');

INSERT INTO public."conversations" ("title")
VALUES ('test2');
-- --step4
-- INSERT INTO public."Catalogs" ( name,"user_id")
-- VALUES ( 'first',1),('second' ,1);
-- --step5


