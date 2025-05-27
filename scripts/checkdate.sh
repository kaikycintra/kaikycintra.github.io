#!/bin/bash

today=$(date +"%Y-%m-%d")

if grep -q 'Last Updated:' "index.html"; then
    current_date=$(sed -nE 's/.*Last Updated: ([0-9]{4}-[0-9]{2}-[0-9]{2}).*/\1/p' index.html)
    
    if [ "$current_date" != "$today" ]; then
        echo "'Last Updated' date is old, please run changedate script"
    else
        echo "Last Updated date is already current: $today."
    fi
else
    echo "'Last Updated:' not found in index.html"
fi
