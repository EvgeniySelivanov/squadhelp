UPDATE  public."Users"
SET "balance"=public."Users"."balance"+10
FROM
(SELECT "id","rating"
FROM public."Users"
WHERE "role"='creator'
ORDER BY "rating" DESC
LIMIT 3) AS "MyTable"
WHERE  public."Users"."id"="MyTable"."id"
RETURNING *;