--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id integer NOT NULL,
    name character varying NOT NULL,
    "lessonDifficulty" smallint NOT NULL,
    grade smallint,
    feedback character varying(256),
    description character varying,
    shared boolean DEFAULT false NOT NULL
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: lessons-tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."lessons-tasks" (
    "lessonId" integer NOT NULL,
    "taskId" integer NOT NULL
);


ALTER TABLE public."lessons-tasks" OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lessons_id_seq OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    description character varying(256) NOT NULL,
    grade smallint
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks-tools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tasks-tools" (
    "taskId" integer NOT NULL,
    "toolId" integer NOT NULL
);


ALTER TABLE public."tasks-tools" OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO postgres;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: tools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tools (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying(256) NOT NULL
);


ALTER TABLE public.tools OWNER TO postgres;

--
-- Name: tools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tools_id_seq OWNER TO postgres;

--
-- Name: tools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tools_id_seq OWNED BY public.tools.id;


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: tools id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tools ALTER COLUMN id SET DEFAULT nextval('public.tools_id_seq'::regclass);


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, name, "lessonDifficulty", grade, feedback, description, shared) FROM stdin;
11	Neurosurgery	2	\N	\N	\N	f
10	Vascular surgery	2	\N	\N	\N	f
9	Thoracic surgery	2	\N	\N	\N	f
8	Arterial hypertension	1	\N	\N	\N	f
7	Advanced auscultation	1	\N	\N	\N	f
6	Dengue fever	1	\N	\N	\N	f
3	Basic Life Support Protocol	4	\N	\N	\N	f
4	Early defibrillation	2	\N	\N	\N	f
5	Electrocardiogram monitoring	2	\N	\N	\N	f
12	Wound disinfection	2	\N	\N	\N	f
13	Antibiotic injection	2	\N	\N	\N	f
14	Pain relief patch	2	\N	\N	\N	f
2	Blood sample	3	\N	\N	Take a blood sample from the patient	f
1	Vital Parameters	3	\N	\N	Measure the patient's vital parameters	f
\.


--
-- Data for Name: lessons-tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."lessons-tasks" ("lessonId", "taskId") FROM stdin;
1	2
1	1
1	4
1	6
1	3
1	5
5	15
5	14
4	12
4	13
3	9
3	10
3	11
2	16
2	17
2	18
2	19
2	20
2	21
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (id, description, grade) FROM stdin;
7	Pick up the spirometer	\N
9	Evaluate consciousness and check patency	\N
10	Evaluate the breath	\N
12	Pick up the defibrillator	\N
13	Use the defibrillator on the patient until the heartbeat resumes	\N
11	In the absence of breath or with breath impaired and/or insufficient, practice CPR (Cardiopulmonary resuscitation techniques)	\N
15	Use the electrocardiograph to find out if the patient has a heart arrhythmia	\N
14	Pick up the electrocardiograph	\N
8	Measures the patient's respiratory rate	\N
16	Pick up the cotton	\N
17	Use the cotton to disinfect the patient's arm	\N
18	Pick up the syringe	\N
19	Use the syringe to get the patient's blood	\N
20	Pick up the bandaid	\N
21	Apply the bandaid on the patient's arm	\N
2	Measure patient's body temperature	\N
1	Pick up the thermometer	\N
4	Measure patient's blood pressure	\N
6	Measure the patient's heart rate	\N
3	Pick up the sphygmomanometer	\N
5	Pick up the stethoscope	\N
\.


--
-- Data for Name: tasks-tools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."tasks-tools" ("taskId", "toolId") FROM stdin;
1	1
3	2
5	3
7	4
12	5
14	6
16	7
18	8
20	9
\.


--
-- Data for Name: tools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tools (id, name, description) FROM stdin;
1	Thermometer	A thermometer is a device that measures temperature or a temperature gradient
2	Sphygmomanometer	A sphygmomanometer is a device used to measure blood pressure, composed of an inflatable cuff to collapse and then release the artery under the cuff in a controlled manner, and a mercury or aneroid manometer to measure the pressure.
4	Spirometer	A spirometer is an apparatus for measuring the volume of air inspired and expired by the lungs. A spirometer measures ventilation, the movement of air into and out of the lungs.
5	Defibrillator	 A defibrillator delivers a dose of electric current (often called a counter-shock) to the heart. Although not fully understood, this process depolarizes a large amount of the heart muscle, ending the arrhythmia. 
6	Electrocardiograph	Apparatus for obtaining a graphical representation of the variable electric currents which spread in the human body as a result of the contractions of the heart muscle.
3	Stethoscope	A stethoscope is an apparatus for auscultation of the heart and respiratory organs, consisting of a metal capsule with a vibrating membrane which transmits sounds to the doctor's ears by means of two flexible rubber or plastic tubes connected to it.
7	Cotton	A soft white fibrous substance that surrounds the seeds of a tropical and subtropical plant and is used as textile fiber and thread for sewing
8	Syringe	A tube with a nozzle and piston or bulb for sucking in and ejecting liquid in a thin stream fitted with a hollow needle for injecting or withdrawing fluids.
9	Bandaid	Medicament, variously composed, with strong adhesive properties, which is spread on canvas or other material for application to the skin.
\.


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_id_seq', 17, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, true);


--
-- Name: tools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tools_id_seq', 1, true);


--
-- Name: lessons-tasks PK_837aa29f689dd1ba9a066869b69; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."lessons-tasks"
    ADD CONSTRAINT "PK_837aa29f689dd1ba9a066869b69" PRIMARY KEY ("lessonId", "taskId");


--
-- Name: tasks-tools PK_8b6ae3a0bc327461dd51201e59a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tasks-tools"
    ADD CONSTRAINT "PK_8b6ae3a0bc327461dd51201e59a" PRIMARY KEY ("taskId", "toolId");


--
-- Name: tasks PK_8d12ff38fcc62aaba2cab748772; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);


--
-- Name: lessons PK_9b9a8d455cac672d262d7275730; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY (id);


--
-- Name: tools PK_e23d56734caad471277bad8bf85; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "PK_e23d56734caad471277bad8bf85" PRIMARY KEY (id);


--
-- Name: lessons UQ_c4f65b4b4adaed916b2eec69bdd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "UQ_c4f65b4b4adaed916b2eec69bdd" UNIQUE (name);


--
-- Name: tools UQ_d95e4bbca1f6fffc98a6cf12973; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "UQ_d95e4bbca1f6fffc98a6cf12973" UNIQUE (name);


--
-- Name: lessons-tasks FK_3c0b5e9a6e5b7024662988e36d7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."lessons-tasks"
    ADD CONSTRAINT "FK_3c0b5e9a6e5b7024662988e36d7" FOREIGN KEY ("taskId") REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tasks-tools FK_9214caa341f546c99f1f1aa2cfb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tasks-tools"
    ADD CONSTRAINT "FK_9214caa341f546c99f1f1aa2cfb" FOREIGN KEY ("taskId") REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tasks-tools FK_aee1fbf8983b312bff765a3f3f8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tasks-tools"
    ADD CONSTRAINT "FK_aee1fbf8983b312bff765a3f3f8" FOREIGN KEY ("toolId") REFERENCES public.tools(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lessons-tasks FK_f3cfa2d57277a17bf0598a7870d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."lessons-tasks"
    ADD CONSTRAINT "FK_f3cfa2d57277a17bf0598a7870d" FOREIGN KEY ("lessonId") REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

