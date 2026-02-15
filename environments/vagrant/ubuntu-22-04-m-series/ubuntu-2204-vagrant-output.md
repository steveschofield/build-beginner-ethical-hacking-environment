![][image1]![][image2]![][image3]![][image4]![][image5]![][image6]![][image7]![][image8]![][image9]![][image10]![][image11]![][image12]![][image13]![][image14]![][image15]

# Here is the output from testing.

vagrant up \--provider=vmware\_desktop

Bringing machine 'ubuntu2204' up with 'vmware\_desktop' provider...

**\==\> ubuntu2204: Cloning VMware VM: 'bento/ubuntu-22.04'. This can take some time... \==\> ubuntu2204: Checking if box 'bento/ubuntu-22.04' version '202401.31.0' is up to date... \==\> ubuntu2204: Verifying vmnet devices are healthy...**

**\==\> ubuntu2204: Preparing network adapters...**

**\==\> ubuntu2204: Fixed port collision for 22 \=\> 2222\. Now on port 2200\.**

**\==\> ubuntu2204: Starting the VMware VM...**

**\==\> ubuntu2204: Waiting for the VM to receive an address...**

**\==\> ubuntu2204: Forwarding ports...**

ubuntu2204: \-- 22 \=\> 2200
**\==\> ubuntu2204: Waiting for machine to boot. This may take a few minutes...**

ubuntu2204: SSH address: 127.0.0.1:2200

ubuntu2204: SSH username: vagrant

ubuntu2204: SSH auth method: private key

ubuntu2204:

ubuntu2204: Vagrant insecure key detected. Vagrant will automatically replace

ubuntu2204: this with a newly generated keypair for better security.

ubuntu2204:

ubuntu2204: Inserting generated public key within guest...

ubuntu2204: Removing insecure key from the guest if it's present...

ubuntu2204: Key inserted\! Disconnecting and reconnecting using new SSH key...

**\==\> ubuntu2204: Machine booted and ready\!**

**\==\> ubuntu2204: Setting hostname...**

**\==\> ubuntu2204: Configuring network adapters within the VM...**

**\==\> ubuntu2204: Waiting for HGFS to become available...**

**\==\> ubuntu2204: Enabling and configuring shared folders...**

ubuntu2204: \-- /Users/ss/code/ubuntu: /vagrant

**\==\> ubuntu2204: Running provisioner: shell...**

ubuntu2204: Running: inline script

ubuntu2204: echo "\>\>\>\>\>\>\>\>\>\>\>\>\> Installing prerequisites and Mate UI..."

ubuntu2204: \++ echo '\>\>\>\>\>\>\>\>\>\>\>\>\> Installing prerequisites and Mate UI...'

ubuntu2204: \>\>\>\>\>\>\>\>\>\>\>\>\> Installing prerequisites and Mate UI...
ubuntu2204:

ubuntu2204: apt update \-y

ubuntu2204: \++ apt update \-y

ubuntu2204:

ubuntu2204: WARNING: apt does not have a stable CLI interface. Use with caution in scripts. ubuntu2204:

ubuntu2204: Hit:1 http://ports.ubuntu.com/ubuntu-ports jammy InRelease

ubuntu2204: Get:2 http://ports.ubuntu.com/ubuntu-ports jammy-updates InRelease \[128 kB\] ubuntu2204: Get:3 http://ports.ubuntu.com/ubuntu-ports jammy-backports InRelease \[127 kB\] ubuntu2204: Get:4 http://ports.ubuntu.com/ubuntu-ports jammy-security InRelease \[129 kB\] ubuntu2204: Get:5 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 Packages \[2,064 kB\]

ubuntu2204: Get:6 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main Translation-en \[387 kB\]

ubuntu2204: Get:7 http://ports.ubuntu.com/ubuntu-ports jammy-updates/restricted arm64
Packages \[2,415 kB\]

ubuntu2204: Get:8 http://ports.ubuntu.com/ubuntu-ports jammy-updates/restricted Translation
en \[515 kB\]

ubuntu2204: Get:9 http://ports.ubuntu.com/ubuntu-ports jammy-updates/universe arm64 Packages
\[1,153 kB\]

ubuntu2204: Get:10 http://ports.ubuntu.com/ubuntu-ports jammy-updates/universe Translation-en
\[291 kB\]

ubuntu2204: Get:11 http://ports.ubuntu.com/ubuntu-ports jammy-updates/multiverse arm64
Packages \[25.8 kB\]

ubuntu2204: Get:12 http://ports.ubuntu.com/ubuntu-ports jammy-updates/multiverse Translation
en \[11.5 kB\]

ubuntu2204: Get:13 http://ports.ubuntu.com/ubuntu-ports jammy-backports/main arm64 Packages
\[67.4 kB\]

ubuntu2204: Get:14 http://ports.ubuntu.com/ubuntu-ports jammy-backports/main Translation-en
\[11.1 kB\]

ubuntu2204: Get:15 http://ports.ubuntu.com/ubuntu-ports jammy-backports/universe arm64
Packages \[28.3 kB\]

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 1/

ubuntu2204: Get:16 http://ports.ubuntu.com/ubuntu-ports jammy-backports/universe Translation
en \[16.6 kB\]

ubuntu2204: Get:17 http://ports.ubuntu.com/ubuntu-ports jammy-security/main arm64 Packages
\[1,830 kB\]

ubuntu2204: Get:18 http://ports.ubuntu.com/ubuntu-ports jammy-security/main Translation-en
\[325 kB\]

ubuntu2204: Get:19 http://ports.ubuntu.com/ubuntu-ports jammy-security/restricted arm64
Packages \[2,315 kB\]

ubuntu2204: Get:20 http://ports.ubuntu.com/ubuntu-ports jammy-security/restricted
Translation-en \[497 kB\]

ubuntu2204: Get:21 http://ports.ubuntu.com/ubuntu-ports jammy-security/universe arm64
Packages \[931 kB\]

ubuntu2204: Get:22 http://ports.ubuntu.com/ubuntu-ports jammy-security/universe Translation
en \[205 kB\]

ubuntu2204: Get:23 http://ports.ubuntu.com/ubuntu-ports jammy-security/multiverse arm64
Packages \[20.3 kB\]

ubuntu2204: Get:24 http://ports.ubuntu.com/ubuntu-ports jammy-security/multiverse
Translation-en \[8,260 B~~\]~~

ubuntu2204: Fetched 13.5 MB in 4s (3,695 kB/s)

ubuntu2204: Reading package lists...

ubuntu2204: Building dependency tree...

ubuntu2204: Reading state information...

ubuntu2204: 154 packages can be upgraded. Run 'apt list \--upgradable' to see them.

ubuntu2204: apt upgrade \-y

ubuntu2204: \++ apt upgrade \-y

ubuntu2204:

ubuntu2204: WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

ubuntu2204:

ubuntu2204: Reading package lists...

ubuntu2204: Building dependency tree...

ubuntu2204: Reading state information...

ubuntu2204: Calculating upgrade...

ubuntu2204: The following NEW packages will be installed:
ubuntu2204: linux-image-5.15.0-131-generic linux-modules-5.15.0-131-generic

ubuntu2204: linux-modules-extra-5.15.0-131-generic python3-packaging ubuntu-pro-client

ubuntu2204: The following packages will be upgraded:

ubuntu2204: apparmor apport apt apt-utils base-files bash bind9-dnsutils bind9-host

ubuntu2204: bind9-libs binutils binutils-aarch64-linux-gnu binutils-common bsdextrautils

ubuntu2204: bsdutils busybox-initramfs busybox-static ca-certificates cloud-init

ubuntu2204: coreutils cpio curl distro-info-data dmidecode dpkg e2fsprogs eject ethtool

ubuntu2204: fdisk firmware-sof-signed gir1.2-packagekitglib-1.0 git git-man iptables

ubuntu2204: klibc-utils landscape-common less libapparmor1 libapt-pkg6.0 libarchive13

ubuntu2204: libbinutils libblkid1 libc-bin libc6 libcom-err2 libctf-nobfd0 libctf0

ubuntu2204: libcurl3-gnutls libcurl4 libexpat1 libext2fs2 libfdisk1 libglib2.0-0

ubuntu2204: libglib2.0-bin libglib2.0-data libgnutls30 libgpgme11 libgssapi-krb5-2

ubuntu2204: libgstreamer1.0-0 libip4tc2 libip6tc2 libk5crypto3 libklibc libkrb5-3

ubuntu2204: libkrb5support0 libldap-2.5-0 libldap-common libmbim-glib4 libmbim-proxy

ubuntu2204: libmm-glib0 libmodule-scandeps-perl libmount1 libnetplan0 libnghttp2-14

ubuntu2204: libnspr4 libnss3 libpackagekit-glib2-18 libpam-modules libpam-modules-bin

ubuntu2204: libpam-runtime libpam0g libpcap0.8 libpython3-stdlib libpython3.10

ubuntu2204: libpython3.10-minimal libpython3.10-stdlib libseccomp2 libsmartcols1 libss2

ubuntu2204: libssl3 libtss2-esys-3.0.2-0 libtss2-mu0 libtss2-sys1 libtss2-tcti-cmd0

ubuntu2204: libtss2-tcti-device0 libtss2-tcti-mssim0 libtss2-tcti-swtpm0 libuuid1 libuv1

ubuntu2204: libxml2 libxtables12 linux-firmware linux-image-generic locales login
ubuntu2204: logsave modemmanager mount nano needrestart netplan.io open-vm-tools

ubuntu2204: openssh-client openssh-server openssh-sftp-server openssl packagekit

ubuntu2204: packagekit-tools passwd python-apt-common python3 python3-apport python3-apt

ubuntu2204: python3-configobj python3-cryptography python3-idna python3-jinja2

ubuntu2204: python3-minimal python3-pkg-resources python3-problem-report

ubuntu2204: python3-setuptools python3-twisted python3-urllib3 python3-zipp python3.10

ubuntu2204: python3.10-minimal rsync shim-signed snapd sosreport tcpdump tzdata

ubuntu2204: ubuntu-advantage-tools ubuntu-minimal ubuntu-pro-client-l10n util-linux

ubuntu2204: uuid-runtime vim vim-common vim-runtime vim-tiny wget wireless-regdb

ubuntu2204: xfsprogs xxd

ubuntu2204: 154 upgraded, 5 newly installed, 0 to remove and 0 not upgraded.

ubuntu2204: 97 standard LTS security updates

ubuntu2204: Need to get 514 MB of archives.

ubuntu2204: After this operation, 599 MB of additional disk space will be used.

ubuntu2204: Get:1 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libc6 arm64
2.35-0ubuntu3.9 \[2,705 ~~kB\]~~

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 2/

ubuntu2204: Get:2 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 base-files
arm64 12ubuntu4.7 \[61.~~8 kB\]~~

ubuntu2204: Get:3 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 bash arm64
5.1-6ubuntu1.1 \[762 kB~~\]~~

ubuntu2204: Get:4 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 bsdutils
arm64 1:2.37.2-4ubuntu~~3.4 \[84.5 kB\]~~

ubuntu2204: Get:5 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 coreutils
arm64 8.32-4.1ubuntu1.~~2 \[1,398 kB\]~~

ubuntu2204: Get:6 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libapt-pkg6.0
arm64 2.4.13 \[872 kB\]

ubuntu2204: Get:7 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 dpkg arm64
1.21.1ubuntu2.3 \[1,219 ~~kB\]~~

ubuntu2204: Get:8 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 login arm64
1:4.8.1-2ubuntu2.2 \[18~~6 kB\]~~

ubuntu2204: Get:9 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 util-linux
arm64 2.37.2-4ubuntu3.~~4 \[1,059 kB\]~~

ubuntu2204: Get:10 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libc-bin
arm64 2.35-0ubuntu3.9 \[~~600 kB\]~~

ubuntu2204: Get:11 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 apt arm64
2.4.13 \[1,329 kB\]

ubuntu2204: Get:12 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 apt-utils
arm64 2.4.13 \[205 kB\]

ubuntu2204: Get:13 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libgnutls30
arm64 3.7.3-4ubuntu1.5 ~~\[922 kB\]~~

ubuntu2204: Get:14 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libseccomp2
arm64 2.5.3-2ubuntu3\~22~~.04.1 \[47.9 kB\]~~

ubuntu2204: Get:15 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libpam0g
arm64 1.4.0-11ubuntu2.5 ~~\[59.6 kB\]~~

ubuntu2204: Get:16 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libpam
modules-bin arm64 1.4.0~~\-11ubuntu2.5 \[38.4 kB\]~~

ubuntu2204: Get:17 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libpam
modules arm64 1.4.0-11u~~buntu2.5 \[277 kB\]~~

ubuntu2204: Get:18 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 logsave
arm64 1.46.5-2ubuntu1.2 ~~\[9,918 B\]~~

ubuntu2204: Get:19 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libext2fs2
arm64 1.46.5-2ubuntu1.2 ~~\[211 kB\]~~

ubuntu2204: Get:20 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 e2fsprogs
arm64 1.46.5-2ubuntu1.2 ~~\[587 kB\]~~

ubuntu2204: Get:21 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 mount arm64
2.37.2-4ubuntu3.4 \[113 ~~kB\]~~

ubuntu2204: Get:22 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
minimal arm64 3.10.6-1\~~~22.04.1 \[24.3 kB\]~~

ubuntu2204: Get:23 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3
arm64 3.10.6-1\~22.04.1 ~~\[22.8 kB\]~~

ubuntu2204: Get:24 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libexpat1
arm64 2.4.7-1ubuntu0.5 ~~\[77.5 kB\]~~

ubuntu2204: Get:25 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libpython3.10 arm64 3.1~~0.12-1\~22.04.8 \[1,887 kB\]~~

ubuntu2204: Get:26 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libuuid1
arm64 2.37.2-4ubuntu3.4 ~~\[23.8 kB\]~~

ubuntu2204: Get:27 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3.10
arm64 3.10.12-1\~22.04.8 ~~\[508 kB\]~~

ubuntu2204: Get:28 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libpython3.10-stdlib ar~~m64 3.10.12-1\~22.04.8 \[1,846 kB\]~~
ubuntu2204: Get:29 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libssl3
arm64 3.0.2-0ubuntu1.18 ~~\[1,769 kB\]~~

ubuntu2204: Get:30 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3.10-
minimal arm64 3.10.12-1~~\~22.04.8 \[2,263 kB\]~~

ubuntu2204: Get:31 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libpython3.10-minimal a~~rm64 3.10.12-1\~22.04.8 \[812 kB\]~~

