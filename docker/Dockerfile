FROM nginx:1.15.8-alpine

COPY www /usr/share/nginx/html/
COPY docker/nginx.conf /etc/nginx/nginx.tmpl

EXPOSE 80
CMD /bin/sh -c "sed 's|BACKEND_URI|$BACKEND_URI|g' /etc/nginx/nginx.tmpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' || cat /etc/nginx/conf.d/default.conf"