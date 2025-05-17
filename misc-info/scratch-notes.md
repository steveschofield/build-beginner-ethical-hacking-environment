sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv

lscr.io/linuxserver/kali-linux:latest

```bash
docker run -d \
  --name kali-linux \
  --security-opt seccomp=unconfined \
  -e PUID=1000\
  -e PGID=1000\
  -e TZ=Etc/UTC \
  -p 3389:3389 \
  -p 3000:3000 \
  -v kali-config:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/kali-linux:latest
```

To extend a docker vm to use all space

```bash
b
```

docker pull

> sudo lvextend -l+100%FREE /dev/ubuntu-vg/ubuntu-lv
>
> sudo resize2fs /dev/ubuntu-vg/ubuntu-lv

https://www.kali.org/docs/containers/using-kali-docker-images/

**docker pull docker.io/kalilinux/kali-rolling**

**sudo docker run -it kalilinux/kali-rolling:latest /bin/bash

docker run** --tty** --interactive** kalilinux/kali-rolling****

**`apt update && apt -y install kali-linux-large`
**

apt install -y  `kali-linux-everything`

sudo docker pull lscr.io/linuxserver/rdesktop:debian-xfce

sudo apt install -y vim -y
sudo apt install -y wget -y

echo "deb http://http.kali.org/kali kali-rolling main non-free contrib" | sudo tee -a /etc/apt/sources.list.d/kali.list
sudo wget -qO - https://archive.kali.org/archive-key.asc | sudo tee /etc/apt/trusted.gpg.d/kali-archive-key.asc
sudo apt update

What is metapackage

https://www.kali.org/docs/general-use/metapackages/