ubuntu2204: Get:32 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libpython3-
stdlib arm64 3.10.6-1\~2~~2.04.1 \[6,812 B\]~~

ubuntu2204: Get:33 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 rsync arm64
3.2.7-0ubuntu0.22.04.4 ~~\[430 kB\]~~

ubuntu2204: Get:34 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libsmartcols1 arm64 2.3~~7.2-4ubuntu3.4 \[49.5 kB\]~~

ubuntu2204: Get:35 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 uuid-runtime
arm64 2.37.2-4ubuntu3.4 ~~\[31.8 kB\]~~

ubuntu2204: Get:36 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libk5crypto3
arm64 1.19.2-2ubuntu0.5 ~~\[91.8 kB\]~~

ubuntu2204: Get:37 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libkrb5support0 arm64 1~~.19.2-2ubuntu0.5 \[32.4 kB\]~~

ubuntu2204: Get:38 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libkrb5-3
arm64 1.19.2-2ubuntu0.5 ~~\[357 kB\]~~

ubuntu2204: Get:39 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libgssapi
krb5-2 arm64 1.19.2-2ub~~untu0.5 \[142 kB\]~~

ubuntu2204: Get:40 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libcom-err2
arm64 1.46.5-2ubuntu1.2 ~~\[9,108 B\]~~

ubuntu2204: Get:41 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libldap-2.5-
0 arm64 2.5.18+dfsg-0ub~~untu0.22.04.2 \[180 kB\]~~

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 3/

ubuntu2204: Get:42 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libnghttp2-
14 arm64 1.43.0-1ubuntu~~0.2 \[76.0 kB\]~~

ubuntu2204: Get:43 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libcurl3-
gnutls arm64 7.81.0-1ub~~untu1.20 \[279 kB\]~~

ubuntu2204: Get:44 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 git-man all
1:2.34.1-1ubuntu1.12 \[9~~55 kB\]~~

ubuntu2204: Get:45 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 git arm64
1:2.34.1-1ubuntu1.12 \[3~~,224 kB\]~~

ubuntu2204: Get:46 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 passwd arm64
1:4.8.1-2ubuntu2.2 \[763 ~~kB\]~~

ubuntu2204: Get:47 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 openssh
sftp-server arm64 1:8.9~~p1-3ubuntu0.10 \[36.8 kB\]~~

ubuntu2204: Get:48 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 openssh
server arm64 1:8.9p1-3u~~buntu0.10 \[413 kB\]~~

ubuntu2204: Get:49 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 openssh
client arm64 1:8.9p1-3u~~buntu0.10 \[863 kB\]~~

ubuntu2204: Get:50 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libpam
runtime all 1.4.0-11ubu~~ntu2.5 \[40.2 kB\]~~

ubuntu2204: Get:51 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libglib2.0-
data all 2.72.4-0ubuntu~~2.4 \[4,582 B\]~~

ubuntu2204: Get:52 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libglib2.0-
bin arm64 2.72.4-0ubunt~~u2.4 \[79.6 kB\]~~

ubuntu2204: Get:53 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libblkid1
arm64 2.37.2-4ubuntu3.4 ~~\[103 kB\]~~

ubuntu2204: Get:54 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libmount1
arm64 2.37.2-4ubuntu3.4 ~~\[120 kB\]~~

ubuntu2204: Get:55 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libglib2.0-0
arm64 2.72.4-0ubuntu2.4 ~~\[1,435 kB\]~~

ubuntu2204: Get:56 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libxml2
arm64 2.9.13+dfsg-1ubun~~tu0.5 \[728 kB\]~~

ubuntu2204: Get:57 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 open-vm
tools arm64 2:12.3.5-3\~~~ubuntu0.22.04.1 \[735 kB\]~~

ubuntu2204: Get:58 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libss2 arm64
1.46.5-2ubuntu1.2 \[11.9 ~~kB\]~~

ubuntu2204: Get:59 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 openssl
arm64 3.0.2-0ubuntu1.18 ~~\[1,163 kB\]~~

ubuntu2204: Get:60 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 ca
certificates all 202402~~03\~22.04.1 \[162 kB\]~~

ubuntu2204: Get:61 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 distro-info
data all 0.52ubuntu0.8 ~~\[5,302 B\]~~

ubuntu2204: Get:62 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 eject arm64
2.37.2-4ubuntu3.4 \[26.7 ~~kB\]~~

ubuntu2204: Get:63 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 less arm64
590-1ubuntu0.22.04.3 \[1~~41 kB\]~~

ubuntu2204: Get:64 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libapparmor1
arm64 3.0.4-2ubuntu2.4 ~~\[39.4 kB\]~~

ubuntu2204: Get:65 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 iptables
arm64 1.8.7-1ubuntu5.2 ~~\[451 kB\]~~

ubuntu2204: Get:66 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libxtables12
arm64 1.8.7-1ubuntu5.2 ~~\[30.9 kB\]~~

ubuntu2204: Get:67 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libip6tc2
arm64 1.8.7-1ubuntu5.2 ~~\[20.2 kB\]~~

ubuntu2204: Get:68 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libip4tc2
arm64 1.8.7-1ubuntu5.2 ~~\[19.9 kB\]~~
ubuntu2204: Get:69 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 netplan.io
arm64 0.106.1-7ubuntu0.~~22.04.4 \[106 kB\]~~

ubuntu2204: Get:70 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libnetplan0
arm64 0.106.1-7ubuntu0.~~22.04.4 \[104 kB\]~~

ubuntu2204: Get:71 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 locales all
2.35-0ubuntu3.9 \[4,248 ~~kB\]~~

ubuntu2204: Get:72 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python-apt
common all 2.4.0ubuntu4 ~~\[14.6 kB\]~~

ubuntu2204: Get:73 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-apt
arm64 2.4.0ubuntu4 \[161 ~~kB\]~~

ubuntu2204: Get:74 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
setuptools all 59.6.0-1~~.2ubuntu0.22.04.2 \[340 kB\]~~

ubuntu2204: Get:75 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-pkg
resources all 59.6.0-1.~~2ubuntu0.22.04.2 \[133 kB\]~~

ubuntu2204: Get:76 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 tzdata all
2024b-0ubuntu0.22.04.1 ~~\[347 kB\]~~

ubuntu2204: Get:77 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 ubuntu
advantage-tools all 34\~~~22.04 \[10.9 kB\]~~

ubuntu2204: Get:78 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 ubuntu-pro
client arm64 34\~22.04 \[~~221 kB\]~~

ubuntu2204: Get:79 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 xxd arm64
2:8.2.3995-1ubuntu2.23 ~~\[51.2 kB\]~~

ubuntu2204: Get:80 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 vim arm64
2:8.2.3995-1ubuntu2.23 ~~\[1,664 kB\]~~

ubuntu2204: Get:81 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 vim-tiny
arm64 2:8.2.3995-1ubunt~~u2.23 \[676 kB\]~~

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 4/

ubuntu2204: Get:82 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 vim-runtime
all 2:8.2.3995-1ubuntu2~~.23 \[6,833 kB\]~~

ubuntu2204: Get:83 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 vim-common
all 2:8.2.3995-1ubuntu2~~.23 \[81.5 kB\]~~

ubuntu2204: Get:84 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 ubuntu
minimal arm64 1.481.4 \[~~2,928 B\]~~

ubuntu2204: Get:85 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 ubuntu-pro
client-l10n arm64 34\~22~~.04 \[19.1 kB\]~~

ubuntu2204: Get:86 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 apparmor
arm64 3.0.4-2ubuntu2.4 ~~\[576 kB\]~~

ubuntu2204: Get:87 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libuv1 arm64
1.43.0-1ubuntu0.1 \[90.1 ~~kB\]~~

ubuntu2204: Get:88 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 bind9-
dnsutils arm64 1:9.18.3~~0-0ubuntu0.22.04.2 \[159 kB\]~~

ubuntu2204: Get:89 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 bind9-host
arm64 1:9.18.30-0ubuntu~~0.22.04.2 \[52.2 kB\]~~

ubuntu2204: Get:90 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 bind9-libs
arm64 1:9.18.30-0ubuntu~~0.22.04.2 \[1,215 kB\]~~

ubuntu2204: Get:91 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
bsdextrautils arm64 2.3~~7.2-4ubuntu3.4 \[70.3 kB\]~~

ubuntu2204: Get:92 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 busybox
static arm64 1:1.30.1-7~~ubuntu3.1 \[920 kB\]~~

ubuntu2204: Get:93 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 cpio arm64
2.13+dfsg-7ubuntu0.1 \[8~~1.9 kB\]~~

ubuntu2204: Get:94 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 dmidecode
arm64 3.3-3ubuntu0.2 \[5~~6.4 kB\]~~

ubuntu2204: Get:95 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libpcap0.8
arm64 1.10.1-4ubuntu1.2~~2.04.1 \[141 kB\]~~

ubuntu2204: Get:96 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 nano arm64
6.2-1ubuntu0.1 \[277 kB\]

ubuntu2204: Get:97 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 tcpdump
arm64 4.99.1-3ubuntu0.2 ~~\[497 kB\]~~

ubuntu2204: Get:98 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 wget arm64
1.21.2-2ubuntu1.1 \[334 ~~kB\]~~

ubuntu2204: Get:99 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
problem-report all 2.20~~.11-0ubuntu82.6 \[11.1 kB\]~~

ubuntu2204: Get:100 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
apport all 2.20.11-0ubun~~tu82.6 \[89.0 kB\]~~

ubuntu2204: Get:101 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 apport all
2.20.11-0ubuntu82.6 \[134 ~~kB\]~~

ubuntu2204: Get:102 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libctf0
arm64 2.38-4ubuntu2.6 \[1~~03 kB\]~~

ubuntu2204: Get:103 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libctf
nobfd0 arm64 2.38-4ubunt~~u2.6 \[108 kB\]~~

ubuntu2204: Get:104 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 binutils
aarch64-linux-gnu arm64 ~~2.38-4ubuntu2.6 \[3,229 kB\]~~

ubuntu2204: Get:105 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libbinutils
arm64 2.38-4ubuntu2.6 \[8~~25 kB\]~~

ubuntu2204: Get:106 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 binutils
arm64 2.38-4ubuntu2.6 \[3~~,164 B\]~~

ubuntu2204: Get:107 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 binutils
common arm64 2.38-4ubunt~~u2.6 \[222 kB\]~~

ubuntu2204: Get:108 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 busybox
initramfs arm64 1:1.30.1~~\-7ubuntu3.1 \[176 kB\]~~
ubuntu2204: Get:109 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 curl arm64
7.81.0-1ubuntu1.20 \[190 ~~kB\]~~

ubuntu2204: Get:110 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libcurl4
arm64 7.81.0-1ubuntu1.20 ~~\[284 kB\]~~

ubuntu2204: Get:111 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 ethtool
arm64 1:5.16-1ubuntu0.1 ~~\[208 kB\]~~

ubuntu2204: Get:112 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libfdisk1
arm64 2.37.2-4ubuntu3.4 ~~\[136 kB\]~~

ubuntu2204: Get:113 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 fdisk arm64
2.37.2-4ubuntu3.4 \[120 k~~B\]~~

ubuntu2204: Get:114 http://ports.ubuntu.com/ubuntu-ports jammy-updates/restricted arm64
firmware-sof-signed all ~~2.0-1ubuntu4.7 \[1,270 kB\]~~

ubuntu2204: Get:115 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libpackagekit-glib2-18 a~~rm64 1.2.5-2ubuntu3 \[116 kB\]~~

ubuntu2204: Get:116 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 gir1.2-
packagekitglib-1.0 arm64 ~~1.2.5-2ubuntu3 \[25.3 kB\]~~

ubuntu2204: Get:117 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 klibc-utils
arm64 2.0.10-4ubuntu0.1 ~~\[111 kB\]~~

ubuntu2204: Get:118 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libklibc
arm64 2.0.10-4ubuntu0.1 ~~\[50.9 kB\]~~

ubuntu2204: Get:119 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
cryptography arm64 3.4.8~~\-1ubuntu2.2 \[223 kB\]~~

ubuntu2204: Get:120 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
idna all 3.3-1ubuntu0.1 ~~\[52.1 kB\]~~

ubuntu2204: Get:121 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
twisted all 22.1.0-2ubun~~tu2.6 \[2,007 kB\]~~

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 5/

ubuntu2204: Get:122 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
configobj all 5.0.6-5ubu~~ntu0.1 \[34.9 kB\]~~

ubuntu2204: Get:123 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 landscape
common arm64 23.02-0ubun~~tu1\~22.04.3 \[88.7 kB\]~~

ubuntu2204: Get:124 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libarchive13 arm64 3.6.0~~\-1ubuntu1.3 \[367 kB\]~~

ubuntu2204: Get:125 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libgpgme11
arm64 1.16.0-1.2ubuntu4.~~2 \[130 kB\]~~

ubuntu2204: Get:126 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
libgstreamer1.0-0 arm64 ~~1.20.3-0ubuntu1.1 \[930 kB\]~~

ubuntu2204: Get:127 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libldap
common all 2.5.18+dfsg-0~~ubuntu0.22.04.2 \[15.9 kB\]~~

ubuntu2204: Get:128 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libmbim
proxy arm64 1.28.0-1\~ubu~~ntu20.04.2 \[5,906 B\]~~

ubuntu2204: Get:129 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libmbim
glib4 arm64 1.28.0-1\~ubu~~ntu20.04.2 \[187 kB\]~~

ubuntu2204: Get:130 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libmm-glib0
arm64 1.20.0-1\~ubuntu22.~~04.4 \[257 kB\]~~

ubuntu2204: Get:131 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libmodule
scandeps-perl all 1.31-1~~ubuntu0.1 \[30.7 kB\]~~

ubuntu2204: Get:132 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libnspr4
arm64 2:4.35-0ubuntu0.22~~.04.1 \[116 kB\]~~

ubuntu2204: Get:133 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libnss3
arm64 2:3.98-0ubuntu0.22~~.04.2 \[1,239 kB\]~~

ubuntu2204: Get:134 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-mu0
arm64 3.2.0-1ubuntu1.1 \[~~58.0 kB\]~~

ubuntu2204: Get:135 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-
tcti-cmd0 arm64 3.2.0-1u~~buntu1.1 \[16.2 kB\]~~

ubuntu2204: Get:136 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-
tcti-device0 arm64 3.2.0~~\-1ubuntu1.1 \[15.1 kB\]~~

