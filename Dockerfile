# Author: Vedant Patel | Purpose: Serve the SWE 645 Homework 1 static site with Nginx.
FROM nginx:alpine
COPY index.html survey.html style.css script.js /usr/share/nginx/html/
COPY images/ /usr/share/nginx/html/images/
EXPOSE 80
