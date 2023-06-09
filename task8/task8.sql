DROP TABLE IF EXISTS public."Sender_to_catalogs";
DROP TABLE IF EXISTS public."Catalogs";
DROP TABLE IF EXISTS public."Messages";
DROP TABLE IF EXISTS public."Sender_to_conversations";
DROP TABLE IF EXISTS public."Conversation";


CREATE TABLE public."Conversation"(
  "id" bigserial PRIMARY KEY,
  "name" varchar (256) NOT NULL CHECK ("name"!=''),
  "ownerId" bigint REFERENCES public."Users" ("id"),
  "createAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE public."Sender_to_conversations"(
  "senderId" bigint REFERENCES public."Users"("id"),
  "conversationId" bigint REFERENCES public."Conversation"("id"),
  "blackList" boolean NOT NULL DEFAULT false,
  "favoriteList" boolean NOT NULL DEFAULT false,
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY ("senderId", "conversationId")
);


CREATE TABLE public."Messages"(
  "id" bigserial PRIMARY KEY,
  "senderId" bigint ,
  "conversationId" bigint,
  "body" varchar(4096) NOT NULL CHECK ("body" != ''),
  "createAt" timestamp NOT NULL DEFAULT current_timestamp,
  "updatedAt" timestamp NOT NULL DEFAULT current_timestamp,
  FOREIGN KEY ("senderId","conversationId") REFERENCES public."Sender_to_conversations" ("senderId","conversationId")
);


CREATE TABLE public."Catalogs"(
  "id" bigserial PRIMARY KEY,
  "name" varchar (256) NOT NULL CHECK ("name"!=''),
  "senderId" bigint REFERENCES public."Users"("id"),
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE public."Sender_to_catalogs"(
  "senderId" bigint REFERENCES public."Users"("id"),
  "catalogId" bigint REFERENCES public."Catalogs"("id"),
  "conversationId" bigint REFERENCES public."Conversation"("id"),
  "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY ("senderId", "catalogId","conversationId")
);

