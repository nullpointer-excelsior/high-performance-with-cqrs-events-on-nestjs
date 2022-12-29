
up-infraestruture:
	docker rm -f northwind-db
	docker rm -f southwind-db
	docker-compose up -d
	echo "Waiting for stack..."
	sleep 5
	cd ../application-stack/;source env.sh;nest start southwind-job-synchronizer

down-infraestruture:
	docker-compose down
	docker volume ls -q | xargs docker volume rm
	