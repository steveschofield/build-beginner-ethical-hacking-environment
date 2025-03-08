FROM lscr.io/linuxserver/webtop:4.16-r0-ls95

RUN \
  echo "**** adding abc user to root for Docker ****" && \
  usermod -aG root abc && \
  touch /var/run/docker.sock && \
  chown abc:abc /var/run/docker.sock && \
  echo "**** cleanup ****" && \
  rm -rf /tmp/*


COPY desktop-resources/startwm.sh /defaults/startwm.sh
