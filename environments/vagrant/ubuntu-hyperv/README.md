# Ubuntu 22.04 Ethical Hacking Lab - Hyper-V / VirtualBox

This Vagrant environment provisions an Ubuntu 22.04 VM with pre-installed ethical hacking tools and vulnerable applications for educational purposes.

## Prerequisites

### Windows (Hyper-V)
1. Enable Hyper-V in Windows Features
2. Install Vagrant from https://releases.hashicorp.com/
3. Run PowerShell as Administrator

### Cross-platform (VirtualBox)
1. Install VirtualBox
2. Install Vagrant

## Quick Start (PowerShell as Administrator)

```powershell
# Navigate to this directory
cd environments\vagrant\ubuntu-hyperv

# Set your SSH public key (adjust path if needed)
$env:SSH_PUBLIC_KEY = Get-Content $env:USERPROFILE\.ssh\id_rsa.pub

# Start the VM with Hyper-V
vagrant up --provider=hyperv
```

When prompted for SMB credentials, enter your Windows username and password (this is used to share the ansible playbooks folder with the VM).

## SSH Key Setup

Set your SSH public key as an environment variable before running `vagrant up`:

**PowerShell:**
```powershell
# Using default SSH key location
$env:SSH_PUBLIC_KEY = Get-Content $env:USERPROFILE\.ssh\id_rsa.pub

# Or specify a different key
$env:SSH_PUBLIC_KEY = Get-Content C:\path\to\your\key.pub
```

**Bash (Git Bash on Windows, Linux, macOS):**
```bash
export SSH_PUBLIC_KEY="$(cat ~/.ssh/id_rsa.pub)"
```

## Usage

### Start the VM
```powershell
# For Hyper-V (run PowerShell as Administrator)
vagrant up --provider=hyperv

# For VirtualBox
vagrant up --provider=virtualbox
```

### Access the VM
```powershell
# Via Vagrant
vagrant ssh

# Via SSH with key (get IP from Hyper-V Manager or vagrant ssh-config)
ssh 52pickup@<VM_IP>

# Via password (fallback)
# Username: 52pickup
# Password: example123!
```

### Get VM IP Address
```powershell
# From Vagrant
vagrant ssh -c "hostname -I"

# Or check Hyper-V Manager for the IP address
```

### Stop/Destroy
```powershell
vagrant halt      # Stop the VM
vagrant destroy   # Delete the VM completely
```

## What Gets Installed

### Base System
- Python 3 with pyenv
- Common development tools (vim, nano, curl, wget, etc.)
- Network utilities (net-tools, dnsutils, etc.)
- nginx and PHP-FPM

### Docker Environment
- Docker CE with docker-compose plugin
- Python Docker module

### Vulnerable Applications (Docker images)
- **Juice Shop** - OWASP modern web app security (port 3000)
- **DVWA** - Damn Vulnerable Web Application (port 4280)
- **WebGoat** - Security lessons platform (port 8080)
- **VAmPI** - Vulnerable API for OWASP Top 10 (port 5000)
- **WrongSecrets** - OWASP secrets challenges (port 8081)
- **Musashi-js** - JavaScript security challenges
- **Vuln-bank** - Banking vulnerabilities demo

## Starting Vulnerable Apps

After SSH into the VM:

```bash
# Juice Shop
docker run -d -p 3000:3000 bkimminich/juice-shop

# DVWA
cd ~/code/dvwa && docker-compose up -d

# WebGoat
docker run -d -p 8080:8080 webgoat/webgoat

# VAmPI
docker run -d -p 5000:5000 erev0s/vampi:latest

# WrongSecrets
docker run -d -p 8081:8080 jeroenwillemsen/wrongsecrets:latest-no-vault
```

## Network Access

To access vulnerable apps from your host machine, uncomment the port forwarding lines in the Vagrantfile or use the VM's IP address directly.

## Security Warning

These applications are intentionally vulnerable. Only use in isolated lab environments. Never expose to the internet or untrusted networks.
