#!/bin/bash

today=$(date +"%Y-%m-%d")
sed -i -E "s/(Last Updated: )[0-9]{4}-[0-9]{2}-[0-9]{2}/\1$today/" index.html
echo "Updated 'Last Updated' to current date"