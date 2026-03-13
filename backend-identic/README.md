docker stop identic-api
docker rmi identic-api
docker compose down --rmi all --volumes --remove-orphans
docker system prune -af
docker compose build
