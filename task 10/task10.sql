
UPDATE  public."Users"
SET "balance"="BALANCE"
FROM (SELECT public."Users"."id" AS "userId",public."Users"."balance"+sum("prize")*0.1  AS "BALANCE"
FROM public."Contests"
JOIN public."Users" ON public."Contests"."userId"=public."Users"."id"
WHERE "createdAt" BETWEEN '2023-12-25 00:00:00+00' AND  '2024-01-14 23:59:59+00'
GROUP BY public."Users"."id") AS "MyTable"
WHERE  "role"='customer' AND "id"="MyTable"."userId"
RETURNING *;
