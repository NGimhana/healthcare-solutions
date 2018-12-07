## Deployment Guide for Dockerized solution

#### Prerequisites

1. Latest Docker Distribution - [Docker installation guide](https://docs.docker.com/install/) 
2. Latest Docker Compose Distribution - [Docker Compose Installation guide](https://docs.docker.com/compose/install/)

#### Tested Platforms

* Ubuntu 16.04
* Java 1.8

>Note: This solutions is tested on Cerner Sandbox and Epic Sandbox.

#### Getting Started

1. Clone the project. `${API_HOME}= APIPlatform`.

2. Navigate to `${API_HOME}/dist/docker-products` and execute the `docker-compose up` command.

#### Deploy APIs using the provided Swagger

These steps will guide you to deploy the APIs with the provided swagger definition.

The following table contains the information about the API context and the Sandbox URL details.

|API|API Context|SandboxURL|
|-----|-----|----|
|CareProvision API|/CareProvision|http://wso2ei:8283/CareProvision|
|Devices API|/Devices|http://wso2ei:8283/Devices|
|Diagnostics API|/Diagnostics|http://wso2ei:8283/Diagnostics|
|GeneralClinical API|/GeneralClinical|http://wso2ei:8283/GeneralClinical|
|Medications API|/Medications|http://wso2ei:8283/Medications|
|Scheduling API|/Scheduling|http://wso2ei:8283/Scheduling|

1. Sign in to the WSO2 API Publisher .Use `admin` as username and password.
`https://<hostname>:9443/publisher`

2. In the APIs menu click **Add new API**

3. From the options given select **I Have an Existing API**, then select **Swagger file** and click the browse button.
select the respected swagger definition from the `${API_HOME}/src/WSO2APIMartefacts`. and click **Start Creating**.

4. Add the API context for the respective API as referring to the above table.

5. Set the API version to **1.0.0**. and once the changes are done select **Next:Implement** button.

6. Select the Endpoint type as **HTTP/REST endpoint**. and add the sandBox URL referring the above table.
    
    Ex: 
        
        Sandbox URL: http://wso2ei:8283/CareProvision
        Production URL: http://wso2ei:8283/CareProvision
        
    Then select **Next:Manage** button.
    
7. Select Transport options as **HTTPS and HTTP**. and select subscriptions Tiers as needed.

8. Then click Save and Publish button.

For further information of deploying an API, please refer [Create and Publish an API from Swagger definition](https://docs.wso2.com/display/AM260/Create+and+Publish+an+API+from+a+Swagger+Definition).

After publishing the APIs sign into the WSO2 API Store, use `admin` as username and password.
`https://<hostname>:9443/store`.

Follow the [WSO2 Quick Start Guide](https://docs.wso2.com/display/AM260/Quick+Start+Guide) to Try out the APIs.

**Sample Test data**

For the `hospitalName` parameter in the APIs refer the following table

|HospitalName|EHR system|
|---|---|
|HospitalA|Cerner|
|HospitalB|Epic|

**Diagnostics API**

The patient test data is for Diagnostic Report resource

| |HospitalA:Cerner|HospitalB:Epic|
|---|---|----|
|Patient|1316020|Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB|

Refer [Cerner Millennium](https://fhir.cerner.com/millennium/dstu2/diagnostic/diagnostic-report/#search) and [Epic FHIR](https://open.epic.com/Clinical/Report) for more test data.



