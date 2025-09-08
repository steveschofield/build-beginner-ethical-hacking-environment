###### Credit for this content goes to : This was originally found on CodeBerg [Codeberg](https://codeberg.org/mMONTAGEe_Workshop/Ethical-Hacking-Labs) and was a fork of this repo on Github. [Ethical Hacking Labs](https://github.com/Samsar4/Ethical-Hacking-Labs/blob/master/README.md)


# Ethical Hacking Labs

![h](/resources/Samsar4-Ethical-Hacking-Labs/images/header-ehl.jpg)

This is a collection of tutorials and labs made for  ethical hacking students, cybersecurity students, network and sys-admins. These tutorials accompany the resources of CEH content and different resources across the internet.

⌨️ The tutorials is very practical/hands-on. Don't worry if you are a completely noob, you don't need to be an expert to start learn ethical hacking. **Google is always your best friend.** This repo will guide you very carefully from basics to more advanced techniques.

**✅ Prerequisites**:

* Any computer with at least 8GB RAM (16GB recommended)
* At least 80GB of free disk space available
* Hardware-based virtualization support

---

> **⚠️ Disclaimer**:
> *This is purely for educational purposes only. DO NOT try these techniques with any public network. Because if you are find guilty for causing any harm to any individual, government, corporate body, non-profit etc you will be sued with serious charges of cyber crime. I recommend you to practice the lessons in this course on your owned system and your own data in a private or local network.*

---

## ⚙️ Core Knowledge

First things first, you really need to understand how things work before start to disassembly and look for vulnerable components. The more you understand how things works, a better hacker you'll be. The 'Core Knowledge' (module 0) is just a jumpstart to these topics.

**Core Knowledge provides a jumpstart to networking, linux systems, virtualization, lab building, scripting and also information security topics. If you are familiar on these topics you can skip it straight to Ethical Hacking module.**

* [Networking 101](/resources/Samsar4-Ethical-Hacking-Labs/0-Core-Knowledge/0-Networking-101.md)
* [Lab Building / Virtualization](/resources/Samsar4-Ethical-Hacking-Labs/0-Core-Knowledge/1-Lab-Building.md)
* [Introduction to Linux](/resources/Samsar4-Ethical-Hacking-Labs/0-Core-Knowledge/2-Intro-to-Linux.md)
* [Scripting]
* [Information Security 101](/resources/Samsar4-Ethical-Hacking-Labs/0-Core-Knowledge/4-Infosec-101.md)

## ⚔️ Ethical Hacking

1. **Footprinting and Reconnaissance**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/0-What-is-Footprinting.md)
   * [Windows command line](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/1-Windows-CommandLine.md)
   * [Maltego basics](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/2-Maltego-Basics.md)
   * [Recon-ng](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/3-Recon-ng.md)
   * [OSRFramework](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/4-OSRFramework.md)
   * [Metasploit](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/5-Metasploit-Basics.md)
   * [theHarvester](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/6-theHarvester.md)
   * [Another tools for Recon](/resources/Samsar4-Ethical-Hacking-Labs/1-Footprinting-and-Reconnaissance/7-Other-Tools.md)
2. **Scanning Networks**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/0-Scanning-a-Target-Network.md)
   * [hping3](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/1-hping3.md)
   * [Detect OS&#39;s by TTL using Wireshark](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/2-TTL.md)
   * [Mega Ping](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/3-MegaPing.md)
   * [Nmap Basics](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/4-Nmap.md)
   * [Avoid Detection with Nmap](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/5-NmapDecoyIP.md)
   * [More Windows GUI Tools](/resources/Samsar4-Ethical-Hacking-Labs/2-Scanning-Networks/6-WindowsTools.md)
3. **Enumeration**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/3-Enumeration/0-Introduction.md)
   * [Enumeration with Nmap](/resources/Samsar4-Ethical-Hacking-Labs/3-Enumeration/1-Enumerating-with-Nmap.md)
   * [SNMP Enumeration](/resources/Samsar4-Ethical-Hacking-Labs/3-Enumeration/2-SNMP-Enumeration.md)
   * [Enum4Linux](/resources/Samsar4-Ethical-Hacking-Labs/3-Enumeration/3-Enum4linux-Win-and-Samba-Enumeration.md)
   * [More Windows GUI Tools](/resources/Samsar4-Ethical-Hacking-Labs/3-Enumeration/4-Windows-EnumerationTools.md)
4. **Vulnerability Analysis**
   * [Overview and Tools](/resources/Samsar4-Ethical-Hacking-Labs/4-Vulnerability-Analysis/Overview-and-Tools.md)
