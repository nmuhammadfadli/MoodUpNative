# Gunakan image Nginx sebagai base
FROM nginx:alpine

# Hapus default Nginx index
RUN rm -rf /usr/share/nginx/html/*

# Copy semua file HTML dan asset ke direktori publik Nginx
COPY . /usr/share/nginx/html/

