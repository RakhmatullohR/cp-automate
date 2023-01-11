set -eu -o pipefail

readonly DEPLOY_USER_HOME=/home/ubuntu

cd "$DEPLOY_USER_HOME/relay-automate/deploy"

source "$DEPLOY_USER_HOME/.nvm/nvm.sh"
source "$DEPLOY_USER_HOME/.profile"
source "$DEPLOY_USER_HOME/.bashrc"

#yarn build
#lsof -i tcp:5001 | awk 'NR!=1 {print $2}' | xargs kill
#port="5001"
#pid=$(lsof -wni tcp:$port | awk 'NR==2 { print $2 }')
#if [ -n "${pid}" ]; then
#  kill -9 $pid
#  echo "Killed process $pid"
#else
#  echo "No processes were found listening on tcp:$port"
#fi
#serve -n -s build >app.log 2>/dev/null </dev/null &
#pm2 stop relay-automate -s
#pm2 serve build 5001 --name relay-automate --spa
npm install
npm start >app.log 2>/dev/null </dev/null &