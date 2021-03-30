CREATE DATABASE burgers_db;
CREATE TABLE burgers (
    -- column one: ID (1, 2, 3...)
    id int auto_increment primary key,

    -- column two: burger_name(kdf, laksdjf, dkalf...)
    burger_name varchar(50),

    -- column three: devoured(0, 1, 0...(false, true, false...)) (default false)
    devoured tinyint(1) not null default 0

        column 4: top bun (default true)
        top_bun tinyint(1) not null default 1

        column 5: meat (default false)
        patty tinyint(1) not null default 0

        column 6: ketchup (default false)
        ketchup tinyint(1) not null default 0

        

        bottom bun (default true)
        bottom_bun tinyint(1) not null default 1
);