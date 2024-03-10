echo "sudo docker run --name nginx --restart always -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf -d nginx:1.24.0"
sudo docker run --name nginx --restart always -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf -d nginx:1.24.0
sudo docker ps | grep nginx
