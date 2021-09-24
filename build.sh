#!/bin/sh
echo "000"
if [[ "$1" =~ ^(test|uat|online)$ ]]; then
  export project=$1
  echo $1
else
  echo -e $ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS
  exit 1
fi


npm run test
