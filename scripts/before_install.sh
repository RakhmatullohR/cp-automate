set -eu -o pipefail

readonly DEPLOY_USER_HOME=/home/ubuntu

cd "$DEPLOY_USER_HOME/relay-automate/deploy"

if [[ ! -d "$DEPLOY_USER_HOME/.nvm" ]]; then
  curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh -o install_nvm.sh
  bash install_nvm.sh
fi

source "$DEPLOY_USER_HOME/.nvm/nvm.sh"
source "$DEPLOY_USER_HOME/.profile"
source "$DEPLOY_USER_HOME/.bashrc"

nvm install 14.17.3
nvm use 14.17.3
