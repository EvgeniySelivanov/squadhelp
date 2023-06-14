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

-- step1
INSERT INTO public."conversations" ("title") 
VALUES ('user2');
-- step2
INSERT INTO public."users_to_conversations" ("user_id", "conversation_id","black_list")
VALUES (1, 2,true),(2,2,true);
-- step3
INSERT INTO public."Messages" ("user_id", "conversation_id", "body")
VALUES (1, 1, 'first message'),(2, 1, 'second message');
--step4
INSERT INTO public."Catalogs" ( name,"user_id")
VALUES ( 'first',1),('second' ,1);
--step5


