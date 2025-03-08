# Build and deploy container able to RDP (remote desktop protocol)

This Dockerfile uses a container image that has ability to be deployed and run with port 3389 (Microsoft Remote desktop protocol).  The container for this example uses an Ubuntu server deployed either on a MacBook M series or Windows Hyper-v.    

The [Server used is build from a Vagrant file here](MacBook-M-Series-vagrant-ubuntu-2204) in the repo

# Commands

ssh 52pickup@172.16.133.183 

# **#Pulled down repo**

git clone https://github.com/steveschofield/build-beginner-ethical-hacking-environment

cd rdesktop-container

# **#Build the local container**

sudo docker build -t basic-desktop .

# **Here is the output**

```
sudo docker build -t rdesktop .
[+] Building 1.3s (10/10) FINISHED                                                                                                                                                                                                                             docker:default
 => [internal] load build definition from Dockerfile                                                                                                                                                                                                                     0.0s
 => => transferring dockerfile: 478B                                                                                                                                                                                                                                     0.0s
 => [internal] load metadata for lscr.io/linuxserver/rdesktop:latest                                                                                                                                                                                                     1.3s
 => [internal] load .dockerignore                                                                                                                                                                                                                                        0.0s
 => => transferring context: 2B                                                                                                                                                                                                                                          0.0s
 => [1/5] FROM lscr.io/linuxserver/rdesktop:latest@sha256:e023bc6ad754efa9674b4bcc84e3628b2437a0dbe0546fb2367a066ea22c461d                                                                                                                                               0.0s
 => [internal] load build context                                                                                                                                                                                                                                        0.0s
 => => transferring context: 87B                                                                                                                                                                                                                                         0.0s
 => CACHED [2/5] RUN   echo "**** adding abc user to root for Docker ****" &&   usermod -aG root abc &&   touch /var/run/docker.sock &&   chown abc:abc /var/run/docker.sock &&   echo "**** cleanup ****" &&   rm -rf /tmp/*                                            0.0s
 => CACHED [3/5] RUN apk add git                                                                                                                                                                                                                                         0.0s
 => CACHED [4/5] WORKDIR /config                                                                                                                                                                                                                                         0.0s
 => CACHED [5/5] COPY desktop-resources/startwm.sh /defaults/startwm.sh                                                                                                                                                                                                  0.0s
 => exporting to image                                                                                                                                                                                                                                                   0.0s
 => => exporting layers                                                                                                                                                                                                                                                  0.0s
 => => writing image sha256:7f1c0143de6dffc3074d7f1d7a4f56ea7383d690fd5518ed64fc0f4ab8ea6f3b                                                                                                                                                                             0.0s
 => => naming to docker.io/library/rdesktop                                                   
```

# **#Deploy container for testing**

Here is the output including command to launch

`sudo docker run -p 3389:3389 basic-desktop
[migrations] started
[migrations] no migrations found
usermod: no changes
───────────────────────────────────────

      ██╗     ███████╗██╗ ██████╗
      ██║     ██╔════╝██║██╔═══██╗
      ██║     ███████╗██║██║   ██║
      ██║     ╚════██║██║██║   ██║
      ███████╗███████║██║╚██████╔╝
      ╚══════╝╚══════╝╚═╝ ╚═════╝

   Brought to you by linuxserver.io
───────────────────────────────────────

To support LSIO projects visit:
https://www.linuxserver.io/donate/

───────────────────────────────────────
GID/UID
───────────────────────────────────────

User UID:    911
User GID:    911
───────────────────────────────────────
Linuxserver.io version: 55d78481-ls248
Build-date: 2025-03-02T23:40:47+00:00
───────────────────────────────────────
  

Generating 2048 bit rsa key...

ssl_gen_key_xrdp1 ok

saving to rsakeys.ini

..........+......+.....+....+..+......+.......+++++++++++++++++++++++++++++++++++++++*...................+....+..+...+.+..+....+...+.....+++++++++++++++++++++++++++++++++++++++*..........+.+............+...........+.+...........+...+.........................+..+...................+...+.................+.+..+...+.......+......+............+..+.+.....+.+......+...+............+..+.+..+.........................+...+...........+..........+...+......+.....+.........+.+..++++++
..+..................+..+...+...+.............+.....+.......+..+.......+...+...........+.+........+...+...+.......+..+...+...+.......+...+.....+.......+...+.........+..+++++++++++++++++++++++++++++++++++++++*...+....+.....+++++++++++++++++++++++++++++++++++++++*.......+...........+..........+..+...............+.+.........+...+........+....+...+........+....+.....+.......+...+.....+.+.....+.+.........+..+....+.....+.+...+...........+..........+...+..+......+.........+.+............+..+.+.....+.............+............+..+.+..+....+.....................+..+......+.........+......+.+..................+.....+.+..+.......+.....+.............+........+.........+.......+...............+.....+......+...+....+...+.....+...+....+..+...+...+.......+......+.....+.........+...+.......+...........+.+........+.+.....+......+.+........+...............+.......+...+......+.....+..................+.+......+...+..+.+..+.......+......+..+.............+............+...............+.................+...+.+............+...+.....+.+.........+......+........+...+.......+...............+......+..+..........+.....+.........+...+...+....+...+...+..+......+.+.....+...+..................+....+...++++++
-----
[custom-init] No custom files found, skipping...
Connection to localhost (::1) 3350 port [tcp/*] succeeded!
Connection to localhost (::1) 3389 port [tcp/ms-wbt-server] succeeded!
[ls.io-init] done.`

# From a MacBook or windows use the RDP client

[image](build-beginner-ethical-hacking-environment/images/rdesktop-container/rdesktop-login.png)

[image](build-beginner-ethical-hacking-environment/images/rdesktop-container/rdesktop-desktop.png)


