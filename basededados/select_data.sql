SELECT * FROM tbl_utilizadores;

SELECT id, nome FROM tbl_utilizadores;

SELECT * FROM tbl_utilizadores, tbl_prestadores;

SELECT tbl_utilizadores.id, tbl_prestadores.id FROM tbl_utilizadores, tbl_prestadores;

SELECT
tbl_orcamento.id,
total,
tbl_utilizadores.id,
tbl_utilizadores.nome
FROM
tbl_orcamento,
tbl_utilizadores
WHERE
tbl_orcamento.id_utilizadores = "33d70f6f-6b3f-402a-8ece-85e8a8a92cea";

SELECT * FROM tbl_servicos;

SELECT * 
FROM tbl_utilizadores 
WHERE tbl_utilizadores.id = "33d70f6f-6b3f-402a-8ece-85e8a8a92cea";

SELECT *
FROM tbl_prestadores
WHERE
tbl_prestadores.nif = "150883404";

SELECT * FROM tbl_utilizadores;