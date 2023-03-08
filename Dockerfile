FROM nginx:alpine
COPY ./build /var/www
#COPY ./CI/nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80 443
