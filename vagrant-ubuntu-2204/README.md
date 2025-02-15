# Choose a Provider (This comes from https://github.com/samuraiWTF/samuraiWTF)

I use a MacBook Pro M series and attempted to use SamuraiWTF locally.   The build of an OS was fine using vagrant and ran into various issues with sample apps bundled into the samuraiWTF stand-alone VM.  I'd recommend using an x86/64 machine or Windows.

This project uses Vagrant to build this VM, so that is the prerequisite.  This VM is built on top of the [*bento/ubuntu-22.04* base box](https://app.vagrantup.com/bento/boxes/ubuntu-22.04) ,which supports additional providers. We have a configuration for virtualbox but if you need a different provider (e.g. vmware_fusion) then it may be possible by adding its configuration to the Vagrant file in this folder.

## VMware Fusion

1. To install VMware provider to [Vagrant](https://developer.hashicorp.com/vagrant/docs/providers/vmware/installation) use the following command `vagrant plugin install vagrant-vmware-desktop`
2. From the command line, navigate to this folder and run `vagrant up --provider=vmware_desktop`
3. The VMware provider will automatically open a new window/vm in vmware workstation. Ignore that window for now and wait for the script to complete. This may take a long time (20-30 minutes, possibly longer when running alongside Hyper-V).
4. Run `vagrant reload` to restart the VM and ensure all the configuration is in place during boot.
5. Connect to the VM and login in with user: _samurai_ , password: _samurai_

## Additional Vulnerable Apps for Apple M series CPU (tested on MacBook Air M3)

**#Original OWASP Juice Shop**
sudo docker pull bkimminich/juice-shop

**#OWASP Juice Shop hosted by Traefik SSL Reverse Proxy and Authelia
#Single-Sign-On (SSO) provider. Comes with Cowrie SSH honeypot too**

git clone https://github.com/14rm4nd/SecureTheJuice

## Other Vagrant providers included in original documentation

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
