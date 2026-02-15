FROM lscr.io/linuxserver/rdesktop:latest

RUN \
  echo "**** adding abc user to root for Docker ****" && \
  usermod -aG root abc

  # Install Git
 RUN apk add git

  # Set work directory (optional)
  WORKDIR /config

  # Default command
#  CMD ["/init"]
COPY desktop-resources/startwm.sh /defaults/startwm.sh
