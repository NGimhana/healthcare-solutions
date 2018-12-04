#!/bin/bash

. ./startup.properties
	
echo -e "[WSO2 EI]Stopping WSO2 Enterprise Integrator Server .."
nohup sh ${EI_HOME}/bin/integrator.sh --stop > /dev/null 2>&1 &
sleep 5s

echo -e "[WSO2 APIM]Stopping WSO2 API Manager Server .."
nohup sh ${APIM_HOME}/bin/wso2server.sh --stop > /dev/null 2>&1 &
sleep 5s

echo -e "Servers are stopped";

echo "WSO2 Healthcare API Platform Stopped !!"
