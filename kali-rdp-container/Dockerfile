# Use the official Kali Linux base image
# Thank Grok.com for the formatting
# Runs on podman on MacBook M3, docker (ubuntu) within vmware on MacBook M3 (tested)
# The kali-rolling is the most current stable per the kali docs.

FROM kalilinux/kali-rolling

# Set environment variables to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && apt-get install -y \
    kali-desktop-xfce \
    xrdp \
    xorgxrdp \
    dbus-x11 \
 	kali-tools-vulnerability \
	kali-tools-web \
	kali-tools-database \
	kali-tools-passwords \
	kali-tools-wireless \
	kali-tools-reverse-engineering \
	kali-tools-exploitation \
	kali-tools-sniffing-spoofing \
	kali-tools-post-exploitation \
	iputils-ping \
	iputils-tracepath \
	iputils-arping \
	traceroute \
    && apt-get clean

# Configure XRDP to listen on port 3390 (to avoid conflicts with host systems)
RUN sed -i 's/port=3389/port=3390/g' /etc/xrdp/xrdp.ini

# Set up a user for RDP access (e.g., "kali")
RUN useradd -m -s /bin/bash kali && \
    echo "kali:kali" | chpasswd && \
    usermod -aG sudo kali


# Ensure XRDP starts properly and XFCE is the default session
RUN echo "startxfce4" > /home/kali/.xsession && \
    chown kali:kali /home/kali/.xsession

# Expose the RDP port
EXPOSE 3390

# Start XRDP and keep the container running
CMD service xrdp start && tail -f /var/log/xrdp.log
