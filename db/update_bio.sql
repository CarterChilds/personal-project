update flickr_users
set bio = $1
where user_id = $2
returning bio