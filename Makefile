build:
	docker build -f ./Dockerfile ./ -t app:latest

run:
	docker run --rm --env-file .env --publish 3000:3000 app:latest