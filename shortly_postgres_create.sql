CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" varchar(150) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(50) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.userToken" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "userToken_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.userUrl" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"urlId" int NOT NULL,
	CONSTRAINT "userUrl_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.urls" (
	"id" serial NOT NULL,
	"shortUrl" varchar(50) NOT NULL UNIQUE,
	"url" TEXT NOT NULL,
	"visits" bigint NOT NULL DEFAULT '0',
	CONSTRAINT "urls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "userToken" ADD CONSTRAINT "userToken_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "userUrl" ADD CONSTRAINT "userUrl_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "userUrl" ADD CONSTRAINT "userUrl_fk1" FOREIGN KEY ("urlId") REFERENCES "urls"("id");






