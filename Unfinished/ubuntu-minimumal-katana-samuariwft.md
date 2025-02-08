# **Download Ubuntu ARM (or x86)**

https://ubuntu.com/download/server/arm

# **Create VM Ubuntu (Add packages)**

sudo apt update
sudo apt install net-tools
sudo apt install vim
sudo apt full-upgrade -y

sudo apt install -y build-essential libssl-dev zlib1g-dev
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

sudo reboot

# Login as root: (never do this in production, root required for this demo)

# **Add Python pre-req's**

sudo apt update
sudo apt install -y build-essential libssl-dev zlib1g-dev
libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev

# **Install pyenv**

#https://realpython.com/intro-to-pyenv/

curl https://pyenv.run | bash

# **Add this to .profile or whatever shell you use (bash or zsh)**

Adjust ~/.profile

*** For **bash**, you would add these to **~/.bashrc**.***

*** For **zsh**, you would add these to **~/.zshrc**.***

**Paste at the bottom of file**

after pasting type **source .profile**

# **WARNING****: seems you still have not added 'pyenv' to the load path.**

**# Load pyenv automatically by appending**

**# the following to**

**# ~/.bash_profile if it exists, otherwise ~/.profile (for login shells)**

**# and ~/.bashrc (for interactive shells) :**

**export PYENV_ROOT="$HOME/.pyenv"**

**[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"**

**eval "$(pyenv init - bash)"**

**# Restart your shell for the changes to take effect.**

**# Load pyenv-virtualenv automatically by adding**

**# the following to ~/.bashrc:**

**eval "$(pyenv virtualenv-init -)"**

# Activate Global scope for Python

# Install Python using Pyenv

pyenv install --list

i.e pyenv install 3.13.1

pyenv global 3.13.1

**Optional : Virtual enviornment**

pyenv virtualenv 3.13.1 katana

**Activate environment**

pyenv local katana

# Create folder for Github code in HOME folder

mkdir ~/code

# Get Katana from Github

cd ~/code

git clone https://github.com/SamuraiWTF/katana

**install Python Requirements**

cp ~/code/katana/requirements.txt ~/code/katana/test

cd ~/code/katana/test/

./provision-ubuntu.sh

**pip install --upgrade pip**

cd ..

**python katanacli.py install katana**
