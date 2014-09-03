#!/bin/bash

BASEDIR="$( dirname "$0" )"
cd "$BASEDIR"
echo "This is where we are :"
pwd
echo "Moving to folder InDesign 9.0 Find-Change Queries"
cd ~/Library/Preferences/Adobe\ InDesign/Version\ 10.0/de_DE/Find-Change\ Queries/GREP/
open .
echo "we are done. Bye Bye"