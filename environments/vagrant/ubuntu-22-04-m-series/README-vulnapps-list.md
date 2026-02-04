# Additional Vulnerable Apps for Apple M series CPU (tested on MacBook Air M3)

**#Original OWASP Juice Shop**

sudo docker pull bkimminich/juice-shop

**git clone** [https://github.com/juice-shop/juice-shop](https://github.com/juice-shop/juice-shop) // (good to have source code locally when doing CTF)

**#OWASP Juice Shop hosted by Traefik SSL Reverse Proxy and Authelia
#Single-Sign-On (SSO) provider. Comes with Cowrie SSH honeypot too**

**git clone** [https://github.com/14rm4nd/SecureTheJuice](https://github.com/14rm4nd/SecureTheJuice)

# From the Ansible file

**- name: Pull Juice Shop Container#[ https://hub.docker.com/r/bkimminich/juice-shop](https://hub.docker.com/r/bkimminich/juice-shop)**

command: docker pull bkimminich/juice-shop

become: yes# If you need sudo privileges

**name: webgoat#[https://github.com/erev0s/VAmPI](https://github.com/erev0s/VAmPI)**

command: docker pull webgoat/webgoat

become: yes

**- name: OWASP top 10 vuln API setup# https://github.com/erev0s/VAmPI**

command: docker pull erev0s/vampi

become: yes

**- name: dvwa # [https://github.com/digininja/dvwa](https://github.com/digininja/dvwa)**

shell: |

cd /home/52pickup/code

  git clone https://github.com/digininja/dvwa

  cd /home/52pickup/code/dvwa

  sed -i 's/127.0.0.1:4280:80/0.0.0.0:4280:80/g' /home/52pickup/code/dvwa/compose.yml #replace 127.0.0.1 with 0.0.0.0 thanks grok!

become: yes

**name: musashi-js# [https://github.com/52pickupWTF/musashi-js](https://github.com/52pickupWTF/musashi-js)**

shell: |

cd /home/52pickup/code

  git clone https://github.com/52pickupWTF/musashi-js

  cd /home/52pickup/code/musashi-js

  docker build --tag musashi-js .

become: yes
