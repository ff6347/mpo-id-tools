#!/bin/bash
#found here (stackoverflow)
#http://bit.ly/1eRfzyA
#
#
#

#!/bin/bash
Progress(){
for i in $(seq $1)
do
  echo '#\r'
  sleep 0.23
done
}

BASEDIR="$( dirname "$0" )"
cd "$BASEDIR"
pwd
echo "pulling from github.com"
#filter result of git remote show with sed
git remote show origin | sed -ne 's/Fetch URL://' -e '2p'
git pull origin master
echo ""
# Progress 10
echo "updating submodules"
git submodule update
echo ""
# Progress 10
echo "pulling all submodules"
git submodule foreach git pull origin master
echo ""
echo "Updating batch-find-and-replace.jsx from submodule"
cp -rv batch-find-and-replace/release/batch-find-and-replace.jsx batch-find-and-replace.jsx
echo "I'm done. Bye bye"