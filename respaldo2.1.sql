PGDMP                          {            DB_tennis_club2    15.2    15.2 2    g           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            h           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            i           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            j           1262    16503    DB_tennis_club2    DATABASE     ?   CREATE DATABASE "DB_tennis_club2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
 !   DROP DATABASE "DB_tennis_club2";
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            ?            1259    16504    asistencias    TABLE     ?   CREATE TABLE public.asistencias (
    id_asistencia integer,
    fecha date,
    periodo character varying,
    id_horario integer,
    descripcion character varying,
    estado character varying
);
    DROP TABLE public.asistencias;
       public         heap    postgres    false    5            ?            1259    16509    asistencias_det    TABLE     ?   CREATE TABLE public.asistencias_det (
    secuencia integer,
    asistencias_cab integer,
    id_socio integer,
    asistencia boolean,
    falta boolean,
    retraso boolean,
    motivo character varying
);
 #   DROP TABLE public.asistencias_det;
       public         heap    postgres    false    5            ?            1259    16514 	   curso_det    TABLE     }   CREATE TABLE public.curso_det (
    id integer NOT NULL,
    id_cab integer,
    id_socio integer,
    id_horario integer
);
    DROP TABLE public.curso_det;
       public         heap    postgres    false    5            ?            1259    16517    cursos    TABLE     ?   CREATE TABLE public.cursos (
    id integer NOT NULL,
    descripcion character varying,
    periodo character varying,
    estado character varying,
    id_horario integer
);
    DROP TABLE public.cursos;
       public         heap    postgres    false    5            ?            1259    16522 
   familiares    TABLE     ?  CREATE TABLE public.familiares (
    id integer NOT NULL,
    codigo_socio character varying,
    nombre_socio character varying,
    identificacion character varying,
    nombres character varying,
    tipo character varying,
    celular character varying,
    correo character varying,
    domicilio character varying,
    fecha_nac date,
    estado character varying,
    id_usuario integer
);
    DROP TABLE public.familiares;
       public         heap    postgres    false    5            ?            1259    16527    horarios    TABLE     ?   CREATE TABLE public.horarios (
    id integer NOT NULL,
    id_disciplina integer,
    nivel character varying,
    id_categoria integer,
    id_ciclo integer,
    valor double precision,
    horario character varying,
    estado character varying
);
    DROP TABLE public.horarios;
       public         heap    postgres    false    5            ?            1259    16532    menu    TABLE     ?   CREATE TABLE public.menu (
    id integer NOT NULL,
    descripcion character varying,
    ruta character varying,
    estado character varying,
    icono character varying
);
    DROP TABLE public.menu;
       public         heap    postgres    false    5            ?            1259    16537    menu_x_usuario    TABLE     m   CREATE TABLE public.menu_x_usuario (
    id integer NOT NULL,
    id_usuario integer,
    id_menu integer
);
 "   DROP TABLE public.menu_x_usuario;
       public         heap    postgres    false    5            ?            1259    16540    menu_usuario    VIEW     ?   CREATE VIEW public.menu_usuario AS
 SELECT a.id_usuario,
    b.descripcion,
    b.ruta,
    b.estado,
    b.icono
   FROM (public.menu_x_usuario a
     JOIN public.menu b ON ((a.id_menu = b.id)));
    DROP VIEW public.menu_usuario;
       public          postgres    false    220    221    221    220    220    220    220    5            ?            1259    16544    profesor_x_horario    TABLE     u   CREATE TABLE public.profesor_x_horario (
    id integer NOT NULL,
    id_profesor integer,
    id_horario integer
);
 &   DROP TABLE public.profesor_x_horario;
       public         heap    postgres    false    5            ?            1259    16547    tb_catalogo    TABLE     ?   CREATE TABLE public.tb_catalogo (
    id integer NOT NULL,
    id_tipo_catalogo integer,
    descripcion character varying,
    estado character varying
);
    DROP TABLE public.tb_catalogo;
       public         heap    postgres    false    5            ?            1259    16552    tb_catalogo_tipo    TABLE     ?   CREATE TABLE public.tb_catalogo_tipo (
    id integer NOT NULL,
    descripcion character varying,
    estado character varying
);
 $   DROP TABLE public.tb_catalogo_tipo;
       public         heap    postgres    false    5            ?            1259    16557    tb_disciplina    TABLE     ?   CREATE TABLE public.tb_disciplina (
    id integer NOT NULL,
    codigo character varying,
    descripcion character varying,
    estado character varying
);
 !   DROP TABLE public.tb_disciplina;
       public         heap    postgres    false    5            ?            1259    16562    tb_profesores    TABLE     !  CREATE TABLE public.tb_profesores (
    id integer,
    identificacion character varying NOT NULL,
    nombres character varying,
    apellidos character varying,
    celular character varying,
    correo character varying,
    domicilio character varying,
    estado character varying
);
 !   DROP TABLE public.tb_profesores;
       public         heap    postgres    false    5            ?            1259    16567    tb_usuarios    TABLE     d  CREATE TABLE public.tb_usuarios (
    id integer NOT NULL,
    usuario character varying,
    nombres character varying,
    identificacion character varying,
    domicilio character varying,
    correo character varying,
    celular character varying,
    contrasenia character varying,
    estado character varying,
    tipo_usuario character varying
);
    DROP TABLE public.tb_usuarios;
       public         heap    postgres    false    5            ?            1259    16572    vw_asistencias    VIEW     ?  CREATE VIEW public.vw_asistencias AS
 SELECT a.id AS idcurso,
    a.descripcion AS descripcion_curso,
    a.periodo,
    a.id_horario,
    c.id_disciplina,
    d.codigo,
    d.descripcion AS disciplina_descripcion,
    c.nivel,
    c.horario,
    e.id,
    e.codigo_socio,
    e.nombre_socio,
    e.identificacion,
    e.nombres,
    e.tipo,
    e.celular,
    e.correo,
    e.domicilio,
    e.fecha_nac,
    e.estado
   FROM ((((public.cursos a
     JOIN public.curso_det b ON ((a.id = b.id_cab)))
     JOIN public.horarios c ON ((a.id_horario = c.id)))
     JOIN public.tb_disciplina d ON ((c.id_disciplina = d.id)))
     JOIN public.familiares e ON ((b.id_socio = e.id)))
  WHERE ((a.estado)::text = 'A'::text);
 !   DROP VIEW public.vw_asistencias;
       public          postgres    false    226    226    226    219    219    219    219    218    218    218    218    218    218    218    218    218    218    218    217    217    217    217    217    216    216    5            ?            1259    16577    vw_horarios    VIEW     ?  CREATE VIEW public.vw_horarios AS
 SELECT a.id,
    a.id_disciplina,
    b.descripcion AS nom_disciplina,
    a.nivel,
    a.id_categoria,
    c.descripcion AS nom_categoria,
    a.id_ciclo,
    d.descripcion AS nom_ciclo,
    a.valor,
    a.horario,
    a.estado
   FROM (((public.horarios a
     JOIN public.tb_disciplina b ON ((a.id_disciplina = b.id)))
     JOIN public.tb_catalogo c ON ((a.id_categoria = c.id)))
     JOIN public.tb_catalogo d ON ((a.id_ciclo = d.id)));
    DROP VIEW public.vw_horarios;
       public          postgres    false    219    219    219    219    219    219    226    219    219    226    224    224    5            ?            1259    16582    vw_horario_x_profesor    VIEW     ?  CREATE VIEW public.vw_horario_x_profesor AS
 SELECT a.id,
    a.id_disciplina,
    a.nom_disciplina,
    a.nivel,
    a.id_categoria,
    a.nom_categoria,
    a.id_ciclo,
    a.nom_ciclo,
    a.valor,
    a.horario,
    a.estado
   FROM public.vw_horarios a
  WHERE (NOT (EXISTS ( SELECT b.id,
            b.id_profesor,
            b.id_horario
           FROM public.profesor_x_horario b
          WHERE (a.id = b.id_horario))));
 (   DROP VIEW public.vw_horario_x_profesor;
       public          postgres    false    223    223    230    230    223    230    230    230    230    230    230    230    230    230    5            ?            1259    16610    vw_profesor_x_horario    VIEW     c  CREATE VIEW public.vw_profesor_x_horario AS
 SELECT b.id AS id_horario,
    d.id,
    d.identificacion,
    d.nombres,
    d.apellidos,
    d.celular,
    d.correo,
    d.domicilio,
    d.estado
   FROM ((public.vw_horarios b
     JOIN public.profesor_x_horario c ON ((b.id = c.id_horario)))
     JOIN public.tb_profesores d ON ((c.id_profesor = d.id)));
 (   DROP VIEW public.vw_profesor_x_horario;
       public          postgres    false    227    223    227    227    227    230    227    227    227    227    223    5            W          0    16504    asistencias 
   TABLE DATA           e   COPY public.asistencias (id_asistencia, fecha, periodo, id_horario, descripcion, estado) FROM stdin;
    public          postgres    false    214   ,C       X          0    16509    asistencias_det 
   TABLE DATA           s   COPY public.asistencias_det (secuencia, asistencias_cab, id_socio, asistencia, falta, retraso, motivo) FROM stdin;
    public          postgres    false    215   IC       Y          0    16514 	   curso_det 
   TABLE DATA           E   COPY public.curso_det (id, id_cab, id_socio, id_horario) FROM stdin;
    public          postgres    false    216   fC       Z          0    16517    cursos 
   TABLE DATA           N   COPY public.cursos (id, descripcion, periodo, estado, id_horario) FROM stdin;
    public          postgres    false    217   ?C       [          0    16522 
   familiares 
   TABLE DATA           ?   COPY public.familiares (id, codigo_socio, nombre_socio, identificacion, nombres, tipo, celular, correo, domicilio, fecha_nac, estado, id_usuario) FROM stdin;
    public          postgres    false    218   ?C       \          0    16527    horarios 
   TABLE DATA           l   COPY public.horarios (id, id_disciplina, nivel, id_categoria, id_ciclo, valor, horario, estado) FROM stdin;
    public          postgres    false    219   `D       ]          0    16532    menu 
   TABLE DATA           D   COPY public.menu (id, descripcion, ruta, estado, icono) FROM stdin;
    public          postgres    false    220   AE       ^          0    16537    menu_x_usuario 
   TABLE DATA           A   COPY public.menu_x_usuario (id, id_usuario, id_menu) FROM stdin;
    public          postgres    false    221   ?E       _          0    16544    profesor_x_horario 
   TABLE DATA           I   COPY public.profesor_x_horario (id, id_profesor, id_horario) FROM stdin;
    public          postgres    false    223   UF       `          0    16547    tb_catalogo 
   TABLE DATA           P   COPY public.tb_catalogo (id, id_tipo_catalogo, descripcion, estado) FROM stdin;
    public          postgres    false    224   ?F       a          0    16552    tb_catalogo_tipo 
   TABLE DATA           C   COPY public.tb_catalogo_tipo (id, descripcion, estado) FROM stdin;
    public          postgres    false    225   0G       b          0    16557    tb_disciplina 
   TABLE DATA           H   COPY public.tb_disciplina (id, codigo, descripcion, estado) FROM stdin;
    public          postgres    false    226   uG       c          0    16562    tb_profesores 
   TABLE DATA           s   COPY public.tb_profesores (id, identificacion, nombres, apellidos, celular, correo, domicilio, estado) FROM stdin;
    public          postgres    false    227   ?G       d          0    16567    tb_usuarios 
   TABLE DATA           ?   COPY public.tb_usuarios (id, usuario, nombres, identificacion, domicilio, correo, celular, contrasenia, estado, tipo_usuario) FROM stdin;
    public          postgres    false    228   WH       ?           2606    16587    curso_det curso_det_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.curso_det
    ADD CONSTRAINT curso_det_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.curso_det DROP CONSTRAINT curso_det_pkey;
       public            postgres    false    216            ?           2606    16589    cursos cursos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT cursos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cursos DROP CONSTRAINT cursos_pkey;
       public            postgres    false    217            ?           2606    16616    familiares familiar_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.familiares
    ADD CONSTRAINT familiar_key PRIMARY KEY (id);
 A   ALTER TABLE ONLY public.familiares DROP CONSTRAINT familiar_key;
       public            postgres    false    218            ?           2606    16593    horarios horarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.horarios DROP CONSTRAINT horarios_pkey;
       public            postgres    false    219            ?           2606    16595    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    220            ?           2606    16597 "   menu_x_usuario menu_x_usuario_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.menu_x_usuario
    ADD CONSTRAINT menu_x_usuario_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.menu_x_usuario DROP CONSTRAINT menu_x_usuario_pkey;
       public            postgres    false    221            ?           2606    16599 *   profesor_x_horario profesor_x_horario_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.profesor_x_horario
    ADD CONSTRAINT profesor_x_horario_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.profesor_x_horario DROP CONSTRAINT profesor_x_horario_pkey;
       public            postgres    false    223            ?           2606    16601 %   tb_catalogo_tipo tb_catalogoTipo_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.tb_catalogo_tipo
    ADD CONSTRAINT "tb_catalogoTipo_pkey" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.tb_catalogo_tipo DROP CONSTRAINT "tb_catalogoTipo_pkey";
       public            postgres    false    225            ?           2606    16603    tb_catalogo tb_catalogo_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tb_catalogo
    ADD CONSTRAINT tb_catalogo_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tb_catalogo DROP CONSTRAINT tb_catalogo_pkey;
       public            postgres    false    224            ?           2606    16605     tb_disciplina tb_disciplina_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.tb_disciplina
    ADD CONSTRAINT tb_disciplina_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.tb_disciplina DROP CONSTRAINT tb_disciplina_pkey;
       public            postgres    false    226            ?           2606    16607     tb_profesores tb_profesores_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.tb_profesores
    ADD CONSTRAINT tb_profesores_pkey PRIMARY KEY (identificacion);
 J   ALTER TABLE ONLY public.tb_profesores DROP CONSTRAINT tb_profesores_pkey;
       public            postgres    false    227            ?           2606    16609    tb_usuarios tb_usuarios_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT tb_usuarios_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tb_usuarios DROP CONSTRAINT tb_usuarios_pkey;
       public            postgres    false    228            W      x?????? ? ?      X      x?????? ? ?      Y      x?3?4B.cN4?????? f?      Z   +   x?3?JM?,.)?WHIU?M,??焐??F\?Yt?=... j;      [   ?   x?3?4??07???M,R?O??O???r????@????3??%?A??鹉?9z????E???e?E?
?
?.?E?y?FFƺ@d???i?e???TT????_T?Y?l?W*\ú,?vیP?1?????? ??:?      \   ?   x?u?1? E??\@?T?t9@F)vƠ?&En?3?bY?NҤ?=?g???S????????yn???G0 J??l?B趄CVӅc?Mn?`S?J
a???2???zE????fm?4??!?
?;?I8GN???٦?}?i??kRh???{ܶ???5?0?3???9?K?\?-?[?ȳ?)????I9:?`9翚N?j??ϲ??Ny      ]   ?   x?U?K?@?u??@??ǒ`??ܸsSGH????????????5M???ؓC?v,??Q?S? 1\XBԥe?r?
w???+ͣpƁz&?4?E>?w??YB??
??حO?qa?(?????"??Rҩu?0?">?M???w?P{?0?????1?݊V?      ^   U   x???? ??;?D??%?????H+??\C	SK[G.m?u???L?խ????*?[??1??Z???a?????G?O+      _   4   x???  ????p?B?u??
i???Tj??b??Q?p?et7:???      `   ?   x?3?4???K?,?L)M??t?2
$???+??s3S?J????@a????N?*}????ļD ??7B????H|s ??o?i????	2????+?,ILq8M8}S??!?14rM\?M,?c???? tW-      a   5   x?3???,K??t?2??L?-?2?9?KR???2?<N????x? X??      b   6   x?3?40??K,IL?<?9?ӑ˘???3$5/??1?40?t+-I???b???? H?=      c   ?   x?M??
?0@盯?,??G???????^J?MI???k?H?s??]ם??}?? )İ?;y,?N??/W?3pu~??`M?~!?h1\?g,Ŝ?M??v??g?????t?@?G??]itD??%?|9s???Q	!ޔ0:?      d     x????n?0Eg?+?1?W?ln?.F-Щk??),(G@????h??p5???d?u?F:X???Ba?4_,?S}?"3iMŉ:?J?5ߒ??m????$???Ji/vL?&{s??diÁ?????????K?0????)-q???J???t?f?N=?"k?$Vba????????>???B??h??s<??O??j4?j?c?,މ??fP?!DU???x?1??2??uD??M????|??R?(??#??!Eŝ??????G?%}? ?f?     