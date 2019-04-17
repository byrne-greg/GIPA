#!/bin/bash

# verify that the required Cloud Foundry variables are set
invocation_error=0

# - APP_NAME: IBM Cloud App Name
if [ -z ${APP_NAME+x} ]; then echo 'Error: Environment variable APP_NAME is undefined.'; invocation_error=1; fi
echo 'APP_NAME set'
# - BXIAM: IBM Cloud API key
if [ -z ${BXIAM+x} ]; then echo 'Error: Environment variable BXIAM is undefined.'; invocation_error=1; fi
echo 'BXIAM set'
# - CF_ORGANIZATION: IBM Cloud/Cloud Foundry organization name
if [ -z ${CF_ORGANIZATION+x} ]; then echo 'Error: Environment variable CF_ORGANIZATION is undefined.'; invocation_error=1; fi
echo 'CF_ORGANIZATION set'
# - CF_SPACE: IBM Cloud/Cloud Foundry space name
if [ -z ${CF_SPACE+x} ]; then echo 'Error: Environment variable CF_SPACE is undefined.'; invocation_error=1; fi
echo 'CF_SPACE set'

# set optional Cloud Foundry variables if they are not set
# - CF_API: IBM Cloud API endpoint (default to US-South region)
if [ -z ${CF_API+x} ]; then export CF_API='https://api.ng.bluemix.net'; fi
echo 'CF_API set'

if [ ${invocation_error} -eq 1 ]; then echo 'Something went wrong, check for previous errors.'; exit 1; fi

# login and set target
ibmcloud config --check-version false
ibmcloud api $CF_API
ibmcloud login --apikey $BXIAM
ibmcloud target -o $CF_ORGANIZATION -s $CF_SPACE
ibmcloud cf push $APP_NAME
