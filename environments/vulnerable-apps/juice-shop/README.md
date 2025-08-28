Collection of Juice-Shop related links, nodes.  Juice Shop is one of the sample vulnerable apps in my base project for [Building a Beginner ethical hacking environment.](MacBook-M-Series-vagrant-ubuntu-2204/README.md)

**#To run unsafe in Docker or podman (note this is not recommended )**

docker run -d -e "NODE_ENV=unsafe" -p 3000:3000 bkimminich/juice-shop

podman run -d -e "NODE_ENV=unsafe" -p 3000:3000 bkimminich/juice-shop

**#Links**

https://pwning.owasp-juice.shop/companion-guide/latest/index.html

https://github.com/juice-shop repo

**#Web attack methology (good overall read while learning how to web / api attack)**

https://owasp.org/www-project-web-security-testing-guide/stable/
