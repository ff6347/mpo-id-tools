#!/bin/bash
#found here (stackoverflow)
#http://bit.ly/1eRfzyA
#
BASEDIR="$( dirname "$0" )"
cd "$BASEDIR"
pwd
echo "pulling from git"
git remote show origin
git pull origin master
echo "updating submodules"
git submodule update
echo "I'm done. Bye bye"