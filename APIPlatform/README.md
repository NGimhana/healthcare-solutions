# Health-care API Platform

##### Products: WSO2 EI 6.4.0, WSO2 APIM 2.6.0, WSO2 EI Cerner connector, WSO2 EI Epic connector.

The APIs that are exposed in this solution are given below.

1. Diagnostics API
    * Diagnostic report
    * Observation
2. Medication and Immunization API
    * Medication
    * MedicationAdministration
    * MedicationOrder
    * MedicationStatement
    * Immunization
3. Care provision API
    * CarePlan
    * Goal
4. General clinical API
    * AllergyIntolerance
    * Condition
    * Procedure
    * FamilyMemberHistory
5. Individuals API
    * Patient
    * Practitioner
    * Related Person
6. Entities API
    * Person
    * Contract
7. Devices API
    * Device
8. Patient management API
    * Encounter
9. Scheduling API
    * Appointment
    * Schedule
    * Slot
10. Documents API
    * DocumentReference
11. Structure API
    * Binary

The above APIs are categorized according to the [FHIR R2 layout](https://www.hl7.org/fhir/resourcelist.html).

For an example lets Consider Diagnostic report resource under Diagnostics API.

**Use case**- Consider a scenario where a patient needs to get access to his/her Diagnostic report from an existing electronic health record (EHR) maintained by an EHR system such as Cerner and Epic.
          Using these exposed APIs patient gets the opportunity to retrieve the Diagnostic report by providing  know parameters such as Hospital Name and  known parameters like patient Id.
          
This solution is implemented to support [Cerner Millennium EHR system](https://fhir.cerner.com/millennium/dstu2/) and [Epic FHIR](https://open.epic.com/Clinical/Report) supported EHR system.

The diagram given below depicts the process flow of the solution.

![Process Flow](docs/Architectural%20Diagrams/processFlow.png)

**Step 1:**

API calls the Diagnostic report endpoint within the WSO2 EI via the API Gateway.

Other than the parameters that are need to search the Diagnostic report, the Hospital-Name parameter too will be requested by the user. This is to identify which EHR system the hospital belongs to.

**Step 2:**

WSO2 EI captures the Hospital-Name parameter which is appended in the URL received by the Diagnostic report API.

The local registry entry stores the hospital name and the EHR system as a key-value pair.
In this scenario it is assumed that a particular hospital belongs to a single EHR system as given below.

**Local Registry Entry**

* Hospital A : Cerner
* Hospital B : Epic

Next, the value paired up with the Hospital-Name (i.e. Cerner or Epic) is returned to the WSO2 EI to validate.

validation is carried out to check where there is any EHR system specified under the given hospital name, if no system is found then a fault message is sent to the API referring to the unavailability of the EHR system.
If a system is found, then the process will continue.

The diagram below explains the process flow within the WSO2 EI
![WSO2 EI Process Flow](docs/Architectural%20Diagrams/EIProcessFlow.png)

**Step 3**

The switch mediator routes the request to the WSO2 EI Cerner connector or WSO2 EI Epic connector based on the EHR system the hospital belongs to.
Given below are sample synapse configurations which are used to fetch the Diagnostic report from EHR systems.

##### Cerner SearchDiagnosticReport:

```xml
<cerner.searchDiagnosticReport>
    <patient>{$ctx:patient}</patient>
    <subject>{$ctx:subject}</subject>
    <startDate>$ctx:startDate}</startDate>
    <endDate>{$ctx:endDate}</endDate>
    <count>{$ctx:count}</count>
</cerner.searchDiagnosticReport>
```

**Properties**

* Patient: The patient Id whose diagnostic report belongs to. 
* subject: The subject (Patient) of the report. 
* startDate[optional]: starting date of the report. 
* endDate[optional]: end date of the report. 
* count[optional]: The maximum number of results to return per page. 

##### Epic SearchDiagnosticReport
```xml
<epic.searchDiagnosticReport>
    <id>{$ctx:id}</id>
    <patient>{$ctx:patient}</patient>
    <startDate>{$ctx:startDate}</startDate>
    <endDate>{$ctx:endDate}</endDate>
</epic.searchDiagnosticReport>
```
**Properties**

* id: The logical Id of the resource. 
* patient: The patient Id whose Diagnostic report belongs to. 
* startDate: start date of the diagnostic report. 
* endDate: end date of the diagnostic report. 

**Step 4**

The sample request sent by the 2 systems are given below.

##### Sample REST request which is handled by the Cerner searchDiagnosticReport
```
{
  "base": "https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca",
  "type": "DiagnosticReport",
  "patient": "1316020",
  "count": "2"
}
```

##### Sample REST request which is handled by the Epic searchDiagnosticReport
```
{
 "base": “https://open-ic.epic.com/FHIR/api/FHIR/DSTU2/",
 "type": “DiagnosticReport",
 "patient": "Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB",
 "startDate": "2016-02-01",
 "endDate": "2016-03-01"
}
```

Based on the EHR system the response is sent back to the API via the API Gateway.