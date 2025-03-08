## Automated Ubuntu build with Vulnerable apps using Vagrant by Hashicorp / Ansible playbooks

I use a MacBook Pro M series (Air 24 GB Ram / M3 series) and attempted to use [SamuraiWTF](https://github.com/samuraiWTF/samuraiWTF).   **SamuraiWTF** was created by Secure Ideas builds an VM various tools and sample vulnerable apps all running locally.   When attempting to run on my MacBook M series, I ran into issues with sample apps bundled into the samuraiWTF VM.   This is a good project, I'd recommend using an x86/64 machine or Windows with Hyper-V if you want to use it.  It's a safe way to have a local pentesting environment for API, Web and other apps.

The "modified project" uses Vagrant to build an Ubuntu 22.04 VM, including Ansible playbooks.  This VM is built on top of the [*bento/ubuntu-22.04* base box](https://app.vagrantup.com/bento/boxes/ubuntu-22.04) , which supports additional providers.  I prefer using VMware Fusion for the hypervisor.  My goal is to evaluate and learn / add additional vulnerable apps running on MacBook M series.   My #homelab also includes Windows 10 w/Hyper-V.  I like a challenge and share what others could benefit from.   If you have sample apps, please share!

## HomeBrew

I use homebrew ([https://brew.sh/](https://brew.sh/)) for package management.

Here are commands installing the vagrant pre-reqs

1. **brew install vagrant**
2. **brew install vagrant-vmware-utility**
3. Follow instructions under VMware Fusion (if you don't have VMware Fusion, register on Broadcom and install on MacBook)

## VMware Fusion

1. To install VMware provider to [Vagrant](https://developer.hashicorp.com/vagrant/docs/providers/vmware/installation) use the following command `b`
2. From the command line, navigate to this folder and run `vagrant up --provider=vmware_desktop`
3. The VMware provider will automatically open a new window/vm in vmware workstation. Ignore that window for now and wait for the script to complete. This may take a long time (20-30 minutes, possibly longer when running alongside Hyper-V).
4. Run `vagrant reload` to restart the VM and ensure all the configuration is in place during boot.
5. Connect to the VM and login in with user: _samurai_ , password: _samurai_

## Additional [Vulnerable Apps](README-vulnapps-list.md) for Apple M series CPU (tested on MacBook Air M3)

## Other providers included in original documentation

## Hyper-V (Default, Windows)

1. From an Administrator PowerShell window, navigate to this folder and run `vagrant up`
2. Select the _Default Switch_ when prompted to select which switch to use. If you don't have a _Default Switch_ option then you will need to create or use a switch that will allow the VM to access the Internet.
3. Wait for the script to complete. This may take a long time (20-30 minutes).
4. Run `vagrant reload` to restart the VM and ensure all the configuration is in place during boot.
5. Connect to the VM and login in with user: _samurai_ , password: _samurai_

## VirtualBox

1. From the command line, navigate to this folder and run `vagrant up --provider=virtualbox`
2. The VirtualBox provider will automatically open a new window. Ignore that window for now and wait for the script to complete. This may take a long time (20-30 minutes, possibly longer when running alongside Hyper-V).
3. Run `vagrant reload` to restart the VM and ensure all the configuration is in place during boot.
4. Connect to the VM and login in with user: _samurai_ , password: _samurai_
