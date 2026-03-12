INSERT INTO tbl_utilizadores (
id,
nome, 
numero_identificacao, 
data_nascimento, 
email, 
telefone, 
pais, 
localidade, 
`password`, 
enabled, 
created_at, 
updated_at
) VALUES (
"6138f738-c217-4266-a877-4c3a48f99c5e",
"Jaquilina Gomes",
"F007Q",
"1996-03-27",
"jakscv@gmail.com",
"9591430",
"Cabo Verde",
"Fazenda",
"$2a$12$OaEZf5bu9/YXyAsiQtxEwu5eORbYGPAVlW5Fn/YYebGiMhFRydgt2",
true,
NOW(),
NOW()
);

INSERT INTO tbl_orcamento
VALUES (
NULL,
200,
"6138f738-c217-4266-a877-4c3a48f99c5e",
true,
NOW(),
NOW()
);

INSERT INTO tbl_servicos
VALUES (
NULL,
"Carpintaria",
"Conserto de portas, janelas, mesas, cadeiras e outros mobiliarios e utensilios de madeira",
"Caseiro",
true,
NOW(),
NOW()
);

INSERT INTO tbl_prestadores
VALUES (
"aa5a7bd6-9991-4c3b-a115-119a9413cefa",
"150883404",
"Carpinteira",
0.2,
1000,
0.1,
true,
true,
NOW(),
NOW()
);

INSERT INTO tbl_utilizadores
VALUES (
"33d70f6f-6b3f-402a-8ece-85e8a8a92cea",
"Ana Cardoso",
"F008K",
"2002-11-10",
"anacardoso@gmail.com",
"9000000",
"Cabo Verde",
"Vila Nova",
"$2a$12$azm/X7ztAXKkx5iN5MwuCec9dQPI86P7yjrOB2IiaWXmU1nPNrG8a",
true,
NOW(),
NOW()
);



