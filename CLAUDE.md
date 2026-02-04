# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains documentation, configurations, and automation for building beginner ethical hacking environments. It includes Vagrant-based VM setups, Docker containers, and deployment scripts for various vulnerable applications used for educational cybersecurity purposes.

## Key Architecture Components

### 1. Vagrant-Based VM Environment (`environments/vagrant/ubuntu-22-04-m-series/`)
- **Base**: Ubuntu 22.04 using `bento/ubuntu-22.04` box
- **Provisioning**: Ansible playbooks for automated setup
- **Target Platform**: MacBook M-series with VMware Fusion support
- **User Setup**: Creates `52pickup` user with password `example123!`

#### Core Ansible Playbooks:
- `local_playbook_base.yml`: Base system setup
- `local_playbook_docker.yml`: Docker installation and configuration  
- `local_playbook_vulnapps.yml`: Vulnerable applications deployment

### 2. Container Environments
- **Kali RDP Container** (`environments/containers/kali-rdp/`): Full Kali Linux with XFCE desktop via RDP
- **Linux Desktop Container** (`environments/containers/linux-desktop/`): Alternative Linux desktop container

### 3. Vulnerable Applications
The environment deploys multiple vulnerable web applications for security testing:
- **OWASP Juice Shop**: Web application security testing
- **DVWA**: Damn Vulnerable Web Application  
- **WebGoat**: Interactive security lessons
- **VAmPI**: Vulnerable API for OWASP Top 10
- **WrongSecrets**: OWASP secrets management challenges
- **Musashi-js**: JavaScript security challenges
- **Vuln-bank**: Banking application vulnerabilities

## Common Development Commands

### Vagrant Environment Setup
```bash
# Prerequisites (macOS with Homebrew)
brew install vagrant
brew install vagrant-vmware-utility

# Navigate to VM directory
cd environments/vagrant/ubuntu-22-04-m-series/

# Start VM with VMware provider
vagrant up --provider=vmware_desktop

# Restart VM after initial setup
vagrant reload

# SSH into VM
vagrant ssh

# Stop VM
vagrant halt

# Destroy VM
vagrant destroy
```

### Container Operations

#### Kali RDP Container
```bash
# Navigate to container directory
cd environments/containers/kali-rdp/

# Build container (Docker)
sudo docker build -t kali-rdp .

# Build container (Podman)
podman build -t kali-rdp .

# Run container (Docker)
sudo docker run -p 3390:3390 kali-rdp

# Run container (Podman with privileges for nmap)
sudo podman run --privileged -d -p 3390:3390 localhost/kali-rdp

# Run with persistent storage (Podman)
mkdir ~/kali-rdp-data
podman machine init --volume /Users/$(whoami)/kali-rdp-data:/kali-rdp-data
podman machine start
podman run -d -p 3390:3390 --privileged --volume /kali-rdp-data:/kali-rdp-data localhost/kali-rdp
```

### Vulnerable Application Management

#### Within VM Environment
```bash
# Start Juice Shop
docker run -d -p 3000:3000 bkimminich/juice-shop

# Start DVWA
cd /home/52pickup/code/dvwa
docker-compose up -d

# Start VAmPI API
docker run -d -p 5000:5000 erev0s/vampi:latest

# Start WebGoat
docker run -d -p 8080:8080 webgoat/webgoat

# Start WrongSecrets
docker run -d -p 8081:8080 jeroenwillemsen/wrongsecrets:latest-no-vault
```

## Network Configuration

- **VM Default User**: `52pickup:52pickup` (for connection)
- **Kali Container User**: `kali:kali` 
- **Custom VM User**: `52pickup:example123!`
- **RDP Access**: Port 3390 (non-standard to avoid conflicts)
- **Application Ports**: Various (3000, 4280, 5000, 8080, 8081)

## Security Considerations

- All applications are intentionally vulnerable for educational purposes
- Environment should only be used in isolated/lab settings
- Default credentials are documented for educational access
- Network isolation recommended when running vulnerable applications

## Directory Structure Notes

- `resources/mentoring-notes/`: Educational materials and documentation
- `environments/vulnerable-apps/juice-shop/`: OWASP Juice Shop specific documentation
- `resources/conference-materials/`: Conference materials and presentations
- `environments/vagrant/ubuntu-22-04-m-series/scripts/`: Utility scripts for browser launching and automation
- Vagrant synced folders use rsync for better M-series compatibility

## Platform Support

- **Primary**: macOS M-series with VMware Fusion
- **Secondary**: Windows with Hyper-V, VirtualBox on various platforms
- **Container Runtime**: Docker and Podman supported