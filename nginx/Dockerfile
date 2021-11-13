FROM nginx 

COPY certificates/cert.pem /etc/ssl/certs/
COPY certificates/key.pem /etc/ssl/private/


COPY ./default.conf /etc/nginx/conf.d/default.conf
