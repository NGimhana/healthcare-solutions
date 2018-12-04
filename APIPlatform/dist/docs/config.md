## Deployment  Guide

#### Prerequisites

* WSO2 EI 6.4.0
* WSO2 APIM 2.6.0

#### Tested Platforms

* Ubuntu 16.04
* Java 1.8

#### Initial Setup

1. Get a clone from the project `APIPlatform`
2. Update the properties in the file `startup.properties` located in `APIPlatform/dist/bin/startup.properties`

```
EI_HOME=${PATH_TO_EI_HOME} 
APIM_HOME=${PATH_TO_APIM_HOME} 
```
3. Navigate to the `APIPlatform/dist/bin` directory and run the following command

```
sh configuration.sh
```
4. Once the configuration is exceuted, then run following command in the same directory (`APIPlatform/dist/bin`)

```
sh init.sh
```
#### 






