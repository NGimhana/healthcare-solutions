## Deployment  Guide

#### Prerequisites

* WSO2 EI 6.4.0
* WSO2 APIM 2.6.0

#### Tested Platforms

* Ubuntu 16.04
* Java 1.8

>Note: This solutions is tested on Cerner Sandbox and Epic Sandbox.

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
4. Once the configuration is execeuted, then run following command in the same directory (`APIPlatform/dist/bin`)

```
sh init.sh
```
#### Deploy APIs using the provided Swagger

These steps will guide you to deploy the APIs with the provided swagger definition.

The following table contains the information about the API context and the Sandbox URL details.

|API|API Context|SandboxURL|
|-----|-----|----|
|CareProvision API|/CareProvision|http://localhost:8283/CareProvision|
|Devices API|/Devices|http://localhost:8283/Devices|
|Diagnostics API|/Diagnostics|http://localhost:8283/Diagnostics|
|GeneralClinical API|/GeneralClinical|http://localhost:8283/GeneralClinical|
|Medications API|/Medications|http://localhost:8283/Medications|
|Scheduling API|/Scheduling|http://localhost:8283/Scheduling|

1. Sign in to the WSO2 API Publisher .Use `admin` as username and password.
`https://<hostname>:9443/publisher`

2. In the APIs menu click *Add new API*

3. From the options given select *I Have an Existing API*, then select *Swagger file* and click the browse button.
select the respected swagger definition from the `healthcare-solutions/APIPlatform/dist/repository/deployment/APIM_apis`. and click *Start Creating*.

4. Add the API context for the respective API as referring to the above table.

5. Set the API version to *1.0.0*. and once the changes are done select *Next:Implement* button.

6. Select the Endpoint type as *HTTP/REST endpoint*. and add the sandBox URL referring the above table.
    Then select *Next:Manage* button.
    
7. Select Transport options as *HTTPS and HTTP*. and select subscriptions Tiers as needed.

8. Then click Save and Publish button.

For further information of deploying an API, please refer [Create and Publish an API from Swagger definition](https://docs.wso2.com/display/AM260/Create+and+Publish+an+API+from+a+Swagger+Definition).

After publishing the APIs sign into the WSO2 API Store, use `admin` as username and password.
`https://<hostname>:9443/store`

Follow the [WSO2 Quick Start Guide](https://docs.wso2.com/display/AM260/Quick+Start+Guide) to Try out the APIs.









