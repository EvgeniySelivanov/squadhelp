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

SELECT *
FROM public."Offers" AS "Offers"
  INNER JOIN "Contests" AS "Contest" ON "Offers"."contestId" = "Contest"."id"
WHERE "Offers"."status" = 'pending'
LIMIT '8' OFFSET '0';