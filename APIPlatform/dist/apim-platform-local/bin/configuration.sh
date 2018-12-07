#!/bin/bash

#Import Properties File
. ./startup.properties

ei_configuration(){

	#Edit offset of EI
	sed -i 's/<Offset>0<\/Offset>/<Offset>3<\/Offset>/g' ${EI_HOME}/conf/carbon.xml

	#Add json+fhir message formatters and message Builders
	cp -f ../repository/conf/axis2/axis2.xml ${EI_HOME}/conf/axis2/axis2.xml;


	#Copy CAR file to deployment server
	cp -a ../repository/deployment/server/. ${EI_HOME}/repository/deployment/server/carbonapps 

}

ei_configuration;


