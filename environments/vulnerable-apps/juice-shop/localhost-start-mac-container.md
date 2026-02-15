# Use container option for MacOS natively run JuiceShop

MacOS released an option to run containers locally natively vs. using podman or docker.   Podman and Docker are mature platforms to run container locally.  

Here are instructions to install and enable MacOS container option

## Install via Brew (brew.sh) and run JuiceShop

brew install --cask container

container system start

container image pull docker.io/bkimminich/juice-shop:latest

container run -d -docker.io/bkimminich/juice-shop:latest

https://github.com/apple/container/blob/main/docs/technical-overview.md

container ls

**ID**                                    **IMAGE **                                  **OS **    **ARCH **  **STATE**    **ADDR**

**9aa3b82c-66e6-47ea-9e84-e33142120cd9**  **docker.io/bkimminich/juice-shop:latest**  **linux**  **arm64**  **running**  **192.168.64.2**

curl 192.168.64.2:3000

open firefox or chrome with controls disabled


# Troubleshooting

**Q: container image pull docker.io/bkimminich/juice-shop:latest
Error: interrupted: "XPC connection error: Connection invalid"**

A: Container service not started
