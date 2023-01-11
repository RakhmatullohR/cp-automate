set -eu -o pipefail

readonly DEPLOY_USER_HOME=/home/ubuntu

cd "$DEPLOY_USER_HOME/relay-automate/deploy"

source "$DEPLOY_USER_HOME/.nvm/nvm.sh"
source "$DEPLOY_USER_HOME/.profile"
source "$DEPLOY_USER_HOME/.bashrc"

# install dependencies
npm install -g yarn
npm install -g pm2
#yarn global add pm2
#echo 'export PATH="$PATH:$(yarn global bin)"' >> ~/.bashrc
