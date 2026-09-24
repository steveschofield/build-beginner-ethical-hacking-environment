### A Fun Home Lab Exercise: Put a Web Server Behind pfSense

Here is a fun exercise to try. I shared this in a separate forum, but thought it was worth sharing here as well.

If you have a home lab and want some hands-on practice with networking, firewalls, NAT/PAT, and web servers, this is a good project that isn't too difficult to set up.

The basic idea is:

**Internet → Home Router → NAT/PAT → pfSense VM → Private Network → Web Server VM**

Here's the exercise:

1. **Start with your home router.**  
   What model/router do you use? I use Ubiquiti, which allows me to configure NAT/PAT and port-forwarding rules.

2. **Create the appropriate firewall/NAT rules on your router.**

3. **Spin up a pfSense virtual machine in Hyper-V.**  
   The pfSense VM will act as the firewall/router between your home network and a private virtual network.

4. **Forward specific ports from your home router to pfSense.**  
   For example, you could forward:
   - TCP 80 — HTTP
   - TCP 443 — HTTPS

5. **Create a second virtual machine on a private Hyper-V network.**  
   Install Windows or Linux and configure a web server such as Apache or Nginx.

6. **Configure pfSense to forward the web traffic to your web server.**

Your lab would look something like this:

**Home Router → NAT/PAT → pfSense VM → Private Hyper-V Network → Web Server VM**

Hyper-V's private/isolated networking makes this especially useful. The web server doesn't need to sit directly on your normal home network. Its traffic can pass through the pfSense VM, which acts as its router and firewall.

Once everything is configured, disconnect your phone from Wi-Fi and try accessing your website over the cellular network. If the site loads, you've successfully traveled from the public Internet, through your home router, through pfSense, and finally to your private web server.

There are plenty of ways to expand the lab afterward:

- HTTPS certificates
- Firewall logging
- Additional network segments
- IDS/IPS
- Reverse proxies
- Experimenting with different firewall rules

> **One important caution:** You're intentionally exposing a system to the Internet. Keep the web server patched, expose only the ports you need, don't put sensitive information on it, and tear down the forwarding rules when you're finished experimenting.

It's a relatively simple project, but it provides hands-on practice with several networking concepts at once.

Note - if your internet provider uses CGNAT (carrier grade nat, double nat) you'll be able to get directly to your website.  You'd have to use something like Tailscale

**Happy Geeking!**  
Steve
