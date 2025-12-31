***# Vulnerable Apps links 

Credit for list provided by **Joas A Santos**.  
https://www.linkedin.com/feed/update/urn:li:activity:7044647122381484032/ 

This is a list I'm using for quick **copy and paste** when testing new Vulnerability Scanners.  I'm a **homelab junkie** trying things in a controlled environment.  I've been using https://ubuntu.com server **minimized** for my base server OS.  When possible, I like to use container images. As I find more links, I'll add here.

## List of Vulns apps and my individual notes
 
echo "#AWSGoat : A Damn Vulnerable AWS Infrastructure" 
- git clone https://github.com/ine-labs/AWSGoat 

echo "#AzureGoat : A Damn Vulnerable Azure Infrastructure" 
- git clone https://github.com/JOSHUAJEBARAJ/GCP-Goat 

echo "#GCPGoat: A Damn Vulnerable GCP Infrastructure" 
- git clone https://lnkd.in/dMVmNuvZ  

echo "#DeFi: Damn Vulnerable DeFi" 
- git clone https://lnkd.in/dbWesvxW  

echo "#Webpentest: A Damn Vulnerable Web Application" 
**meant to run on local VM vs. container**
## Pre-script notes 
- Ubuntu Server is setup`
- Network connectivty`
- DNS is setup
`- sudo apt install git -y 
 - sudo mkdir /apps
 - sudo mkdir /apps/webapps
 - sudo chmod -R 777 /apps

**My Setup notes for DVWA**
- git clone https://github.com/digininja/DVWA
- sudo service apache2 start 
- cd /var/www/html 
- sudo ln -s /apps/webapps/DVWA DVWA
- sudo chmod -R 777 DVWA 
- sudo service mysql start
- sudo mysql -u root -p
- hit Enter key
- mysql> create database dvwa;
- mysql> create user dvwa@localhost identified by 'p@ssw0rd';
- mysql> grant all on dvwa.* to dvwa@localhost;
- mysql> flush privileges;
- myqll> exit

- Update config:
- sudo cp /var/www/html/DVWA/config/config.inc.php.dist /var/www/html/DVWA/config/config.inc.php
- Look at https://www.google.com/recaptcha/admin add to /var/www/html/DVWA/config/config.inc.php
- allow in php.ini allow_url_include
- sudo service apache2 restart
- Open Safari / Chrome http://x.x.x.x:8001/index.php

echo "Damn Vulnerable Web Application Docker container" 
- sudo git clone https://github.com/opsxcq/docker-vulnerable-dvwa 

**My Notes for DVWA within container**
- navigate to /apps/dockerapps/docker-vulnerable-dvwa 
  - update php.ini to enable "allow_url_include"
  - update config.ini.php to include Captcha keys 
  -   *https://www.google.com/recaptcha/admin/site
- sudo docker build -t vulnerables/web-dvwa . 
- sudo docker run --rm -it -p 8001:80 vulnerables/web-dvwa 
- Open Safari / Chrome http://x.x.x.x:8001/index.php
- Login as admin / password
- Click Setup Database
- It'll take you to the login page again
- Click 

echo "#API: A Damn Vulnerable Web Sockets" 
- git clone https://github.com/snoopysecurity/dvws-node 

echo "#Mobile: Damn Vulnerable Hybrid Mobile App" 
- git clone https://github.com/logicalhacking/DVHMA 

echo "#CICD: Deliberately vulnerable CI/CD environment" 
- git clone https://github.com/cider-security-research/cicd-goat 

echo "#GraphQL: Damn Vulnerable GraphQL Application" 
- git clone https://github.com/dolevf/Damn-Vulnerable-GraphQL-Application 

echo "#Webservice: Damn Vulnerable Web Services" 
- git clone https://github.com/snoopysecurity/dvws 

echo "#VamPI: Vulnerable API" 
- git clone https://github.com/erev0s/VAmPI 

echo "#DVSA: Damn Vulnerable Serverless Application" 
- git clone https://github.com/OWASP/DVSA 

echo "#DVTA: DVTA is a Vulnerable Thick Client Application" 
- git clone https://github.com/srini0x00/dvta 

echo "#DVJA: Damn Vulnerable Java Application" 
- git clone https://github.com/appsecco/dvja 

echo "#DVID: Damn Vulnerable IoT Device" 
- git clone https://github.com/Vulcainreo/DVID 

echo "#DVPWA: Damn Vulnerable Python Web Application" 
- git clone https://github.com/anxolerd/dvpwa 

echo "#DVAS: Damn Vulnerable Application Scanner (PDF file)" 
- git clone https://ceur-ws.org/Vol-2940/paper36.pdf 

echo "#DVB: Damn Vulnerable Bank" 
- git clone https://github.com/rewanthtammana/Damn-Vulnerable-Bank/ 

echo "#DVWPS: Damn Vulnerable WordPress Site" 
- git clone https://github.com/vianasw/dvwps 

echo "#DVNA: Damn Vulnerable NodeJS Application" 
- git clone https://github.com/appsecco/dvna 

echo "#DVRA: Damn Vulnerable Ruby on Rails" 
- git clone https://github.com/guilleiguaran/dvra 

echo "#DVGM: Damn Vulnerable Grade Management" 
- git clone https://git.logicalhacking.com/BrowserSecurity/DVGM 

echo "#Tiredful" 
- sudo git clone https://github.com/payatu/Tiredful-API/ 

**My Notes for Tiredful api**
- sudo docker build -t homelab-tiredfulapi . 
- sudo docker run -p 8000:8000 --name homelab-tiredful -it homelab-tiredful
- Browse http://x.x.x.x:8000/scenario

echo "#DVCSharp: Damn Vulnerable Cecho "# Application" 
- git clone https://github.com/appsecco/dvcsharp-api 

echo "#DVHMA: Damn Vulnerable Hybrid Mobile App" 
- git clone https://github.com/logicalhacking/DVHMA 

echo "#DVIA: Damn Vulnerable iOS App" 
- git clone https://github.com/prateek147/DVIA 

echo "#DVIA2: Damn Vulnerable iOS App 2" 
- git clone https://github.com/prateek147/DVIA-v2 

echo "#DVRF: Damn Vulnerable Router Firmware" 
- git clone https://github.com/praetorian-inc/DVRF 

echo "#DVFaaS: Damn Vulnerable Functions as a Service" 
- git clone https://github.com/we45/DVFaaS-Damn-Vulnerable-Functions-as-a-Service 

echo "#DVCA: Damn Vulnerable Cloud Application" 
- git clone https://github.com/m6a-UdS/dvca 

**OWASP Juice Shop**
- Install Docker (docker and docker.io)
- sudo Run docker pull bkimminich/juice-shop
- sudo Run docker run --rm -p 3000:3000 bkimminich/juice-shop
- sudo Browse to http://localhost:3000 (on macOS and Windows browse to http://192.168.99.100:3000 if you are using docker-machine instead of the native docker installation)
