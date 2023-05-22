create table if not exists movies (
  id serial primary key, 
  title varchar(255),
  comments text[],
  poster_path varchar(255),
  id_themoviesdb int 
);

insert into movies(title, comments) values('test','comment')

