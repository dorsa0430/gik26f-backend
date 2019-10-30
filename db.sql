create table users
(
  id       integer primary key autoincrement not null,
  fname    varchar(100)                      not null,
  username varchar(100)                      not null,
  email    varchar(100)                      not null
);

create table tasks
(
  id        integer primary key autoincrement not null,
  username  varchar(100)                      not null,
  task      varchar(100)                      not null,
  email varchar(100) not null,
  createdate date default (date('now')),
  deadline  date default null,
  done      boolean  default false,
  foreign key (username) references users (username)
);

insert into users(fname, username)
VALUES ('user1', 'user01'),
       ('user2', 'user02'),
       ('user3', 'user03'),
       ('user4', 'user04');

insert into tasks(username, email, task, deadline)
values ('user01', 'wash the dishes', 'user01@gmail.com', '2019-10-12'),
       ('user02', 'do the laundry', 'user02@gmail.com', '2019-10-14'),
       ('user03', 'study sql and database', 'user03@gmail.com', '2019-10-15'),
       ('user04', 'vaccuming.', 'user04@gmail.com', '2019-10-13');