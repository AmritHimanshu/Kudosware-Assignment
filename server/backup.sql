PGDMP                      |            kudoware_assignment    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16539    kudoware_assignment    DATABASE     y   CREATE DATABASE kudoware_assignment WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_IN';
 #   DROP DATABASE kudoware_assignment;
                postgres    false            �            1259    16552    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100),
    password character varying(100),
    confirm_password character varying(100),
    resume_url text
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16551    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            4           2604    16555    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    16552    users 
   TABLE DATA           X   COPY public.users (id, name, email, password, confirm_password, resume_url) FROM stdin;
    public          postgres    false    216          �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
          public          postgres    false    215            6           2606    16561    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            8           2606    16559    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            �   �  x����Ν �5�)�QA�VmҤ�4iz�����I����7p���Ɂ����.��AR.��� �Y���`ޛm瞍С���}�ò�{7rh�
���pAE��,�:9���$���K���i�G^�v;.ƽ6IH���7����b]G�̕&�|�*�`�67�iBRh�#����)��1;m�/�W�-A�n���	�qH�rX���!�%��D�1n�1����y��J3k�VڰIG�_����ʻ�Upa�v�S��0��9u��W���^o���������գ��v�/��_���}���EEP<�T������E��|:���[0��%� �JR�z폚�al�<��nT��
�I��+�ʛIQ�A���eE���Rߠ��9i���sW��).��N���Y��u�N\¢���x<�� ͷ     