5. **System Hacking**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/0-Introduction.md)
   * [LLMNR / NBT-NS Spoofing](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/1-LLMNR-NBT-NS.md)
   * [Dumping and Cracking SAM hashes](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/2-SAM-Hashes.md)
   * [Rainbow Tables](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/3-Rainbow-tables.md)
   * [Establishing a VNC Session](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/4-VNC-Session.md)
   * [Escalating Privileges](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/5-Escalating-Privileges.md)
   * [Hacking Windows with MS Word file](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/6-Hacking-Windows-with-Doc-file.md)
   * [Hacking Windows with Msf/Meterpreter - Post Exploitation](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/7-Hacking-Windows-with-Metasploit-PostExploitation.md)
   * [Hiding Data - NTFS streams](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/8-NTFS-Streams.md)
   * [Hiding Data - Steganography](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/9-Steganography.md)
   * [Using Covert_TCP](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/10-Covert_TCP.md)
   * [Auditpol basics](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/11-Auditpol.md)
   * [More Windows GUI Tools](/resources/Samsar4-Ethical-Hacking-Labs/5-System-Hacking/12-WindowsTools.md)
6. **Malware**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/6-Malware/0-Introduction.md)
   * [njRAT](/resources/Samsar4-Ethical-Hacking-Labs/6-Malware/1-Using-njRAT.md)
   * [HTTP RAT Trojan](/resources/Samsar4-Ethical-Hacking-Labs/6-Malware/2-HTTP-Trojan.md)
   * [Obfuscating a Trojan using SwayzCryptor](/resources/Samsar4-Ethical-Hacking-Labs/6-Malware/3-Obfuscating-Trojan-SwayzCryptor.md)
   * [Malware Analysis Lab](/resources/Samsar4-Ethical-Hacking-Labs/6-Malware/4-Malware-Analysis-Lab.md)
   * [Windows Tools](/resources/Samsar4-Ethical-Hacking-Labs/6-Malware/5-Windows-Tools.md)
7. **Sniffing**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/7-Sniffing/0-Introduction.md)
   * [MITM using BetterCAP](/resources/Samsar4-Ethical-Hacking-Labs/7-Sniffing/1-MITM-with-Bettercap.md)
   * [MAC Address Spoofing](/resources/Samsar4-Ethical-Hacking-Labs/7-Sniffing/2-Spoofing-MAC-address.md)
   * [Windows Tools](/resources/Samsar4-Ethical-Hacking-Labs/7-Sniffing/x-Windows-Tools.md)
8. **Social Engineering**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/8-Social-Engineering/0-Introduction.md)
   * [Using SET](/resources/Samsar4-Ethical-Hacking-Labs/8-Social-Engineering/1-Using-SET.md)
   * [Tools](/resources/Samsar4-Ethical-Hacking-Labs/8-Social-Engineering/X-Tools.md)
9. **Denial-of-Service**
   * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/9-Denial-of-Service/0-Introduction.md)
   * [SYN Flooding](/resources/Samsar4-Ethical-Hacking-Labs/9-Denial-of-Service/1-SYN-Flooding.md)
   * [DDoS using HOIC](/resources/Samsar4-Ethical-Hacking-Labs/9-Denial-of-Service/2-DDoS-using-HOIC.md)
   * [Detecting DoS Traffic](/resources/Samsar4-Ethical-Hacking-Labs/9-Denial-of-Service/3-Detecting-DoS-Traffic.md)
10. **Session Hijacking**
    * [Introduction](/resources/Samsar4-Ethical-Hacking-Labs/10-Session-Hijacking/0-Introduction.md)
    * [Using ZAP - Zed Attack Proxy](/resources/Samsar4-Ethical-Hacking-Labs/10-Session-Hijacking/1-Using-ZAP.md)
    * [Intercepting HTTP Traffic](/resources/Samsar4-Ethical-Hacking-Labs/10-Session-Hijacking/2-Intercepting-HTTP-Traffic.md)
11. **Bonus - 🔬 The Forensic Approach**
    * [TCPDump](/resources/Samsar4-Ethical-Hacking-Labs/11-Bonus/TCPDump-Tutorial.md)
    * [Dissecting Packets](/resources/Samsar4-Ethical-Hacking-Labs/11-Bonus/Dissecting-packets.md)
    * [ExifTool](/resources/Samsar4-Ethical-Hacking-Labs/11-Bonus/ExifTool-Tutorial.md)
    * [hdparm &amp; dd command](/resources/Samsar4-Ethical-Hacking-Labs/11-Bonus/Using-hdparm-and-dd-command.md)
    * [Recovering a Deleted Partition](/resources/Samsar4-Ethical-Hacking-Labs/11-Bonus/Recovering-Deleted-Partition.md)
    * [Recovering Deleted Files](/resources/Samsar4-Ethical-Hacking-Labs/11-Bonus/Recovering-Deleted-Files.md)

---

**💭 To Do**:

- ![](https:/img.shields.io/badge/status-in%20progress-orange)
- Add Foundational level modules (~~networking~~, ~~virtualization~~, crypto, linux kernel and scripting).
- Bonus modules to add:
  - ~~Introduction to Infosec terms and methodologies (from [CEH Study Guide](https:/github.com/Samsar4/CEH-v10-Study-Guide))~~
  - More Reconnaissance techniques.
  - Active Directory: Lab build and attack vectors.
  - Web application: Enumeration and exploitation using some OWASP Top 10 vulnerabilities and Bug Bounty techniques.
  - Wireless hacking (WPA)
