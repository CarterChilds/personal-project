INSERT INTO flickr_users
(username, auth_id, profile_picture)
VALUES($1,$2,$3)
RETURNING *;