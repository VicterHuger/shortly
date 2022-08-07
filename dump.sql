--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.11 (Ubuntu 12.11-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: shortUrls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."shortUrls" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "shortUrl" character varying(50) NOT NULL,
    url text NOT NULL,
    "visitCount" bigint DEFAULT '0'::bigint NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public."shortUrls" OWNER TO postgres;

--
-- Name: shortUrls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."shortUrls_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."shortUrls_id_seq" OWNER TO postgres;

--
-- Name: shortUrls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."shortUrls_id_seq" OWNED BY public."shortUrls".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: shortUrls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."shortUrls" ALTER COLUMN id SET DEFAULT nextval('public."shortUrls_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: shortUrls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."shortUrls" (id, "userId", "shortUrl", url, "visitCount", "createdAt") FROM stdin;
3	2	j0m9_gZMJBRONW1LVZD9U	https://calendar.google.com/calendar/u/0/r?cid=Y19taWI2amIyaW45YzQ3ZDRzdmNubzByMXY2Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&pli=1	1	2022-08-04
1	2	VZGC8HQQWVcYyMHvGI4FE	https://bootcampra.notion.site/Materiais-0750a51f86f04626bd2303e9f7c51cd0	2	2022-08-04
4	1	f0I0akHmHiDrcnJnTCwzC	https://www.figma.com/file/qt7NcrJ4ZOCLbka6Hjar7k/Shortly-(Copy)?node-id=0%3A1	2	2022-08-05
7	2	YA8YDHJRkGb6Sjh-F6op3	https://facebook.com	1	2022-08-07
5	4	IoCW-6Gv3e_ASUmuR88OO	https://www.youtube.com/watch?v=jfKfPfyJRdk	3	2022-08-07
8	3	zWiL2QnbVDcmvB5Lr_h9t	https://european-union.europa.eu/principles-countries-history/country-profiles/france_en	3	2022-08-07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	Clarissa Moura	clarismoura@gmail.com	$2b$10$EZJsYVPKRv5/tM0cnJX6/ef931YMpcXcthbA7CL7sKzyZkOeuDAn6	2022-08-04
2	Victor Hugo Simões	victorugo.vitao@hotmail.com	$2b$10$zirNyylRx8JBRMTsaZ3uveBHop0oRBBPQwKEnQr7PmtcDrhqRdwwa	2022-08-04
3	Gustavo	gustavo@gmail.com	$2b$10$pVBBEWR4yjluxmvdk2mw6erljDM3cWkJkGn5kUL.55IYevxymosEW	2022-08-06
4	João Alves	joao_alves@gmail.com	$2b$10$BVs8KCBJUnRQIiOjbx5x9OJ02Ajl/bMOQx7zNLdGrQv5wD6wK4uPm	2022-08-07
5	Fernando Souza	fernado_souza@gmail.com	$2b$10$lByHkl.vXeQ98t4FqjEuY.6k3V.YfZdrMbNlMc0v157bXLR4xDSZO	2022-08-07
6	Ingryd Sonza	ingrid_sonza@gmail.com	$2b$10$kj06QrSwn4g6Bxc1eGRZ5uEvO4Z5MfD72gA/lf12dTcY/xyHelGTK	2022-08-07
7	Mateus Albuquerque	mateus_albuquerque@gmail.com	$2b$10$p9TDAiI6jPbRFkwKTU65GeqY0EYWSq6A4mJt7LkpYw9aim3ND/qca	2022-08-07
8	Jenifer Teixeira	jenifer_teixeira@gmail.com	$2b$10$9CVOQT3xp4u3YkTvfZNlXO7KxzLiRZKPa0sqc9IMmrWNE2/LUJAP6	2022-08-07
9	José Martins	jose_martins@gmail.com	$2b$10$2Q5jDnA1DvBpl7fcqYhX.uYWqUofM/qRLFjn9Ne/xHJGblCYIblCG	2022-08-07
10	Larissa Martins	larissa_martins@gmail.com	$2b$10$4AVLtXCif2eArkmmS0Jf/exRiHOT/01Euoj30S4NqREHTrjrmcbEK	2022-08-07
11	Vilma da Silva	vilma_silva@gmail.com	$2b$10$honIb5mGVHJlxv9bGdwC/uEPcpBqIiQi81bWwPvGYufpvsVq/MgWC	2022-08-07
12	Gabriel Ferreira	gabriel_ferreira@gmail.com	$2b$10$zBzwUND9FVzr59ap78dFqe/HDVV8mbIIWvwFU/kKPKMrhpMpGW4C.	2022-08-07
\.


--
-- Name: shortUrls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."shortUrls_id_seq"', 8, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: shortUrls shortUrls_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_pk" PRIMARY KEY (id);


--
-- Name: shortUrls shortUrls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: shortUrls shortUrls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."shortUrls"
    ADD CONSTRAINT "shortUrls_fk0" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--
