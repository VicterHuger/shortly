CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "token" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"name" TEXT NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT now(),
	CONSTRAINT "token_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "userShortUrl" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"shortUrlId" int NOT NULL,
	"createdAt" DATE NOT NULL DEFAULT now(),
	CONSTRAINT "userShortUrl_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "shortUrls" (
	"id" serial NOT NULL,
	"shortUrl" varchar(50) NOT NULL UNIQUE,
	"url" TEXT NOT NULL,
	"visitCount" bigint NOT NULL DEFAULT '0',
	"createdAt" DATE NOT NULL DEFAULT now(),
	CONSTRAINT "shortUrls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "token" ADD CONSTRAINT "token_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "userShortUrl" ADD CONSTRAINT "userShortUrl_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "userShortUrl" ADD CONSTRAINT "userShortUrl_fk1" FOREIGN KEY ("shortUrlId") REFERENCES "shortUrls"("id");






