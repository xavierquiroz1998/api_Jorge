

select A.codigo, B.*,
D.identificacion, D.nombres ||' '||D.apellidos as nombre_profesor,
D.celular, D.correo, D.domicilio, D.estado
from tb_disciplina A inner join 
vw_horarios B ON A.id = B.id_disciplina inner join 
profesor_x_horario C ON B.id = C.id_horario inner join 
tb_profesores D ON C.id_profesor = D.id

create view vw_profesor_x_horario as
select B.id as id_horario, D.* 
from vw_horarios B inner join 
profesor_x_horario C ON B.id = C.id_horario inner join 
tb_profesores D ON C.id_profesor = D.id

select * from vw_profesor_x_horario

select * from vw_horarios where B.id_disciplina

select * from vw_horario_x_profesor

select * from tb_profesores
