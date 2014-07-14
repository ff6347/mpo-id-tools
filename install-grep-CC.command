#!/bin/bash

BASEDIR="$( dirname "$0" )"
cd "$BASEDIR"
echo "This is where we are :"
pwd
echo "Installing InDesign 9.0 Find-Change Queries 'GREP'"
mkdir -p ~/Library/Preferences/Adobe\ InDesign/Version\ 9.0/de_DE/Find-Change\ Queries/GREP/
cp _fcqueries/mpo-grep/*.xml ~/Library/Preferences/Adobe\ InDesign/Version\ 9.0/de_DE/Find-Change\ Queries/GREP/

echo "we are done. Bye Bye"