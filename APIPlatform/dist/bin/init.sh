#!/bin/bash

#Import Properties File
. ./startup.properties

echo "Starting WSO2 Healthcare API Platform...";

echo -e "Starting WSO2 Enterprice Integrator Server .."
#Start EI Server
gnome-terminal -x sh ${EI_HOME}/bin/integrator.sh & sleep 5s
#nohup sh integrator & sleep 10s

echo -e "Starting API Manager Server .."
#Start APIM server
gnome-terminal -x sh ${APIM_HOME}/bin/wso2server.sh & sleep 20s
#nohup sh apim & sleep 20s 
  
echo -e "Servers are Started"
