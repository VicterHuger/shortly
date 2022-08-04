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



CREATE TABLE "shortUrls" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"shortUrl" varchar(50) NOT NULL UNIQUE,
	"url" TEXT NOT NULL,
	"visitCount" bigint NOT NULL DEFAULT '0',
	"createdAt" DATE NOT NULL DEFAULT now(),
	CONSTRAINT "shortUrls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "shortUrls" ADD CONSTRAINT "shortUrls_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



