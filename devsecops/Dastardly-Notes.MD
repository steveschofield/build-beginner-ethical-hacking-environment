# Using Dastardly by [Portswigger](https://portswigger.net)

https://portswigger.net/burp/dastardly

Looking for a quick [DAST](https://www.gartner.com/en/information-technology/glossary/dynamic-application-security-testing-dast) (Dynamic application security testing) tool?  I've been focused on [DevSecOps](https://www.devsecops.org/) for a few years and passing along my testing. Dastardly offers CI/CD integration.   


## Run Dastardly

Assumptions include:
- Permission to run test against site! (MAKE SURE to get in writing)
- Machine with docker installed
- Access to the internet

`docker run --user $(id -u) --rm -v $(pwd):/tmp -e DASTARDLY_TARGET_URL=https://x.x.x.x: -e DASTARDLY_OUTPUT_FILE=/tmp/dastardly-report.xml public.ecr.aws/portswigger/dastardly:latest`

## Convert XML file to an HTML
Assumptions: 
- Server has PIP installed

- sudo pip install junit2html
- git clone [https://github.com/inorton/junit2html](https://github.com/inorton/junit2html)

- cd junit2html
- junit2html /tmp/dastardly-report.xml /tmp/dastardly-report.xml.html

**Ran on a Mac**
- open /Applications/Safari.app /tmp/dastardly-report.xml.html 