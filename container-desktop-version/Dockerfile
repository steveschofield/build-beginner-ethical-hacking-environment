FROM lscr.io/linuxserver/rdesktop:latest

RUN \
  echo "**** adding abc user to root for Docker ****" && \
  usermod -aG root abc && \
  touch /var/run/docker.sock && \
  chown abc:abc /var/run/docker.sock && \
  echo "**** cleanup ****" && \
  rm -rf /tmp/*

  # Install Git
 RUN apk add git

  # Set work directory (optional)
  WORKDIR /config

  # Default command
#  CMD ["/init"]
COPY desktop-resources/startwm.sh /defaults/startwm.sh
