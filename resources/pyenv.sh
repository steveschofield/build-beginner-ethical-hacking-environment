# This script installs pyenv and Python 3.13.0 on a Linux system.
# It also sets up the necessary environment variables and shell configuration.
# Usage: Run this script in a terminal to install pyenv and Python 3.13.0.
# Ensure the script is run with bash
# and that the user has the necessary permissions to install software.
# Check if the script is being run with bash

curl https://pyenv.run | bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
echo 'eval "$(pyenv init - bash)"' >> ~/.profile
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.profile
source ~/.profile
pyenv install 3.13.0