ubuntu2204: Get:137 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-
tcti-mssim0 arm64 3.2.0-~~1ubuntu1.1 \[15.3 kB\]~~

ubuntu2204: Get:138 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-
tcti-swtpm0 arm64 3.2.0-~~1ubuntu1.1 \[15.2 kB\]~~

ubuntu2204: Get:139 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-
sys1 arm64 3.2.0-1ubuntu~~1.1 \[39.2 kB\]~~

ubuntu2204: Get:140 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 libtss2-
esys-3.0.2-0 arm64 3.2.0~~\-1ubuntu1.1 \[133 kB\]~~

ubuntu2204: Get:141 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 linux
firmware all 20220329.gi~~t681281e4-0ubuntu3.36 \[312 MB\]~~

ubuntu2204: Get:142 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 linux
modules-5.15.0-131-generic ~~arm64 5.15.0-131.141 \[23.4 MB\]~~

ubuntu2204: Get:143 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 linux
image-5.15.0-131-generic ~~arm64 5.15.0-131.141 \[15.0 MB\]~~

ubuntu2204: Get:144 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 wireless
regdb all 2024.07.04-0ub~~untu1\~22.04.1 \[10.0 kB\]~~

ubuntu2204: Get:145 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 linux
modules-extra-5.15.0-131-generic ~~arm64 5.15.0-131.141 \[66.1~~ MB\]

ubuntu2204: Get:146 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 linux
image-generic arm64 5.15~~.0.131.129 \[2,472 B\]~~

ubuntu2204: Get:147 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64
modemmanager arm64 1.20.~~0-1\~ubuntu22.04.4 \[1,046 kB\]~~

ubuntu2204: Get:148 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 needrestart
all 3.5-5ubuntu2.4 \[45.2 ~~kB\]~~
ubuntu2204: Get:149 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 packagekit
tools arm64 1.2.5-2ubunt~~u3 \[27.7 kB\]~~

ubuntu2204: Get:150 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 packagekit
arm64 1.2.5-2ubuntu3 \[42~~5 kB\]~~

ubuntu2204: Get:151 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
jinja2 all 3.0.3-1ubuntu~~0.3 \[108 kB\]~~

ubuntu2204: Get:152 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-packaging
all 21.3-1 \[30.7 kB\]

ubuntu2204: Get:153 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
urllib3 all 1.26.5-1\~exp~~1ubuntu0.2 \[98.3 kB\]~~

ubuntu2204: Get:154 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3-
zipp all 1.0.0-3ubuntu0.~~1 \[6,288 B\]~~

ubuntu2204: Get:155 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 shim-signed
arm64 1.51.4+15.8-0ubunt~~u1 \[559 kB\]~~

ubuntu2204: Get:156 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 snapd arm64
2.66.1+22.04 \[24.9 MB\]

ubuntu2204: Get:157 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 sosreport
arm64 4.7.2-0ubuntu1\~22.~~04.2 \[352 kB\]~~

ubuntu2204: Get:158 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 xfsprogs
arm64 5.13.0-1ubuntu2.1 ~~\[863 kB\]~~

ubuntu2204: Get:159 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 cloud-init
all 24.4-0ubuntu1\~22.04.~~1 \[565 kB\]~~

ubuntu2204: dpkg-preconfigure: unable to re-open stdin: No such file or directory

ubuntu2204: Fetched 514 MB in 43s (11.8 MB/s)

(Reading database ... 45951 files and directories currently installed.)

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 6/
ubuntu2204: Preparing to unpack .../libc6\_2.35-0ubuntu3.9\_arm64.deb ...

ubuntu2204: Unpacking libc6:arm64 (2.35-0ubuntu3.9) over (2.35-0ubuntu3.6) ...

ubuntu2204: Setting up libc6:arm64 (2.35-0ubuntu3.9) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../base-files\_12ubuntu4.7\_arm64.deb ...

ubuntu2204: Unpacking base-files (12ubuntu4.7) over (12ubuntu4.5) ...

ubuntu2204: Setting up base-files (12ubuntu4.7) ...

ubuntu2204: Installing new version of config file /etc/issue ...

ubuntu2204: Installing new version of config file /etc/issue.net ...

ubuntu2204: Installing new version of config file /etc/lsb-release ...

