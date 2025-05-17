#!/bin/bash

sudo docker pull bkimminich/juice-shop
sudo docker run -d --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop 
read -p "Press Enter to continue..."
