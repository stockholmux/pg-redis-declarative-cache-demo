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

CREATE TABLE public.testuser (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- NOTE: Change the owner
ALTER TABLE public.testuser OWNER TO yourdbuser;

CREATE SEQUENCE public.testuser_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- NOTE: Change the owner
ALTER TABLE public.testuser_user_id_seq OWNER TO yourdbuser;

ALTER SEQUENCE public.testuser_user_id_seq OWNED BY public.testuser.user_id;

ALTER TABLE ONLY public.testuser ALTER COLUMN user_id SET DEFAULT nextval('public.testuser_user_id_seq'::regclass);

ALTER TABLE ONLY public.testuser
    ADD CONSTRAINT testuser_email_key UNIQUE (email);

ALTER TABLE ONLY public.testuser
    ADD CONSTRAINT testuser_pkey PRIMARY KEY (user_id);

ALTER TABLE ONLY public.testuser
    ADD CONSTRAINT testuser_username_key UNIQUE (username);