ubuntu2204: motd-news.service is a disabled or a static unit not running, not starting it. (Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../bash\_5.1-6ubuntu1.1\_arm64.deb ...

ubuntu2204: Unpacking bash (5.1-6ubuntu1.1) over (5.1-6ubuntu1) ...

ubuntu2204: Setting up bash (5.1-6ubuntu1.1) ...

ubuntu2204: update-alternatives: using /usr/share/man/man7/bash-builtins.7.gz to provide /usr/share/man/man7/builtins.7.gz (builtins.7.gz) in auto mode

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../bsdutils\_1%3a2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking bsdutils (1:2.37.2-4ubuntu3.4) over (1:2.37.2-4ubuntu3) ... ubuntu2204: Setting up bsdutils (1:2.37.2-4ubuntu3.4) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../coreutils\_8.32-4.1ubuntu1.2\_arm64.deb ...

ubuntu2204: Unpacking coreutils (8.32-4.1ubuntu1.2) over (8.32-4.1ubuntu1) ...

ubuntu2204: Setting up coreutils (8.32-4.1ubuntu1.2) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libapt-pkg6.0\_2.4.13\_arm64.deb ...

ubuntu2204: Unpacking libapt-pkg6.0:arm64 (2.4.13) over (2.4.11) ...

ubuntu2204: Setting up libapt-pkg6.0:arm64 (2.4.13) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../dpkg\_1.21.1ubuntu2.3\_arm64.deb ...

ubuntu2204: Unpacking dpkg (1.21.1ubuntu2.3) over (1.21.1ubuntu2.2) ...

ubuntu2204: Setting up dpkg (1.21.1ubuntu2.3) ...
ubuntu2204: dpkg-db-backup.service is a disabled or a static unit not running, not starting it.

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../login\_1%3a4.8.1-2ubuntu2.2\_arm64.deb ... ubuntu2204: Unpacking login (1:4.8.1-2ubuntu2.2) over (1:4.8.1-2ubuntu2.1) ... ubuntu2204: Setting up login (1:4.8.1-2ubuntu2.2) ...

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../util-linux\_2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking util-linux (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Setting up util-linux (2.37.2-4ubuntu3.4) ...

ubuntu2204: fstrim.service is a disabled or a static unit not running, not starting it. (Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../libc-bin\_2.35-0ubuntu3.9\_arm64.deb ... ubuntu2204: Unpacking libc-bin (2.35-0ubuntu3.9) over (2.35-0ubuntu3.6) ... ubuntu2204: Setting up libc-bin (2.35-0ubuntu3.9) ...

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../archives/apt\_2.4.13\_arm64.deb ... ubuntu2204: Unpacking apt (2.4.13) over (2.4.11) ...

ubuntu2204: Setting up apt (2.4.13) ...

ubuntu2204: apt-daily-upgrade.timer is a disabled or a static unit not running, not starting it.

ubuntu2204: apt-daily.timer is a disabled or a static unit not running, not starting it.

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../apt-utils\_2.4.13\_arm64.deb ...

ubuntu2204: Unpacking apt-utils (2.4.13) over (2.4.11) ...

ubuntu2204: Preparing to unpack .../libgnutls30\_3.7.3-4ubuntu1.5\_arm64.deb ...

ubuntu2204: Unpacking libgnutls30:arm64 (3.7.3-4ubuntu1.5) over (3.7.3-4ubuntu1.4) ...

ubuntu2204: Setting up libgnutls30:arm64 (3.7.3-4ubuntu1.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libseccomp2\_2.5.3-2ubuntu3\~22.04.1\_arm64.deb ...

ubuntu2204: Unpacking libseccomp2:arm64 (2.5.3-2ubuntu3\~22.04.1) over (2.5.3-2ubuntu2) ...

ubuntu2204: Setting up libseccomp2:arm64 (2.5.3-2ubuntu3\~22.04.1) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libpam0g\_1.4.0-11ubuntu2.5\_arm64.deb ...

ubuntu2204: Unpacking libpam0g:arm64 (1.4.0-11ubuntu2.5) over (1.4.0-11ubuntu2.4) ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 7/
ubuntu2204: Setting up libpam0g:arm64 (1.4.0-11ubuntu2.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libpam-modules-bin\_1.4.0-11ubuntu2.5\_arm64.deb ... ubuntu2204: Unpacking libpam-modules-bin (1.4.0-11ubuntu2.5) over (1.4.0-11ubuntu2.4) ... ubuntu2204: Setting up libpam-modules-bin (1.4.0-11ubuntu2.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libpam-modules\_1.4.0-11ubuntu2.5\_arm64.deb ... ubuntu2204: Unpacking libpam-modules:arm64 (1.4.0-11ubuntu2.5) over (1.4.0-11ubuntu2.4) ... ubuntu2204: Setting up libpam-modules:arm64 (1.4.0-11ubuntu2.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../logsave\_1.46.5-2ubuntu1.2\_arm64.deb ...
ubuntu2204: Unpacking logsave (1.46.5-2ubuntu1.2) over (1.46.5-2ubuntu1.1) ...

ubuntu2204: Preparing to unpack .../libext2fs2\_1.46.5-2ubuntu1.2\_arm64.deb ...

ubuntu2204: Unpacking libext2fs2:arm64 (1.46.5-2ubuntu1.2) over (1.46.5-2ubuntu1.1) ... ubuntu2204: Setting up libext2fs2:arm64 (1.46.5-2ubuntu1.2) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../e2fsprogs\_1.46.5-2ubuntu1.2\_arm64.deb ...

ubuntu2204: Unpacking e2fsprogs (1.46.5-2ubuntu1.2) over (1.46.5-2ubuntu1.1) ... ubuntu2204: Preparing to unpack .../mount\_2.37.2-4ubuntu3.4\_arm64.deb ...

ubuntu2204: Unpacking mount (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ...

ubuntu2204: Preparing to unpack .../python3-minimal\_3.10.6-1\~22.04.1\_arm64.deb ... ubuntu2204: Unpacking python3-minimal (3.10.6-1\~22.04.1) over (3.10.6-1\~22.04) ... ubuntu2204: Setting up python3-minimal (3.10.6-1\~22.04.1) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../python3\_3.10.6-1\~22.04.1\_arm64.deb ...

ubuntu2204: running python pre-rtupdate hooks for python3.10...

ubuntu2204: Unpacking python3 (3.10.6-1\~22.04.1) over (3.10.6-1\~22.04) ...

ubuntu2204: Preparing to unpack .../libexpat1\_2.4.7-1ubuntu0.5\_arm64.deb ...

ubuntu2204: Unpacking libexpat1:arm64 (2.4.7-1ubuntu0.5) over (2.4.7-1ubuntu0.2) ... ubuntu2204: Preparing to unpack .../libpython3.10\_3.10.12-1\~22.04.8\_arm64.deb ... ubuntu2204: Unpacking libpython3.10:arm64 (3.10.12-1\~22.04.8) over (3.10.12-1\~22.04.3) ... ubuntu2204: Preparing to unpack .../libuuid1\_2.37.2-4ubuntu3.4\_arm64.deb ...

ubuntu2204: Unpacking libuuid1:arm64 (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Setting up libuuid1:arm64 (2.37.2-4ubuntu3.4) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../python3.10\_3.10.12-1\~22.04.8\_arm64.deb ...

ubuntu2204: Unpacking python3.10 (3.10.12-1\~22.04.8) over (3.10.12-1\~22.04.3) ... ubuntu2204: Preparing to unpack .../libpython3.10-stdlib\_3.10.12-1\~22.04.8\_arm64.deb ...

ubuntu2204: Unpacking libpython3.10-stdlib:arm64 (3.10.12-1\~22.04.8) over (3.10.12-1\~22.04.3) ...

ubuntu2204: Preparing to unpack .../libssl3\_3.0.2-0ubuntu1.18\_arm64.deb ... ubuntu2204: Unpacking libssl3:arm64 (3.0.2-0ubuntu1.18) over (3.0.2-0ubuntu1.13) ... ubuntu2204: Setting up libssl3:arm64 (3.0.2-0ubuntu1.18) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../python3.10-minimal\_3.10.12-1\~22.04.8\_arm64.deb ...

ubuntu2204: Unpacking python3.10-minimal (3.10.12-1\~22.04.8) over (3.10.12-1\~22.04.3) ...

ubuntu2204: Preparing to unpack .../libpython3.10-minimal\_3.10.12-1\~22.04.8\_arm64.deb ...

ubuntu2204: Unpacking libpython3.10-minimal:arm64 (3.10.12-1\~22.04.8) over (3.10.12-
1\~22.04.3) ...

ubuntu2204: Preparing to unpack .../libpython3-stdlib\_3.10.6-1\~22.04.1\_arm64.deb ...

ubuntu2204: Unpacking libpython3-stdlib:arm64 (3.10.6-1\~22.04.1) over (3.10.6-1\~22.04) ...

ubuntu2204: Preparing to unpack .../rsync\_3.2.7-0ubuntu0.22.04.4\_arm64.deb ...

ubuntu2204: Unpacking rsync (3.2.7-0ubuntu0.22.04.4) over (3.2.7-0ubuntu0.22.04.2) ...

ubuntu2204: Preparing to unpack .../libsmartcols1\_2.37.2-4ubuntu3.4\_arm64.deb ...
ubuntu2204: Unpacking libsmartcols1:arm64 (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ...

ubuntu2204: Setting up libsmartcols1:arm64 (2.37.2-4ubuntu3.4) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../uuid-runtime\_2.37.2-4ubuntu3.4\_arm64.deb ...

ubuntu2204: Unpacking uuid-runtime (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ...

ubuntu2204: Preparing to unpack .../libk5crypto3\_1.19.2-2ubuntu0.5\_arm64.deb ...

ubuntu2204: Unpacking libk5crypto3:arm64 (1.19.2-2ubuntu0.5) over (1.19.2-2ubuntu0.3) ...

ubuntu2204: Setting up libk5crypto3:arm64 (1.19.2-2ubuntu0.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libkrb5support0\_1.19.2-2ubuntu0.5\_arm64.deb ...

ubuntu2204: Unpacking libkrb5support0:arm64 (1.19.2-2ubuntu0.5) over (1.19.2-2ubuntu0.3) ...

ubuntu2204: Setting up libkrb5support0:arm64 (1.19.2-2ubuntu0.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libkrb5-3\_1.19.2-2ubuntu0.5\_arm64.deb ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 8/
ubuntu2204: Unpacking libkrb5-3:arm64 (1.19.2-2ubuntu0.5) over (1.19.2-2ubuntu0.3) ... ubuntu2204: Setting up libkrb5-3:arm64 (1.19.2-2ubuntu0.5) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../libgssapi-krb5-2\_1.19.2-2ubuntu0.5\_arm64.deb ...

ubuntu2204: Unpacking libgssapi-krb5-2:arm64 (1.19.2-2ubuntu0.5) over (1.19.2-2ubuntu0.3) ...

ubuntu2204: Setting up libgssapi-krb5-2:arm64 (1.19.2-2ubuntu0.5) ...

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../libcom-err2\_1.46.5-2ubuntu1.2\_arm64.deb ... ubuntu2204: Unpacking libcom-err2:arm64 (1.46.5-2ubuntu1.2) over (1.46.5-2ubuntu1.1) ... ubuntu2204: Setting up libcom-err2:arm64 (1.46.5-2ubuntu1.2) ...
(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../0-libldap-2.5-0\_2.5.18+dfsg-0ubuntu0.22.04.2\_arm64.deb ...

ubuntu2204: Unpacking libldap-2.5-0:arm64 (2.5.18+dfsg-0ubuntu0.22.04.2) over (2.5.16+dfsg
0ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../1-libnghttp2-14\_1.43.0-1ubuntu0.2\_arm64.deb ... ubuntu2204: Unpacking libnghttp2-14:arm64 (1.43.0-1ubuntu0.2) over (1.43.0-1ubuntu0.1) ... ubuntu2204: Preparing to unpack .../2-libcurl3-gnutls\_7.81.0-1ubuntu1.20\_arm64.deb ...

ubuntu2204: Unpacking libcurl3-gnutls:arm64 (7.81.0-1ubuntu1.20) over (7.81.0-1ubuntu1.15) ...

ubuntu2204: Preparing to unpack .../3-git-man\_1%3a2.34.1-1ubuntu1.12\_all.deb ... ubuntu2204: Unpacking git-man (1:2.34.1-1ubuntu1.12) over (1:2.34.1-1ubuntu1.10) ... ubuntu2204: Preparing to unpack .../4-git\_1%3a2.34.1-1ubuntu1.12\_arm64.deb ... ubuntu2204: Unpacking git (1:2.34.1-1ubuntu1.12) over (1:2.34.1-1ubuntu1.10) ... ubuntu2204: Preparing to unpack .../5-passwd\_1%3a4.8.1-2ubuntu2.2\_arm64.deb ... ubuntu2204: Unpacking passwd (1:4.8.1-2ubuntu2.2) over (1:4.8.1-2ubuntu2.1) ... ubuntu2204: Setting up passwd (1:4.8.1-2ubuntu2.2) ...

(Reading database ... 45951 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../openssh-sftp-server\_1%3a8.9p1-3ubuntu0.10\_arm64.deb ...

ubuntu2204: Unpacking openssh-sftp-server (1:8.9p1-3ubuntu0.10) over (1:8.9p1-3ubuntu0.6) ...

ubuntu2204: Preparing to unpack .../openssh-server\_1%3a8.9p1-3ubuntu0.10\_arm64.deb ... ubuntu2204: Unpacking openssh-server (1:8.9p1-3ubuntu0.10) over (1:8.9p1-3ubuntu0.6) ... ubuntu2204: Preparing to unpack .../openssh-client\_1%3a8.9p1-3ubuntu0.10\_arm64.deb ... ubuntu2204: Unpacking openssh-client (1:8.9p1-3ubuntu0.10) over (1:8.9p1-3ubuntu0.6) ... ubuntu2204: Preparing to unpack .../libpam-runtime\_1.4.0-11ubuntu2.5\_all.deb ... ubuntu2204: Unpacking libpam-runtime (1.4.0-11ubuntu2.5) over (1.4.0-11ubuntu2.4) ... ubuntu2204: Setting up libpam-runtime (1.4.0-11ubuntu2.5) ...

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../libglib2.0-data\_2.72.4-0ubuntu2.4\_all.deb ... ubuntu2204: Unpacking libglib2.0-data (2.72.4-0ubuntu2.4) over (2.72.4-0ubuntu2.2) ... ubuntu2204: Preparing to unpack .../libglib2.0-bin\_2.72.4-0ubuntu2.4\_arm64.deb ... ubuntu2204: Unpacking libglib2.0-bin (2.72.4-0ubuntu2.4) over (2.72.4-0ubuntu2.2) ... ubuntu2204: Preparing to unpack .../libblkid1\_2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking libblkid1:arm64 (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Setting up libblkid1:arm64 (2.37.2-4ubuntu3.4) ...

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../libmount1\_2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking libmount1:arm64 (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Setting up libmount1:arm64 (2.37.2-4ubuntu3.4) ...

(Reading database ... 45951 files and directories currently installed.) ubuntu2204: Preparing to unpack .../000-libglib2.0-0\_2.72.4-0ubuntu2.4\_arm64.deb ... ubuntu2204: Unpacking libglib2.0-0:arm64 (2.72.4-0ubuntu2.4) over (2.72.4-0ubuntu2.2) ... ubuntu2204: Preparing to unpack .../001-libxml2\_2.9.13+dfsg-1ubuntu0.5\_arm64.deb ...

ubuntu2204: Unpacking libxml2:arm64 (2.9.13+dfsg-1ubuntu0.5) over (2.9.13+dfsg-1ubuntu0.3) ...

ubuntu2204: Preparing to unpack .../002-open-vm-tools\_2%3a12.3.5-3\~ubuntu0.22.04.1\_arm64.deb ...

ubuntu2204: Unpacking open-vm-tools (2:12.3.5-3\~ubuntu0.22.04.1) over (2:12.1.5-
3\~ubuntu0.22.04.4) ...

ubuntu2204: Preparing to unpack .../003-libss2\_1.46.5-2ubuntu1.2\_arm64.deb ...

ubuntu2204: Unpacking libss2:arm64 (1.46.5-2ubuntu1.2) over (1.46.5-2ubuntu1.1) ...

ubuntu2204: Preparing to unpack .../004-openssl\_3.0.2-0ubuntu1.18\_arm64.deb ...

ubuntu2204: Unpacking openssl (3.0.2-0ubuntu1.18) over (3.0.2-0ubuntu1.13) ...

ubuntu2204: Preparing to unpack .../005-ca-certificates\_20240203\~22.04.1\_all.deb ...

ubuntu2204: Unpacking ca-certificates (20240203\~22.04.1) over (20230311ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../006-distro-info-data\_0.52ubuntu0.8\_all.deb ...

ubuntu2204: Unpacking distro-info-data (0.52ubuntu0.8) over (0.52ubuntu0.6) ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c}… 9/
ubuntu2204: Preparing to unpack .../007-eject\_2.37.2-4ubuntu3.4\_arm64.deb ...

ubuntu2204: Unpacking eject (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ...

ubuntu2204: Preparing to unpack .../008-less\_590-1ubuntu0.22.04.3\_arm64.deb ...

ubuntu2204: Unpacking less (590-1ubuntu0.22.04.3) over (590-1ubuntu0.22.04.1) ... ubuntu2204: Preparing to unpack .../009-libapparmor1\_3.0.4-2ubuntu2.4\_arm64.deb ... ubuntu2204: Unpacking libapparmor1:arm64 (3.0.4-2ubuntu2.4) over (3.0.4-2ubuntu2.3) ... ubuntu2204: Preparing to unpack .../010-iptables\_1.8.7-1ubuntu5.2\_arm64.deb ...

ubuntu2204: Unpacking iptables (1.8.7-1ubuntu5.2) over (1.8.7-1ubuntu5.1) ...

ubuntu2204: Preparing to unpack .../011-libxtables12\_1.8.7-1ubuntu5.2\_arm64.deb ... ubuntu2204: Unpacking libxtables12:arm64 (1.8.7-1ubuntu5.2) over (1.8.7-1ubuntu5.1) ... ubuntu2204: Preparing to unpack .../012-libip6tc2\_1.8.7-1ubuntu5.2\_arm64.deb ... ubuntu2204: Unpacking libip6tc2:arm64 (1.8.7-1ubuntu5.2) over (1.8.7-1ubuntu5.1) ... ubuntu2204: Preparing to unpack .../013-libip4tc2\_1.8.7-1ubuntu5.2\_arm64.deb ... ubuntu2204: Unpacking libip4tc2:arm64 (1.8.7-1ubuntu5.2) over (1.8.7-1ubuntu5.1) ... ubuntu2204: Preparing to unpack .../014-netplan.io\_0.106.1-7ubuntu0.22.04.4\_arm64.deb ...

ubuntu2204: Unpacking netplan.io (0.106.1-7ubuntu0.22.04.4) over (0.106.1-7ubuntu0.22.04.2) ...

ubuntu2204: Preparing to unpack .../015-libnetplan0\_0.106.1-7ubuntu0.22.04.4\_arm64.deb ... ubuntu2204: Unpacking libnetplan0:arm64 (0.106.1-7ubuntu0.22.04.4) over (0.106.1-
7ubuntu0.22.04.2) ...

ubuntu2204: Preparing to unpack .../016-locales\_2.35-0ubuntu3.9\_all.deb ... ubuntu2204: Unpacking locales (2.35-0ubuntu3.9) over (2.35-0ubuntu3.6) ... ubuntu2204: Preparing to unpack .../017-python-apt-common\_2.4.0ubuntu4\_all.deb ... ubuntu2204: Unpacking python-apt-common (2.4.0ubuntu4) over (2.4.0ubuntu2) ... ubuntu2204: Preparing to unpack .../018-python3-apt\_2.4.0ubuntu4\_arm64.deb ... ubuntu2204: Unpacking python3-apt (2.4.0ubuntu4) over (2.4.0ubuntu2) ...

ubuntu2204: Preparing to unpack .../019-python3-setuptools\_59.6.0-1.2ubuntu0.22.04.2\_all.deb ...

ubuntu2204: Unpacking python3-setuptools (59.6.0-1.2ubuntu0.22.04.2) over (59.6.0-
1.2ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../020-python3-pkg-resources\_59.6.0-
1.2ubuntu0.22.04.2\_all.deb ...

ubuntu2204: Unpacking python3-pkg-resources (59.6.0-1.2ubuntu0.22.04.2) over (59.6.0- 1.2ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../021-tzdata\_2024b-0ubuntu0.22.04.1\_all.deb ... ubuntu2204: Unpacking tzdata (2024b-0ubuntu0.22.04.1) over (2023d-0ubuntu0.22.04) ... ubuntu2204: Preparing to unpack .../022-ubuntu-advantage-tools\_34\~22.04\_all.deb ... ubuntu2204: Unpacking ubuntu-advantage-tools (34\~22.04) over (30\~22.04) ... ubuntu2204: dpkg: warning: unable to delete old directory '/var/lib/ubuntu-advantage': Directory not empty

ubuntu2204: dpkg: warning: unable to delete old directory '/etc/update-manager/release upgrades.d': Directory not empty

ubuntu2204: dpkg: warning: unable to delete old directory '/etc/update-manager': Directory not empty

ubuntu2204: dpkg: warning: unable to delete old directory '/etc/ubuntu-advantage': Directory not empty

ubuntu2204: Selecting previously unselected package ubuntu-pro-client.

ubuntu2204: Preparing to unpack .../023-ubuntu-pro-client\_34\~22.04\_arm64.deb ... ubuntu2204: Unpacking ubuntu-pro-client (34\~22.04) ...

ubuntu2204: Preparing to unpack .../024-xxd\_2%3a8.2.3995-1ubuntu2.23\_arm64.deb ... ubuntu2204: Unpacking xxd (2:8.2.3995-1ubuntu2.23) over (2:8.2.3995-1ubuntu2.15) ... ubuntu2204: Preparing to unpack .../025-vim\_2%3a8.2.3995-1ubuntu2.23\_arm64.deb ... ubuntu2204: Unpacking vim (2:8.2.3995-1ubuntu2.23) over (2:8.2.3995-1ubuntu2.15) ... ubuntu2204: Preparing to unpack .../026-vim-tiny\_2%3a8.2.3995-1ubuntu2.23\_arm64.deb ... ubuntu2204: Unpacking vim-tiny (2:8.2.3995-1ubuntu2.23) over (2:8.2.3995-1ubuntu2.15) ... ubuntu2204: Preparing to unpack .../027-vim-runtime\_2%3a8.2.3995-1ubuntu2.23\_all.deb ... ubuntu2204: Unpacking vim-runtime (2:8.2.3995-1ubuntu2.23) over (2:8.2.3995-1ubuntu2.15) ... ubuntu2204: Preparing to unpack .../028-vim-common\_2%3a8.2.3995-1ubuntu2.23\_all.deb ... ubuntu2204: Unpacking vim-common (2:8.2.3995-1ubuntu2.23) over (2:8.2.3995-1ubuntu2.15) ... ubuntu2204: Preparing to unpack .../029-ubuntu-minimal\_1.481.4\_arm64.deb ... ubuntu2204: Unpacking ubuntu-minimal (1.481.4) over (1.481.1) ...

ubuntu2204: Preparing to unpack .../030-ubuntu-pro-client-l10n\_34\~22.04\_arm64.deb ... ubuntu2204: Unpacking ubuntu-pro-client-l10n (34\~22.04) over (30\~22.04) ... ubuntu2204: Preparing to unpack .../031-apparmor\_3.0.4-2ubuntu2.4\_arm64.deb ... ubuntu2204: Unpacking apparmor (3.0.4-2ubuntu2.4) over (3.0.4-2ubuntu2.3) ... ubuntu2204: Preparing to unpack .../032-libuv1\_1.43.0-1ubuntu0.1\_arm64.deb ... ubuntu2204: Unpacking libuv1:arm64 (1.43.0-1ubuntu0.1) over (1.43.0-1) ...

ubuntu2204: Preparing to unpack .../033-bind9-dnsutils\_1%3a9.18.30-0ubuntu0.22.04.2\_arm64.deb ...

ubuntu2204: Unpacking bind9-dnsutils (1:9.18.30-0ubuntu0.22.04.2) over (1:9.18.18-
0ubuntu0.22.04.1) ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 10/

ubuntu2204: Preparing to unpack .../034-bind9-host\_1%3a9.18.30-0ubuntu0.22.04.2\_arm64.deb ...

ubuntu2204: Unpacking bind9-host (1:9.18.30-0ubuntu0.22.04.2) over (1:9.18.18-
0ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../035-bind9-libs\_1%3a9.18.30-0ubuntu0.22.04.2\_arm64.deb ...

ubuntu2204: Unpacking bind9-libs:arm64 (1:9.18.30-0ubuntu0.22.04.2) over (1:9.18.18-
0ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../036-bsdextrautils\_2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking bsdextrautils (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Preparing to unpack .../037-busybox-static\_1%3a1.30.1-7ubuntu3.1\_arm64.deb ... ubuntu2204: Unpacking busybox-static (1:1.30.1-7ubuntu3.1) over (1:1.30.1-7ubuntu3) ... ubuntu2204: Preparing to unpack .../038-cpio\_2.13+dfsg-7ubuntu0.1\_arm64.deb ... ubuntu2204: Unpacking cpio (2.13+dfsg-7ubuntu0.1) over (2.13+dfsg-7) ... ubuntu2204: Preparing to unpack .../039-dmidecode\_3.3-3ubuntu0.2\_arm64.deb ... ubuntu2204: Unpacking dmidecode (3.3-3ubuntu0.2) over (3.3-3ubuntu0.1) ... ubuntu2204: Preparing to unpack .../040-libpcap0.8\_1.10.1-4ubuntu1.22.04.1\_arm64.deb ... ubuntu2204: Unpacking libpcap0.8:arm64 (1.10.1-4ubuntu1.22.04.1) over (1.10.1-4build1) ... ubuntu2204: Preparing to unpack .../041-nano\_6.2-1ubuntu0.1\_arm64.deb ... ubuntu2204: Unpacking nano (6.2-1ubuntu0.1) over (6.2-1) ...

ubuntu2204: Preparing to unpack .../042-tcpdump\_4.99.1-3ubuntu0.2\_arm64.deb ... ubuntu2204: Unpacking tcpdump (4.99.1-3ubuntu0.2) over (4.99.1-3ubuntu0.1) ... ubuntu2204: Preparing to unpack .../043-wget\_1.21.2-2ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking wget (1.21.2-2ubuntu1.1) over (1.21.2-2ubuntu1) ...

ubuntu2204: Preparing to unpack .../044-python3-problem-report\_2.20.11-0ubuntu82.6\_all.deb ...

ubuntu2204: Unpacking python3-problem-report (2.20.11-0ubuntu82.6) over (2.20.11-0ubuntu82.5) ...

ubuntu2204: Preparing to unpack .../045-python3-apport\_2.20.11-0ubuntu82.6\_all.deb ... ubuntu2204: Unpacking python3-apport (2.20.11-0ubuntu82.6) over (2.20.11-0ubuntu82.5) ... ubuntu2204: Preparing to unpack .../046-apport\_2.20.11-0ubuntu82.6\_all.deb ... ubuntu2204: Unpacking apport (2.20.11-0ubuntu82.6) over (2.20.11-0ubuntu82.5) ... ubuntu2204: Preparing to unpack .../047-libctf0\_2.38-4ubuntu2.6\_arm64.deb ... ubuntu2204: Unpacking libctf0:arm64 (2.38-4ubuntu2.6) over (2.38-4ubuntu2.5) ... ubuntu2204: Preparing to unpack .../048-libctf-nobfd0\_2.38-4ubuntu2.6\_arm64.deb ... ubuntu2204: Unpacking libctf-nobfd0:arm64 (2.38-4ubuntu2.6) over (2.38-4ubuntu2.5) ... ubuntu2204: Preparing to unpack .../049-binutils-aarch64-linux-gnu\_2.38-4ubuntu2.6\_arm64.deb ...

ubuntu2204: Unpacking binutils-aarch64-linux-gnu (2.38-4ubuntu2.6) over (2.38-4ubuntu2.5) ...

ubuntu2204: Preparing to unpack .../050-libbinutils\_2.38-4ubuntu2.6\_arm64.deb ... ubuntu2204: Unpacking libbinutils:arm64 (2.38-4ubuntu2.6) over (2.38-4ubuntu2.5) ... ubuntu2204: Preparing to unpack .../051-binutils\_2.38-4ubuntu2.6\_arm64.deb ... ubuntu2204: Unpacking binutils (2.38-4ubuntu2.6) over (2.38-4ubuntu2.5) ... ubuntu2204: Preparing to unpack .../052-binutils-common\_2.38-4ubuntu2.6\_arm64.deb ... ubuntu2204: Unpacking binutils-common:arm64 (2.38-4ubuntu2.6) over (2.38-4ubuntu2.5) ... ubuntu2204: Preparing to unpack .../053-busybox-initramfs\_1%3a1.30.1-7ubuntu3.1\_arm64.deb ...

ubuntu2204: Unpacking busybox-initramfs (1:1.30.1-7ubuntu3.1) over (1:1.30.1-7ubuntu3) ... ubuntu2204: Preparing to unpack .../054-curl\_7.81.0-1ubuntu1.20\_arm64.deb ... ubuntu2204: Unpacking curl (7.81.0-1ubuntu1.20) over (7.81.0-1ubuntu1.15) ... ubuntu2204: Preparing to unpack .../055-libcurl4\_7.81.0-1ubuntu1.20\_arm64.deb ... ubuntu2204: Unpacking libcurl4:arm64 (7.81.0-1ubuntu1.20) over (7.81.0-1ubuntu1.15) ... ubuntu2204: Preparing to unpack .../056-ethtool\_1%3a5.16-1ubuntu0.1\_arm64.deb ... ubuntu2204: Unpacking ethtool (1:5.16-1ubuntu0.1) over (1:5.16-1) ...

ubuntu2204: Preparing to unpack .../057-libfdisk1\_2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking libfdisk1:arm64 (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Preparing to unpack .../058-fdisk\_2.37.2-4ubuntu3.4\_arm64.deb ... ubuntu2204: Unpacking fdisk (2.37.2-4ubuntu3.4) over (2.37.2-4ubuntu3) ... ubuntu2204: Preparing to unpack .../059-firmware-sof-signed\_2.0-1ubuntu4.7\_all.deb ... ubuntu2204: Unpacking firmware-sof-signed (2.0-1ubuntu4.7) over (2.0-1ubuntu4.4) ... ubuntu2204: Preparing to unpack .../060-libpackagekit-glib2-18\_1.2.5-2ubuntu3\_arm64.deb ... ubuntu2204: Unpacking libpackagekit-glib2-18:arm64 (1.2.5-2ubuntu3) over (1.2.5-2ubuntu2) ...

ubuntu2204: Preparing to unpack .../061-gir1.2-packagekitglib-1.0\_1.2.5-2ubuntu3\_arm64.deb ...

ubuntu2204: Unpacking gir1.2-packagekitglib-1.0 (1.2.5-2ubuntu3) over (1.2.5-2ubuntu2) ... ubuntu2204: Preparing to unpack .../062-klibc-utils\_2.0.10-4ubuntu0.1\_arm64.deb ... ubuntu2204: Unpacking klibc-utils (2.0.10-4ubuntu0.1) over (2.0.10-4) ... ubuntu2204: Preparing to unpack .../063-libklibc\_2.0.10-4ubuntu0.1\_arm64.deb ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 11/
ubuntu2204: Unpacking libklibc:arm64 (2.0.10-4ubuntu0.1) over (2.0.10-4) ...

ubuntu2204: Preparing to unpack .../064-python3-cryptography\_3.4.8-1ubuntu2.2\_arm64.deb ... ubuntu2204: Unpacking python3-cryptography (3.4.8-1ubuntu2.2) over (3.4.8-1ubuntu2.1) ... ubuntu2204: Preparing to unpack .../065-python3-idna\_3.3-1ubuntu0.1\_all.deb ...

ubuntu2204: Unpacking python3-idna (3.3-1ubuntu0.1) over (3.3-1) ...

ubuntu2204: Preparing to unpack .../066-python3-twisted\_22.1.0-2ubuntu2.6\_all.deb ... ubuntu2204: Unpacking python3-twisted (22.1.0-2ubuntu2.6) over (22.1.0-2ubuntu2.4) ... ubuntu2204: Preparing to unpack .../067-python3-configobj\_5.0.6-5ubuntu0.1\_all.deb ... ubuntu2204: Unpacking python3-configobj (5.0.6-5ubuntu0.1) over (5.0.6-5) ...

ubuntu2204: Preparing to unpack .../068-landscape-common\_23.02-0ubuntu1\~22.04.3\_arm64.deb ...

ubuntu2204: Unpacking landscape-common (23.02-0ubuntu1\~22.04.3) over (19.12-0ubuntu13) ... ubuntu2204: Preparing to unpack .../069-libarchive13\_3.6.0-1ubuntu1.3\_arm64.deb ... ubuntu2204: Unpacking libarchive13:arm64 (3.6.0-1ubuntu1.3) over (3.6.0-1ubuntu1) ... ubuntu2204: Preparing to unpack .../070-libgpgme11\_1.16.0-1.2ubuntu4.2\_arm64.deb ... ubuntu2204: Unpacking libgpgme11:arm64 (1.16.0-1.2ubuntu4.2) over (1.16.0-1.2ubuntu4.1) ... ubuntu2204: Preparing to unpack .../071-libgstreamer1.0-0\_1.20.3-0ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libgstreamer1.0-0:arm64 (1.20.3-0ubuntu1.1) over (1.20.3-0ubuntu1) ... ubuntu2204: Preparing to unpack .../072-libldap-common\_2.5.18+dfsg-0ubuntu0.22.04.2\_all.deb ...

ubuntu2204: Unpacking libldap-common (2.5.18+dfsg-0ubuntu0.22.04.2) over (2.5.16+dfsg
0ubuntu0.22.04.1) ...

ubuntu2204: Preparing to unpack .../073-libmbim-proxy\_1.28.0-1\~ubuntu20.04.2\_arm64.deb ...

ubuntu2204: Unpacking libmbim-proxy (1.28.0-1\~ubuntu20.04.2) over (1.28.0-1\~ubuntu20.04.1) ...

ubuntu2204: Preparing to unpack .../074-libmbim-glib4\_1.28.0-1\~ubuntu20.04.2\_arm64.deb ... ubuntu2204: Unpacking libmbim-glib4:arm64 (1.28.0-1\~ubuntu20.04.2) over (1.28.0-
1\~ubuntu20.04.1) ...

ubuntu2204: Preparing to unpack .../075-libmm-glib0\_1.20.0-1\~ubuntu22.04.4\_arm64.deb ... ubuntu2204: Unpacking libmm-glib0:arm64 (1.20.0-1\~ubuntu22.04.4) over (1.20.0- 1\~ubuntu22.04.3) ...

ubuntu2204: Preparing to unpack .../076-libmodule-scandeps-perl\_1.31-1ubuntu0.1\_all.deb ... ubuntu2204: Unpacking libmodule-scandeps-perl (1.31-1ubuntu0.1) over (1.31-1) ... ubuntu2204: Preparing to unpack .../077-libnspr4\_2%3a4.35-0ubuntu0.22.04.1\_arm64.deb ... ubuntu2204: Unpacking libnspr4:arm64 (2:4.35-0ubuntu0.22.04.1) over (2:4.32-3build1) ... ubuntu2204: Preparing to unpack .../078-libnss3\_2%3a3.98-0ubuntu0.22.04.2\_arm64.deb ... ubuntu2204: Unpacking libnss3:arm64 (2:3.98-0ubuntu0.22.04.2) over (2:3.68.2-0ubuntu1.2) ... ubuntu2204: Preparing to unpack .../079-libtss2-mu0\_3.2.0-1ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libtss2-mu0:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ... ubuntu2204: Preparing to unpack .../080-libtss2-tcti-cmd0\_3.2.0-1ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libtss2-tcti-cmd0:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ... ubuntu2204: Preparing to unpack .../081-libtss2-tcti-device0\_3.2.0-1ubuntu1.1\_arm64.deb ...

ubuntu2204: Unpacking libtss2-tcti-device0:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ...

ubuntu2204: Preparing to unpack .../082-libtss2-tcti-mssim0\_3.2.0-1ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libtss2-tcti-mssim0:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ... ubuntu2204: Preparing to unpack .../083-libtss2-tcti-swtpm0\_3.2.0-1ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libtss2-tcti-swtpm0:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ... ubuntu2204: Preparing to unpack .../084-libtss2-sys1\_3.2.0-1ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libtss2-sys1:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ... ubuntu2204: Preparing to unpack .../085-libtss2-esys-3.0.2-0\_3.2.0-1ubuntu1.1\_arm64.deb ... ubuntu2204: Unpacking libtss2-esys-3.0.2-0:arm64 (3.2.0-1ubuntu1.1) over (3.2.0-1ubuntu1) ...

ubuntu2204: Preparing to unpack .../086-linux-firmware\_20220329.git681281e4-
0ubuntu3.36\_all.deb ...

ubuntu2204: Unpacking linux-firmware (20220329.git681281e4-0ubuntu3.36) over (20220329.git681281e4-0ubuntu3.24) ...

ubuntu2204: Selecting previously unselected package linux-modules-5.15.0-131-generic. ubuntu2204: Preparing to unpack .../087-linux-modules-5.15.0-131-generic\_5.15.0- 131.141\_arm64.deb ...

ubuntu2204: Unpacking linux-modules-5.15.0-131-generic (5.15.0-131.141) ... ubuntu2204: Selecting previously unselected package linux-image-5.15.0-131-generic. ubuntu2204: Preparing to unpack .../088-linux-image-5.15.0-131-generic\_5.15.0- 131.141\_arm64.deb ...

ubuntu2204: Unpacking linux-image-5.15.0-131-generic (5.15.0-131.141) ...

ubuntu2204: Preparing to unpack .../089-wireless-regdb\_2024.07.04-0ubuntu1\~22.04.1\_all.deb ...

ubuntu2204: Unpacking wireless-regdb (2024.07.04-0ubuntu1\~22.04.1) over (2022.06.06-
0ubuntu1\~22.04.1) ...

ubuntu2204: Selecting previously unselected package linux-modules-extra-5.15.0-131-generic.

ubuntu2204: Preparing to unpack .../090-linux-modules-extra-5.15.0-131-generic\_5.15.0-
131.141\_arm64.deb ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 12/
ubuntu2204: Unpacking linux-modules-extra-5.15.0-131-generic (5.15.0-131.141) ... ubuntu2204: Preparing to unpack .../091-linux-image-generic\_5.15.0.131.129\_arm64.deb ... ubuntu2204: Unpacking linux-image-generic (5.15.0.131.129) over (5.15.0.92.89) ... ubuntu2204: Preparing to unpack .../092-modemmanager\_1.20.0-1\~ubuntu22.04.4\_arm64.deb ...

ubuntu2204: Unpacking modemmanager (1.20.0-1\~ubuntu22.04.4) over (1.20.0-1\~ubuntu22.04.3) ...

ubuntu2204: Preparing to unpack .../093-needrestart\_3.5-5ubuntu2.4\_all.deb ... ubuntu2204: Unpacking needrestart (3.5-5ubuntu2.4) over (3.5-5ubuntu2.1) ... ubuntu2204: Preparing to unpack .../094-packagekit-tools\_1.2.5-2ubuntu3\_arm64.deb ... ubuntu2204: Unpacking packagekit-tools (1.2.5-2ubuntu3) over (1.2.5-2ubuntu2) ... ubuntu2204: Preparing to unpack .../095-packagekit\_1.2.5-2ubuntu3\_arm64.deb ... ubuntu2204: Unpacking packagekit (1.2.5-2ubuntu3) over (1.2.5-2ubuntu2) ... ubuntu2204: Preparing to unpack .../096-python3-jinja2\_3.0.3-1ubuntu0.3\_all.deb ... ubuntu2204: Unpacking python3-jinja2 (3.0.3-1ubuntu0.3) over (3.0.3-1ubuntu0.1) ... ubuntu2204: Selecting previously unselected package python3-packaging.

ubuntu2204: Preparing to unpack .../097-python3-packaging\_21.3-1\_all.deb ... ubuntu2204: Unpacking python3-packaging (21.3-1) ...

ubuntu2204: Preparing to unpack .../098-python3-urllib3\_1.26.5-1\~exp1ubuntu0.2\_all.deb ... ubuntu2204: Unpacking python3-urllib3 (1.26.5-1\~exp1ubuntu0.2) over (1.26.5-1\~exp1ubuntu0.1) ...

ubuntu2204: Preparing to unpack .../099-python3-zipp\_1.0.0-3ubuntu0.1\_all.deb ... ubuntu2204: Unpacking python3-zipp (1.0.0-3ubuntu0.1) over (1.0.0-3) ... ubuntu2204: Preparing to unpack .../100-shim-signed\_1.51.4+15.8-0ubuntu1\_arm64.deb ... ubuntu2204: Unpacking shim-signed (1.51.4+15.8-0ubuntu1) over (1.51.3+15.7-0ubuntu1) ... ubuntu2204: Preparing to unpack .../101-snapd\_2.66.1+22.04\_arm64.deb ... ubuntu2204: Unpacking snapd (2.66.1+22.04) over (2.58+22.04.1) ...

ubuntu2204: Preparing to unpack .../102-sosreport\_4.7.2-0ubuntu1\~22.04.2\_arm64.deb ... ubuntu2204: Unpacking sosreport (4.7.2-0ubuntu1\~22.04.2) over (4.5.6-0ubuntu1\~22.04.2) ... ubuntu2204: Preparing to unpack .../103-xfsprogs\_5.13.0-1ubuntu2.1\_arm64.deb ... ubuntu2204: Unpacking xfsprogs (5.13.0-1ubuntu2.1) over (5.13.0-1ubuntu2) ... ubuntu2204: Preparing to unpack .../104-cloud-init\_24.4-0ubuntu1\~22.04.1\_all.deb ... ubuntu2204: Unpacking cloud-init (24.4-0ubuntu1\~22.04.1) over (23.3.3-0ubuntu0\~22.04.1) ... ubuntu2204: dpkg: warning: unable to delete old directory '/etc/systemd/system/sshd
keygen@.service.d': Directory not empty

ubuntu2204: Setting up libip4tc2:arm64 (1.8.7-1ubuntu5.2) ...

ubuntu2204: Setting up libexpat1:arm64 (2.4.7-1ubuntu0.5) ...

ubuntu2204: Setting up cpio (2.13+dfsg-7ubuntu0.1) ...

ubuntu2204: Setting up libapparmor1:arm64 (3.0.4-2ubuntu2.4) ...

ubuntu2204: Setting up apt-utils (2.4.13) ...

ubuntu2204: Setting up bsdextrautils (2.37.2-4ubuntu3.4) ...

ubuntu2204: Setting up wget (1.21.2-2ubuntu1.1) ...

ubuntu2204: Setting up linux-firmware (20220329.git681281e4-0ubuntu3.36) ...

ubuntu2204: update-initramfs: Generating /boot/initrd.img-5.15.0-92-generic

ubuntu2204: find: ‘/var/tmp/mkinitramfs\_N57zwo/lib/firmware’: No such file or directory

ubuntu2204: Setting up libip6tc2:arm64 (1.8.7-1ubuntu5.2) ...

ubuntu2204: Setting up libglib2.0-0:arm64 (2.72.4-0ubuntu2.4) ...

ubuntu2204: No schema files found: doing nothing.

ubuntu2204: Setting up distro-info-data (0.52ubuntu0.8) ...

ubuntu2204: Setting up openssh-client (1:8.9p1-3ubuntu0.10) ...

ubuntu2204: Setting up firmware-sof-signed (2.0-1ubuntu4.7) ...

ubuntu2204: Setting up wireless-regdb (2024.07.04-0ubuntu1\~22.04.1) ...

ubuntu2204: Setting up libtss2-mu0:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up libtss2-tcti-swtpm0:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up binutils-common:arm64 (2.38-4ubuntu2.6) ...
ubuntu2204: Setting up libnghttp2-14:arm64 (1.43.0-1ubuntu0.2) ...

ubuntu2204: Setting up less (590-1ubuntu0.22.04.3) ...

ubuntu2204: Setting up libctf-nobfd0:arm64 (2.38-4ubuntu2.6) ...

ubuntu2204: Setting up libnetplan0:arm64 (0.106.1-7ubuntu0.22.04.4) ...

ubuntu2204: Setting up libpackagekit-glib2-18:arm64 (1.2.5-2ubuntu3) ...

ubuntu2204: Setting up locales (2.35-0ubuntu3.9) ...

ubuntu2204: Generating locales (this might take a while)...

ubuntu2204: en\_US.UTF-8... done

ubuntu2204: Generation complete.

ubuntu2204: Setting up libldap-common (2.5.18+dfsg-0ubuntu0.22.04.2) ...

ubuntu2204: Setting up libgpgme11:arm64 (1.16.0-1.2ubuntu4.2) ...

ubuntu2204: Setting up shim-signed (1.51.4+15.8-0ubuntu1) ...

ubuntu2204: Trying to migrate /boot/efi into esp config

ubuntu2204: Installing grub to /boot/efi.

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 13/

ubuntu2204: Installing for arm64-efi platform.

ubuntu2204: Installation finished. No error reported.

ubuntu2204: Setting up libldap-2.5-0:arm64 (2.5.18+dfsg-0ubuntu0.22.04.2) ...

ubuntu2204: Setting up xxd (2:8.2.3995-1ubuntu2.23) ...

ubuntu2204: Setting up libtss2-tcti-device0:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up tzdata (2024b-0ubuntu0.22.04.1) ...

ubuntu2204:

ubuntu2204: Current default time zone: 'Etc/UTC'

ubuntu2204: Local time is now: Sat Feb 15 03:27:20 UTC 2025\.

ubuntu2204: Universal Time is now: Sat Feb 15 03:27:20 UTC 2025\.

ubuntu2204: Run 'dpkg-reconfigure tzdata' if you wish to change it.
ubuntu2204:

ubuntu2204: Setting up eject (2.37.2-4ubuntu3.4) ...

ubuntu2204: Setting up apparmor (3.0.4-2ubuntu2.4) ...

ubuntu2204: Reloading AppArmor profiles

ubuntu2204: Skipping profile in /etc/apparmor.d/disable: usr.sbin.rsyslogd

ubuntu2204: Setting up gir1.2-packagekitglib-1.0 (1.2.5-2ubuntu3) ...

ubuntu2204: Setting up libklibc:arm64 (2.0.10-4ubuntu0.1) ...

ubuntu2204: Setting up libtss2-tcti-cmd0:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up libglib2.0-data (2.72.4-0ubuntu2.4) ...

ubuntu2204: Setting up libuv1:arm64 (1.43.0-1ubuntu0.1) ...

ubuntu2204: Setting up vim-common (2:8.2.3995-1ubuntu2.23) ...

ubuntu2204: Setting up busybox-static (1:1.30.1-7ubuntu3.1) ...

ubuntu2204: Setting up libpcap0.8:arm64 (1.10.1-4ubuntu1.22.04.1) ...

ubuntu2204: Setting up libnspr4:arm64 (2:4.35-0ubuntu0.22.04.1) ...

ubuntu2204: Setting up libss2:arm64 (1.46.5-2ubuntu1.2) ...

ubuntu2204: Setting up libpython3.10-minimal:arm64 (3.10.12-1\~22.04.8) ...

ubuntu2204: Setting up libtss2-tcti-mssim0:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up busybox-initramfs (1:1.30.1-7ubuntu3.1) ...

ubuntu2204: Setting up libxtables12:arm64 (1.8.7-1ubuntu5.2) ...

ubuntu2204: Setting up logsave (1.46.5-2ubuntu1.2) ...

ubuntu2204: Setting up libfdisk1:arm64 (2.37.2-4ubuntu3.4) ...

ubuntu2204: Setting up nano (6.2-1ubuntu0.1) ...
ubuntu2204: Setting up python-apt-common (2.4.0ubuntu4) ...

ubuntu2204: Setting up mount (2.37.2-4ubuntu3.4) ...

ubuntu2204: Setting up uuid-runtime (2.37.2-4ubuntu3.4) ...

ubuntu2204: uuidd.service is a disabled or a static unit not running, not starting it.

ubuntu2204: Setting up libmm-glib0:arm64 (1.20.0-1\~ubuntu22.04.4) ...

ubuntu2204: Setting up libcurl4:arm64 (7.81.0-1ubuntu1.20) ...

ubuntu2204: Setting up git-man (1:2.34.1-1ubuntu1.12) ...

ubuntu2204: Setting up curl (7.81.0-1ubuntu1.20) ...

ubuntu2204: Setting up dmidecode (3.3-3ubuntu0.2) ...

ubuntu2204: Setting up libbinutils:arm64 (2.38-4ubuntu2.6) ...

ubuntu2204: Setting up vim-runtime (2:8.2.3995-1ubuntu2.23) ...

ubuntu2204: Setting up klibc-utils (2.0.10-4ubuntu0.1) ...

ubuntu2204: Setting up openssl (3.0.2-0ubuntu1.18) ...

ubuntu2204: Setting up libxml2:arm64 (2.9.13+dfsg-1ubuntu0.5) ...

ubuntu2204: Setting up libmodule-scandeps-perl (1.31-1ubuntu0.1) ...

ubuntu2204: Setting up libmbim-glib4:arm64 (1.28.0-1\~ubuntu20.04.2) ...

ubuntu2204: Setting up libgstreamer1.0-0:arm64 (1.20.3-0ubuntu1.1) ...

ubuntu2204: Setcap worked\! gst-ptp-helper is not suid\!

ubuntu2204: Setting up rsync (3.2.7-0ubuntu0.22.04.4) ...

ubuntu2204: rsync.service is a disabled or a static unit not running, not starting it.

ubuntu2204: Setting up ethtool (1:5.16-1ubuntu0.1) ...
ubuntu2204: Setting up libctf0:arm64 (2.38-4ubuntu2.6) ...

ubuntu2204: Setting up openssh-sftp-server (1:8.9p1-3ubuntu0.10) ...

ubuntu2204: Setting up tcpdump (4.99.1-3ubuntu0.2) ...

ubuntu2204: Installing new version of config file /etc/apparmor.d/usr.bin.tcpdump ...

ubuntu2204: Setting up openssh-server (1:8.9p1-3ubuntu0.10) ...

ubuntu2204: rescue-ssh.target is a disabled or a static unit not running, not starting it.

ubuntu2204: ssh.socket is a disabled or a static unit not running, not starting it.

ubuntu2204: Setting up libtss2-sys1:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up bind9-libs:arm64 (1:9.18.30-0ubuntu0.22.04.2) ...

ubuntu2204: Setting up libarchive13:arm64 (3.6.0-1ubuntu1.3) ...

ubuntu2204: Setting up iptables (1.8.7-1ubuntu5.2) ...

ubuntu2204: Setting up libglib2.0-bin (2.72.4-0ubuntu2.4) ...

ubuntu2204: Setting up binutils-aarch64-linux-gnu (2.38-4ubuntu2.6) ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 14/
ubuntu2204: Setting up e2fsprogs (1.46.5-2ubuntu1.2) ...

ubuntu2204: update-initramfs: deferring update (trigger activated)

ubuntu2204: e2scrub\_all.service is a disabled or a static unit not running, not starting it. ubuntu2204: Setting up libcurl3-gnutls:arm64 (7.81.0-1ubuntu1.20) ...

ubuntu2204: Setting up libnss3:arm64 (2:3.98-0ubuntu0.22.04.2) ...

ubuntu2204: Setting up binutils (2.38-4ubuntu2.6) ...

ubuntu2204: Setting up libmbim-proxy (1.28.0-1\~ubuntu20.04.2) ...

ubuntu2204: Setting up vim-tiny (2:8.2.3995-1ubuntu2.23) ...

ubuntu2204: Setting up python3.10-minimal (3.10.12-1\~22.04.8) ...

ubuntu2204: Setting up fdisk (2.37.2-4ubuntu3.4) ...

ubuntu2204: Setting up libpython3.10-stdlib:arm64 (3.10.12-1\~22.04.8) ...
ubuntu2204: Setting up ca-certificates (20240203\~22.04.1) ...

ubuntu2204: Updating certificates in /etc/ssl/certs...

ubuntu2204: rehash: warning: skipping ca-certificates.crt,it does not contain exactly one certificate or CRL

ubuntu2204: 14 added, 5 removed; done.

ubuntu2204: Setting up libtss2-esys-3.0.2-0:arm64 (3.2.0-1ubuntu1.1) ...

ubuntu2204: Setting up git (1:2.34.1-1ubuntu1.12) ...

ubuntu2204: Setting up open-vm-tools (2:12.3.5-3\~ubuntu0.22.04.1) ...

ubuntu2204: Installing new version of config file /etc/vmware-tools/poweroff-vm-default ... ubuntu2204: Installing new version of config file /etc/vmware-tools/poweron-vm-default ... ubuntu2204: Installing new version of config file /etc/vmware-tools/resume-vm-default ...

ubuntu2204: Installing new version of config file /etc/vmware-tools/scripts/vmware/network ...

ubuntu2204: Installing new version of config file /etc/vmware-tools/suspend-vm-default ... ubuntu2204: Installing new version of config file /etc/vmware-tools/tools.conf.example ... ubuntu2204: Setting up packagekit (1.2.5-2ubuntu3) ...

ubuntu2204: Setting up modemmanager (1.20.0-1\~ubuntu22.04.4) ...

ubuntu2204: Setting up bind9-host (1:9.18.30-0ubuntu0.22.04.2) ...

ubuntu2204: Setting up libpython3-stdlib:arm64 (3.10.6-1\~22.04.1) ...

ubuntu2204: Setting up snapd (2.66.1+22.04) ...

ubuntu2204: Installing new version of config file /etc/apparmor.d/usr.lib.snapd.snap
confine.real ...
ubuntu2204: snapd.failure.service is a disabled or a static unit not running, not starting it.

ubuntu2204: snapd.snap-repair.service is a disabled or a static unit not running, not
starting it.

ubuntu2204: Setting up packagekit-tools (1.2.5-2ubuntu3) ...

ubuntu2204: Setting up needrestart (3.5-5ubuntu2.4) ...

ubuntu2204: Setting up libpython3.10:arm64 (3.10.12-1\~22.04.8) ...

ubuntu2204: Setting up vim (2:8.2.3995-1ubuntu2.23) ...

ubuntu2204: Setting up python3.10 (3.10.12-1\~22.04.8) ...

ubuntu2204: Setting up python3 (3.10.6-1\~22.04.1) ...

ubuntu2204: running python rtupdate hooks for python3.10...

ubuntu2204: running python post-rtupdate hooks for python3.10...

ubuntu2204: Setting up python3-zipp (1.0.0-3ubuntu0.1) ...

ubuntu2204: Setting up netplan.io (0.106.1-7ubuntu0.22.04.4) ...

ubuntu2204: Setting up python3-jinja2 (3.0.3-1ubuntu0.3) ...

ubuntu2204: Setting up python3-packaging (21.3-1) ...

ubuntu2204: Setting up python3-configobj (5.0.6-5ubuntu0.1) ...

ubuntu2204: Setting up python3-cryptography (3.4.8-1ubuntu2.2) ...

ubuntu2204: Setting up python3-idna (3.3-1ubuntu0.1) ...

ubuntu2204: Setting up xfsprogs (5.13.0-1ubuntu2.1) ...

ubuntu2204: update-initramfs: deferring update (trigger activated)
ubuntu2204: Setting up sosreport (4.7.2-0ubuntu1\~22.04.2) ...

ubuntu2204: Setting up python3-urllib3 (1.26.5-1\~exp1ubuntu0.2) ...

ubuntu2204: Setting up bind9-dnsutils (1:9.18.30-0ubuntu0.22.04.2) ...

ubuntu2204: Setting up python3-pkg-resources (59.6.0-1.2ubuntu0.22.04.2) ... ubuntu2204: Setting up cloud-init (24.4-0ubuntu1\~22.04.1) ...

ubuntu2204: Installing new version of config file /etc/cloud/cloud.cfg ... ubuntu2204: Installing new version of config file /etc/cloud/cloud.cfg.d/05\_logging.cfg ...

ubuntu2204: Installing new version of config file /etc/cloud/templates/chrony.conf.cos.tmpl ...

ubuntu2204: Installing new version of config file
/etc/cloud/templates/chrony.conf.debian.tmpl ...

ubuntu2204: Installing new version of config file
/etc/cloud/templates/chrony.conf.ubuntu.tmpl ...

ubuntu2204: Installing new version of config file /etc/cloud/templates/hosts.alpine.tmpl ...

ubuntu2204: Installing new version of config file /etc/cloud/templates/hosts.mariner.tmpl ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 15/

ubuntu2204: Installing new version of config file /etc/cloud/templates/ntp.conf.ubuntu.tmpl ...

ubuntu2204: Installing new version of config file /etc/profile.d/Z99-cloud-locale-test.sh ...

ubuntu2204: Installing new version of config file /etc/profile.d/Z99-cloudinit-warnings.sh ...

ubuntu2204: Removing obsolete conffile /etc/cloud/clean.d/README ...

ubuntu2204: Setting up python3-setuptools (59.6.0-1.2ubuntu0.22.04.2) ... ubuntu2204: Setting up python3-problem-report (2.20.11-0ubuntu82.6) ... ubuntu2204: Setting up python3-apt (2.4.0ubuntu4) ...

ubuntu2204: Setting up python3-apport (2.20.11-0ubuntu82.6) ...
ubuntu2204: Setting up python3-twisted (22.1.0-2ubuntu2.6) ...

ubuntu2204: Setting up ubuntu-pro-client (34\~22.04) ...

ubuntu2204: Setting up ubuntu-pro-client-l10n (34\~22.04) ...

ubuntu2204: Setting up landscape-common (23.02-0ubuntu1\~22.04.3) ...

ubuntu2204: Setting up apport (2.20.11-0ubuntu82.6) ...

ubuntu2204: apport-autoreport.service is a disabled or a static unit, not starting it. ubuntu2204: Setting up ubuntu-advantage-tools (34\~22.04) ...

ubuntu2204: Setting up ubuntu-minimal (1.481.4) ...

ubuntu2204: Setting up linux-image-5.15.0-131-generic (5.15.0-131.141) ... ubuntu2204: I: /boot/vmlinuz is now a symlink to vmlinuz-5.15.0-131-generic ubuntu2204: I: /boot/initrd.img is now a symlink to initrd.img-5.15.0-131-generic ubuntu2204: Setting up linux-modules-extra-5.15.0-131-generic (5.15.0-131.141) ... ubuntu2204: Setting up linux-modules-5.15.0-131-generic (5.15.0-131.141) ... ubuntu2204: Setting up linux-image-generic (5.15.0.131.129) ...

ubuntu2204: Processing triggers for initramfs-tools (0.140ubuntu13.4) ... ubuntu2204: update-initramfs: Generating /boot/initrd.img-5.15.0-92-generic ubuntu2204: find: ‘/var/tmp/mkinitramfs\_yYir6d/lib/firmware’: No such file or directory ubuntu2204: Processing triggers for libc-bin (2.35-0ubuntu3.9) ...

ubuntu2204: Processing triggers for rsyslog (8.2112.0-2ubuntu2.2) ...

ubuntu2204: Processing triggers for ufw (0.36.1-4ubuntu0.1) ...

ubuntu2204: Processing triggers for man-db (2.10.2-1) ...

ubuntu2204: Processing triggers for plymouth-theme-ubuntu-text (0.9.5+git20211018-1ubuntu3) ...

ubuntu2204: update-initramfs: deferring update (trigger activated)

ubuntu2204: Processing triggers for dbus (1.12.20-2ubuntu4.1) ...

ubuntu2204: Processing triggers for install-info (6.8-4build1) ...

ubuntu2204: Processing triggers for ca-certificates (20240203\~22.04.1) ... ubuntu2204: Updating certificates in /etc/ssl/certs...

ubuntu2204: 0 added, 0 removed; done.

ubuntu2204: Running hooks in /etc/ca-certificates/update.d...

ubuntu2204: done.

ubuntu2204: Processing triggers for linux-image-5.15.0-131-generic (5.15.0-131.141) ... ubuntu2204: /etc/kernel/postinst.d/initramfs-tools:

ubuntu2204: update-initramfs: Generating /boot/initrd.img-5.15.0-131-generic ubuntu2204: find: ‘/var/tmp/mkinitramfs\_5XGCYr/lib/firmware’: No such file or directory ubuntu2204: /etc/kernel/postinst.d/zz-update-grub:

ubuntu2204: Sourcing file \`/etc/default/grub'

ubuntu2204: Sourcing file \`/etc/default/grub.d/init-select.cfg'

ubuntu2204: Generating grub configuration file ...

ubuntu2204: Found linux image: /boot/vmlinuz-5.15.0-131-generic

ubuntu2204: Found initrd image: /boot/initrd.img-5.15.0-131-generic

ubuntu2204: Found linux image: /boot/vmlinuz-5.15.0-92-generic

ubuntu2204: Found initrd image: /boot/initrd.img-5.15.0-92-generic
ubuntu2204: Warning: os-prober will not be executed to detect other bootable partitions. ubuntu2204: Systems on them will not be added to the GRUB boot configuration. ubuntu2204: Check GRUB\_DISABLE\_OS\_PROBER documentation entry.

ubuntu2204: Adding boot menu entry for UEFI Firmware Settings ...

ubuntu2204: done

ubuntu2204: Processing triggers for initramfs-tools (0.140ubuntu13.4) ... ubuntu2204: update-initramfs: Generating /boot/initrd.img-5.15.0-131-generic ubuntu2204: find: ‘/var/tmp/mkinitramfs\_YVSxrD/lib/firmware’: No such file or directory ubuntu2204:

ubuntu2204: Pending kernel upgrade\!

ubuntu2204:

ubuntu2204: Running kernel version:

ubuntu2204: 5.15.0-92-generic

ubuntu2204:

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 16/

ubuntu2204: Diagnostics:

ubuntu2204: The currently running kernel version is not the expected kernel version 5.15.0-
131-generic.

ubuntu2204:

ubuntu2204: Restarting the system to load the new kernel will not be handled automatically,
so you should consider rebooting. \[Return\]

ubuntu2204:

ubuntu2204: Services to be restarted:

ubuntu2204: systemctl restart cron.service

ubuntu2204: systemctl restart irqbalance.service

ubuntu2204: systemctl restart multipathd.service
ubuntu2204: systemctl restart open-vm-tools.service

ubuntu2204: systemctl restart polkit.service

ubuntu2204: systemctl restart systemd-journald.service

ubuntu2204: /etc/needrestart/restart.d/systemd-manager

ubuntu2204: systemctl restart systemd-networkd.service

ubuntu2204: systemctl restart systemd-resolved.service

ubuntu2204: systemctl restart systemd-timesyncd.service

ubuntu2204: systemctl restart systemd-udevd.service

ubuntu2204: systemctl restart udisks2.service

ubuntu2204:

ubuntu2204: Service restarts being deferred:

ubuntu2204: /etc/needrestart/restart.d/dbus.service

ubuntu2204: systemctl restart getty@tty1.service

ubuntu2204: systemctl restart networkd-dispatcher.service

ubuntu2204: systemctl restart systemd-logind.service

ubuntu2204: systemctl restart user@1000.service

ubuntu2204:

ubuntu2204: No containers need to be restarted.

ubuntu2204:

ubuntu2204: No user sessions are running outdated binaries.

ubuntu2204:

ubuntu2204: No VM guests are running outdated hypervisor (qemu) binaries on this host.

ubuntu2204:

ubuntu2204: \# Add user 'ss' with password 'example'

ubuntu2204: \# Note: Storing passwords in plain text in scripts is not secure.

ubuntu2204: \# This is for demonstration purposes only.
ubuntu2204:

ubuntu2204: sudo useradd \-m \-s /bin/bash 52pickup

ubuntu2204: \++ sudo useradd \-m \-s /bin/bash 52pickup

ubuntu2204: echo "52pickup:example123\!" | sudo chpasswd

ubuntu2204: \++ sudo chpasswd

ubuntu2204: \++ echo 'ss:example123\!'

ubuntu2204:

ubuntu2204: \# Optionally, add the user to sudoers to give admin privileges

ubuntu2204: echo "52pickup ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/52pickup

ubuntu2204: \++ sudo tee /etc/sudoers.d/52pickup

ubuntu2204: \++ echo 52pickup ALL=(ALL) NOPASSWD: ALL'

ubuntu2204: ss ALL=(ALL) NOPASSWD: ALL

ubuntu2204:

ubuntu2204: apt install ansible git \-y

ubuntu2204: \++ apt install ansible git \-y

ubuntu2204:

ubuntu2204: WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

ubuntu2204:

ubuntu2204: Reading package lists...

ubuntu2204: Building dependency tree...

ubuntu2204: Reading state information...
ubuntu2204: git is already the newest version (1:2.34.1-1ubuntu1.12).

ubuntu2204: The following additional packages will be installed:

ubuntu2204: ieee-data python3-argcomplete python3-dnspython python3-jmespath

ubuntu2204: python3-kerberos python3-libcloud python3-lockfile python3-netaddr

ubuntu2204: python3-ntlm-auth python3-pycryptodome python3-requests-kerberos

ubuntu2204: python3-requests-ntlm python3-requests-toolbelt python3-selinux

ubuntu2204: python3-simplejson python3-winrm python3-xmltodict

ubuntu2204: Suggested packages:

ubuntu2204: cowsay sshpass python3-sniffio python3-trio python-lockfile-doc ipython3

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 17/
ubuntu2204: python-netaddr-docs

ubuntu2204: The following NEW packages will be installed:

ubuntu2204: ansible ieee-data python3-argcomplete python3-dnspython python3-jmespath ubuntu2204: python3-kerberos python3-libcloud python3-lockfile python3-netaddr ubuntu2204: python3-ntlm-auth python3-pycryptodome python3-requests-kerberos

ubuntu2204: python3-requests-ntlm python3-requests-toolbelt python3-selinux

ubuntu2204: python3-simplejson python3-winrm python3-xmltodict

ubuntu2204: 0 upgraded, 18 newly installed, 0 to remove and 0 not upgraded.

ubuntu2204: Need to get 22.8 MB of archives.

ubuntu2204: After this operation, 243 MB of additional disk space will be used.

ubuntu2204: Get:1 http://ports.ubuntu.com/ubuntu-ports jammy-updates/main arm64 python3- pycryptodome arm64 3.1~~1.0+dfsg1-3ubuntu0.1 \[1,034 kB\]~~

ubuntu2204: Get:2 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-dnspython all 2.1.0-1ubuntu1 \[123 kB~~\]~~

ubuntu2204: Get:3 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 ieee-data all 20210605.1 \[1,887 kB\]

ubuntu2204: Get:4 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-netaddr all 0.8.0-2 \[309 kB\]

ubuntu2204: Get:5 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 ansible all 2.10.7+merged+base+2.10.8+dfsg-1 ~~\[17.5 MB\]~~

ubuntu2204: Get:6 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3- argcomplete all 1.8.1-~~1.5 \[27.2 kB\]~~

ubuntu2204: Get:7 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-jmespath all 0.10.0-1 \[21.7 kB\]

ubuntu2204: Get:8 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3-kerberos arm64 1.1.14-3.1build5 ~~\[22.6 kB\]~~

ubuntu2204: Get:9 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-lockfile all 1:0.12.2-2.2 \[14.6 kB\]

ubuntu2204: Get:10 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-simplejson arm64 3.17.6-1build1 \[5~~4.2 kB\]~~

ubuntu2204: Get:11 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3-libcloud all 3.2.0-2 \[1,554 kB\]

ubuntu2204: Get:12 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3-ntlm auth all 1.4.0-1 \[20.4 ~~kB\]~~

ubuntu2204: Get:13 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3- requests-kerberos all 0~~.12.0-2 \[11.9 kB\]~~

ubuntu2204: Get:14 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3- requests-ntlm all 1.1.0~~\-1.1 \[6,160 B\]~~

ubuntu2204: Get:15 http://ports.ubuntu.com/ubuntu-ports jammy/main arm64 python3-requests toolbelt all 0.9.1-1 \[3~~8.0 kB\]~~

ubuntu2204: Get:16 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3-selinux arm64 3.3-1build2 \[154 ~~kB\]~~

ubuntu2204: Get:17 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3- xmltodict all 0.12.0-2 ~~\[12.6 kB\]~~

ubuntu2204: Get:18 http://ports.ubuntu.com/ubuntu-ports jammy/universe arm64 python3-winrm all 0.3.0-2 \[21.7 kB\]

ubuntu2204: dpkg-preconfigure: unable to re-open stdin: No such file or directory ubuntu2204: Fetched 22.8 MB in 1min 2s (368 kB/s)

ubuntu2204: Selecting previously unselected package python3-pycryptodome.

(Reading database ... 55023 files and directories currently installed.)

ubuntu2204: Preparing to unpack .../00-python3-pycryptodome\_3.11.0+dfsg1-3ubuntu0.1\_arm64.deb ...

ubuntu2204: Unpacking python3-pycryptodome (3.11.0+dfsg1-3ubuntu0.1) ...

ubuntu2204: Selecting previously unselected package python3-dnspython.
ubuntu2204: Preparing to unpack .../01-python3-dnspython\_2.1.0-1ubuntu1\_all.deb ... ubuntu2204: Unpacking python3-dnspython (2.1.0-1ubuntu1) ...

ubuntu2204: Selecting previously unselected package ieee-data.

ubuntu2204: Preparing to unpack .../02-ieee-data\_20210605.1\_all.deb ...

ubuntu2204: Unpacking ieee-data (20210605.1) ...

ubuntu2204: Selecting previously unselected package python3-netaddr.

ubuntu2204: Preparing to unpack .../03-python3-netaddr\_0.8.0-2\_all.deb ... ubuntu2204: Unpacking python3-netaddr (0.8.0-2) ...

ubuntu2204: Selecting previously unselected package ansible.

ubuntu2204: Preparing to unpack .../04-ansible\_2.10.7+merged+base+2.10.8+dfsg-1\_all.deb ... ubuntu2204: Unpacking ansible (2.10.7+merged+base+2.10.8+dfsg-1) ...

ubuntu2204: Selecting previously unselected package python3-argcomplete.

ubuntu2204: Preparing to unpack .../05-python3-argcomplete\_1.8.1-1.5\_all.deb ... ubuntu2204: Unpacking python3-argcomplete (1.8.1-1.5) ...

ubuntu2204: Selecting previously unselected package python3-jmespath.

ubuntu2204: Preparing to unpack .../06-python3-jmespath\_0.10.0-1\_all.deb ... ubuntu2204: Unpacking python3-jmespath (0.10.0-1) ...

ubuntu2204: Selecting previously unselected package python3-kerberos.

ubuntu2204: Preparing to unpack .../07-python3-kerberos\_1.1.14-3.1build5\_arm64.deb ...

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 18/

ubuntu2204: Unpacking python3-kerberos (1.1.14-3.1build5) ...

ubuntu2204: Selecting previously unselected package python3-lockfile.

ubuntu2204: Preparing to unpack .../08-python3-lockfile\_1%3a0.12.2-2.2\_all.deb ...

ubuntu2204: Unpacking python3-lockfile (1:0.12.2-2.2) ...

ubuntu2204: Selecting previously unselected package python3-simplejson.

ubuntu2204: Preparing to unpack .../09-python3-simplejson\_3.17.6-1build1\_arm64.deb ...

ubuntu2204: Unpacking python3-simplejson (3.17.6-1build1) ...

ubuntu2204: Selecting previously unselected package python3-libcloud.

ubuntu2204: Preparing to unpack .../10-python3-libcloud\_3.2.0-2\_all.deb ...

ubuntu2204: Unpacking python3-libcloud (3.2.0-2) ...

ubuntu2204: Selecting previously unselected package python3-ntlm-auth.
ubuntu2204: Preparing to unpack .../11-python3-ntlm-auth\_1.4.0-1\_all.deb ...

ubuntu2204: Unpacking python3-ntlm-auth (1.4.0-1) ...

ubuntu2204: Selecting previously unselected package python3-requests-kerberos.

ubuntu2204: Preparing to unpack .../12-python3-requests-kerberos\_0.12.0-2\_all.deb ...

ubuntu2204: Unpacking python3-requests-kerberos (0.12.0-2) ...

ubuntu2204: Selecting previously unselected package python3-requests-ntlm.

ubuntu2204: Preparing to unpack .../13-python3-requests-ntlm\_1.1.0-1.1\_all.deb ...

ubuntu2204: Unpacking python3-requests-ntlm (1.1.0-1.1) ...

ubuntu2204: Selecting previously unselected package python3-requests-toolbelt.

ubuntu2204: Preparing to unpack .../14-python3-requests-toolbelt\_0.9.1-1\_all.deb ...

ubuntu2204: Unpacking python3-requests-toolbelt (0.9.1-1) ...

ubuntu2204: Selecting previously unselected package python3-selinux.

ubuntu2204: Preparing to unpack .../15-python3-selinux\_3.3-1build2\_arm64.deb ...

ubuntu2204: Unpacking python3-selinux (3.3-1build2) ...

ubuntu2204: Selecting previously unselected package python3-xmltodict.

ubuntu2204: Preparing to unpack .../16-python3-xmltodict\_0.12.0-2\_all.deb ...

ubuntu2204: Unpacking python3-xmltodict (0.12.0-2) ...

ubuntu2204: Selecting previously unselected package python3-winrm.

ubuntu2204: Preparing to unpack .../17-python3-winrm\_0.3.0-2\_all.deb ...

ubuntu2204: Unpacking python3-winrm (0.3.0-2) ...

ubuntu2204: Setting up python3-lockfile (1:0.12.2-2.2) ...

ubuntu2204: Setting up python3-requests-toolbelt (0.9.1-1) ...
ubuntu2204: Setting up python3-ntlm-auth (1.4.0-1) ...

ubuntu2204: Setting up python3-pycryptodome (3.11.0+dfsg1-3ubuntu0.1) ...

ubuntu2204: Setting up python3-kerberos (1.1.14-3.1build5) ...

ubuntu2204: Setting up python3-simplejson (3.17.6-1build1) ...

ubuntu2204: Setting up python3-xmltodict (0.12.0-2) ...

ubuntu2204: Setting up python3-jmespath (0.10.0-1) ...

ubuntu2204: Setting up python3-requests-kerberos (0.12.0-2) ...

ubuntu2204: Setting up ieee-data (20210605.1) ...

ubuntu2204: Setting up python3-dnspython (2.1.0-1ubuntu1) ...

ubuntu2204: Setting up python3-selinux (3.3-1build2) ...

ubuntu2204: Setting up python3-argcomplete (1.8.1-1.5) ...

ubuntu2204: Setting up python3-requests-ntlm (1.1.0-1.1) ...

ubuntu2204: Setting up python3-libcloud (3.2.0-2) ...

ubuntu2204: Setting up python3-netaddr (0.8.0-2) ...

ubuntu2204: Setting up python3-winrm (0.3.0-2) ...

ubuntu2204: Setting up ansible (2.10.7+merged+base+2.10.8+dfsg-1) ...

ubuntu2204: Processing triggers for man-db (2.10.2-1) ...

ubuntu2204:

ubuntu2204: Pending kernel upgrade\!

ubuntu2204:

ubuntu2204: Running kernel version:
ubuntu2204: 5.15.0-92-generic

ubuntu2204:

ubuntu2204: Diagnostics:

ubuntu2204: The currently running kernel version is not the expected kernel version 5.15.0-
131-generic.

ubuntu2204:

ubuntu2204: Restarting the system to load the new kernel will not be handled automatically,
so you should consider rebooting. \[Return\]

ubuntu2204:

ubuntu2204: Services to be restarted:

ubuntu2204: systemctl restart cron.service

ubuntu2204: systemctl restart irqbalance.service

ubuntu2204: systemctl restart multipathd.service

ubuntu2204: systemctl restart open-vm-tools.service

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 19/

ubuntu2204: systemctl restart polkit.service

ubuntu2204: systemctl restart systemd-journald.service

ubuntu2204: /etc/needrestart/restart.d/systemd-manager

ubuntu2204: systemctl restart systemd-networkd.service

ubuntu2204: systemctl restart systemd-resolved.service

ubuntu2204: systemctl restart systemd-timesyncd.service

ubuntu2204: systemctl restart systemd-udevd.service

ubuntu2204: systemctl restart udisks2.service

ubuntu2204:

ubuntu2204: Service restarts being deferred:

ubuntu2204: /etc/needrestart/restart.d/dbus.service

ubuntu2204: systemctl restart getty@tty1.service

ubuntu2204: systemctl restart networkd-dispatcher.service

ubuntu2204: systemctl restart systemd-logind.service

ubuntu2204: systemctl restart user@1000.service

ubuntu2204:

ubuntu2204: No containers need to be restarted.

ubuntu2204:

ubuntu2204: No user sessions are running outdated binaries.

ubuntu2204:

ubuntu2204: No VM guests are running outdated hypervisor (qemu) binaries on this host.

ubuntu2204:

ubuntu2204: echo "\>\>\>\>\>\>\>\>\>\>\>\>\>\>\>\> Running Ansible Playbook"

ubuntu2204: \++ echo '\>\>\>\>\>\>\>\>\>\>\>\>\>\>\>\> Running Ansible Playbook'

ubuntu2204: \>\>\>\>\>\>\>\>\>\>\>\>\>\>\>\> Running Ansible Playbook

ubuntu2204: pushd /vagrant

ubuntu2204: \++ pushd /vagrant

ubuntu2204: /vagrant /home/vagrant

ubuntu2204: ansible-playbook \-K local\_playbook.yml

ubuntu2204: \++ ansible-playbook \-K local\_playbook.yml

ubuntu2204: /usr/lib/python3.10/getpass.py:91: GetPassWarning: Can not control echo on the
terminal.

ubuntu2204: passwd \= fallback\_getpass(prompt, stream)

ubuntu2204: Warning: Password input may be echoed.

ubuntu2204: BECOME password:

ubuntu2204: \[WARNING\]: No inventory was parsed, only implicit localhost is available

ubuntu2204: \[WARNING\]: provided hosts list is empty, only localhost is available. Note that
ubuntu2204: the implicit localhost does not match 'all'

ubuntu2204:

ubuntu2204: PLAY \[Run the playbook tasks on the localhost from the /vagrant folder\] \*\*\*\*\*\*\*\*

ubuntu2204:

ubuntu2204: TASK \[Gathering Facts\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: ok: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Create group\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Ensure 52pickup user is present\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Install prerequisite packages\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Install additional packages\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Install Python Docker module\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]
ubuntu2204:

ubuntu2204: TASK \[Create directory /home/ss/code\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204: \[WARNING\]: Consider using the file module with state=directory rather than

ubuntu2204: running 'mkdir'. If you need to use command because file is insufficient you

ubuntu2204: can add 'warn: false' to this command task or set 'command\_warnings=False' in

ubuntu2204: ansible.cfg to get rid of this message.

ubuntu2204:

ubuntu2204: PLAY RECAP \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 20/

ubuntu2204: 127.0.0.1 : ok=7 changed=6 unreachable=0 failed=0
skipped=0 rescued=0 ignored=0

ubuntu2204:

ubuntu2204: ansible-playbook \-K local\_playbook\_docker.yml

ubuntu2204: \++ ansible-playbook \-K local\_playbook\_docker.yml

ubuntu2204: /usr/lib/python3.10/getpass.py:91: GetPassWarning: Can not control echo on the
terminal.

ubuntu2204: passwd \= fallback\_getpass(prompt, stream)

ubuntu2204: Warning: Password input may be echoed.

ubuntu2204: BECOME password: \[WARNING\]: No inventory was parsed, only implicit localhost is
available
ubuntu2204: \[WARNING\]: provided hosts list is empty, only localhost is available. Note that

ubuntu2204: the implicit localhost does not match 'all'

ubuntu2204:

ubuntu2204: PLAY \[Run the playbook tasks on the localhost from the /vagrant folder\] \*\*\*\*\*\*\*\*

ubuntu2204:

ubuntu2204: TASK \[Gathering Facts\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: ok: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Install aptitude\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Install required system packages\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Add Docker GPG apt Key\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Add Docker Repository\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Update apt and install docker-ce\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]
ubuntu2204:

ubuntu2204: TASK \[Install Docker Module for Python\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: ok: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Create cli-plugins folder for docker-compose\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: TASK \[Download and install docker-compose\] \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: changed: \[127.0.0.1\]

ubuntu2204:

ubuntu2204: PLAY RECAP \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

ubuntu2204: 127.0.0.1 : ok=9 changed=7 unreachable=0 failed=0
skipped=0 rescued=0 ignored=0

ubuntu2204:

ubuntu2204: popd

ubuntu2204: \++ popd

ubuntu2204: /home/vagrant

ubuntu2204: \>\>\>\>\>\>\>\>\>\>\>\>\>\>\>\> Rebooting the system

ubuntu2204:

ubuntu2204: echo "\>\>\>\>\>\>\>\>\>\>\>\>\>\>\>\> Rebooting the system"

ubuntu2204: \++ echo '\>\>\>\>\>\>\>\>\>\>\>\>\>\>\>\> Rebooting the system'
ubuntu2204: reboot

ubuntu2204: \++ reboot

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 21/

filepathsourcedoc={42efec84-fbdf-4717-9d69-29c4a6bb302c… 22/

[image1]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image2]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image3]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image4]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image5]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image6]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image7]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image8]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image9]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image10]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image11]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image12]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image13]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image14]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
[image15]: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR4XmNgAAIAAAUAAQYUdaMAAAAASUVORK5CYII=
