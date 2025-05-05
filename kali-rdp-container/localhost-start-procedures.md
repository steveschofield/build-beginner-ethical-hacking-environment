This is the set of steps to start locally.

### Assumptions:

* kali-linux image built
  * podman build -t kali-rdp .
* podman or docker built

# Podman required to have machine VM running

**podman machine start**

# **List container image**

podman images

****REPOSITORY **                      **TAG **        IMAGE ID      **CREATED **      SIZE**
localhost/kali-rdp              latest      b14f6dea6b71  32 hours ago  15.4 GB
docker.io/bkimminich/juice-shop****latest****953e88ca4ff4**  **6 weeks ago **  **468 MB
docker.io/kalilinux/kali-rolling****latest****2dd924e124ab****4 days ago****146 MB****

# **Start JuiceShop**

**podman run -d -p 3000:3000 docker.io/bkimminich/juice-shop
c6a060e371ac556cc5b988ac47018e121dc06975ea7f7bd8b7af28cd7bc4b29d**

***#Start docker with all challenges even with unsafe ones
#https://pwning.owasp-juice.shop/companion-guide/latest/part1/challenges.html*
podman run -e NODE_EVN=unsafe -d -p 3000:3000 docker.io/bkimminich/juice-shop
6d3ddd2503f7a5ca9d4e3d3cf447b3771b133d86841f31343008ad84cce5f860**

# **Check Container status**

**podman ps**

**CONTAINER ID  **IMAGE	 **COMMAND		***CREATED	 ***STATUS	 ***PORTS **                  ****NAMES**
**c6a060e371ac**docker.io/bkimminich/juice-shop:latest****/juice-shop/build...**17 seconds ago****Up 17 seconds**0.0.0.0:3000->3000/tcp****elegant_meitner********

# Start Kali image (need --priviledged flag to run nmap commands)

**podman run --privileged -p 3390:3390 -d localhost/kali-rdp
**920f95cdad80c40f6be1547c0ceb0fabaa811f95c0e1e8a80abe13137025acdb****
