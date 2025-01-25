# Update JuiceShop to use Virtual Machine IP address vs. Localhost (127.0.0.1)

This document covers steps + commands to adjust running **JuiceShop** from using localhost (127.0.0.1) to whatever IP address is assigned to your virtual machine.

**Assumptions**:

Followed my video setting up your Ethical Hacking Environment

https://www.youtube.com/watch?v=3UiBmQT7nF8

Juiceshop should be running on the localhost IP address, default documentation listed on JuiceShop Github Site (usually 127.0.0.1:3000:3000)

*sudo docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop*

1) Open hypervisor on local machine
2) Start Kali Linux (or whatever OS used)
3) Open **terminal**
4) Type **ifconfig**
5) Review findings
   1) **There are two network adapters listed**
   2) One is **lo** = localhost
   3) Second is **eth0 = host address (you want this one!)**
6) Stop docker if running
   1) sudo docker ps
   2) sudo docker stop `(ContainerID)`
7) type **docker run --rm -p (Replace-ME):3000:3000 bkimminich/juice-shop**
8) Hit Enter within terminal
9) Open **Burp Suite Community Edition** locally on your main workstation
10) Open a browser on local machine (not in virtual machine)
    1) Type in URL : http://(ip-address-of-vm):3000 (i.e http://172.16.20.20:3000)
11) Browse around JuiceShop locally,
12) Go to HTTP history within Burp Suite
13) Success!
