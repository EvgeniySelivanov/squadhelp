SELECT * 
  FROM(
SELECT count("id") AS "QUANTITY", "role" AS "ROLE"
FROM public."Users"
GROUP BY "role") AS "USERS";

