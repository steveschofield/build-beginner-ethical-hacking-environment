# **Setup DVWA (damn vulnerable web app)**

[https://github.com/digininja/DVWA](https://github.com/digininja/DVWA)

# **Download Ubuntu ARM (or x86)**

[https://ubuntu.com/download/server/arm](https://ubuntu.com/download/server/arm)

# **Create VM Ubuntu (Add packages)**

Open a terminal

sudo apt update
sudo apt install net-tools
sudo apt install vim
sudo apt full-upgrade
subo reboot

# **Setup code folder**

mkdir ~/code

# Install Docker or Podman

sudo apt install docker.io -y

# **Download DVWA repo**

cd ~/code

docker pull vulnerables/web-dvwa

**sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose**
