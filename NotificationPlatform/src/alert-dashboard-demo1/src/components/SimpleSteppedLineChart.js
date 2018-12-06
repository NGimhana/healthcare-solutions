import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {ResponsiveContainer} from "recharts";
import {axiosInstance} from "../constants/constants";

let pa='';
class SimpleSteppedLineChart extends Component {
    constructor(props) {
        super(props);
        this.getPatientsReportData = this.getPatientsReportData.bind(this);
    }


    state = {
        data: {
            labels: ['Report1', 'Report2', 'Report3', 'Report4', 'Report5'],
            datasets: [
                {
                    data: [],
                    label: 'Report Values',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10
                }
            ]
        },
};

getPatientsReportData(patientId){

    let reportValues =[];

     if (this.props.title === "Hemoglobin") {

    axiosInstance.get("/DiagnosticAlertDataService/reports/bloodhemoglobin/patient/" + patientId )
        .then(res => {

            if (res.data["Reports"]["Report"] !== undefined) {
                //console.log(res.data["Reports"]["Report"].length);
                for (let i = 0; i < res.data["Reports"]["Report"].length; i++) {
                    reportValues.push(parseFloat(res.data["Reports"]["Report"][i]["myValue"].split("g/dL")[0]));
                }
            } else {
                reportValues.splice(0, reportValues.length);
            }

            reportValues.unshift(15.5);


            const datasetsCopy = this.state.data.datasets.slice(0);
            console.log(datasetsCopy);
            datasetsCopy[0].data = reportValues;

            this.setState({
                data: Object.assign({}, this.state.data, {
                    datasets: datasetsCopy
                })
            });

            console.log(this.state.data);

        })
        .catch(err => {
            console.log(err);
        });


     }else if(this.props.title === "Potasium"){

         axiosInstance.get("/DiagnosticAlertDataService/reports/bloodpotasium/patient/" + patientId )
             .then(res => {

                 if (res.data["Reports"]["Report"] !== undefined) {
                     //console.log(res.data["Reports"]["Report"].length);
                     for (let i = 0; i < res.data["Reports"]["Report"].length; i++) {
                         reportValues.push(parseFloat(res.data["Reports"]["Report"][i]["myValue"].split("mmol/L")[0]));
                     }
                 } else {
                     reportValues.splice(0, reportValues.length);
                 }

                 reportValues.unshift(4.5);


                 const datasetsCopy = this.state.data.datasets.slice(0);
                 console.log(datasetsCopy);
                 datasetsCopy[0].data = reportValues;

                 this.setState({
                     data: Object.assign({}, this.state.data, {
                         datasets: datasetsCopy
                     })
                 });

                 console.log(this.state.data);

             })
             .catch(err => {
                 console.log(err);
             });




     }else if(this.props.title === "Glucose") {

         axiosInstance.get("/DiagnosticAlertDataService/reports/bloodglucose/patient/" + patientId )
             .then(res => {

                 if (res.data["Reports"]["Report"] !== undefined) {
                     //console.log(res.data["Reports"]["Report"].length);
                     for (let i = 0; i < res.data["Reports"]["Report"].length; i++) {
                         reportValues.push(parseFloat(res.data["Reports"]["Report"][i]["myValue"].split("mg/dL")[0]));
                     }
                 } else {
                     reportValues.splice(0, reportValues.length);
                 }

                 reportValues.unshift(125);


                 const datasetsCopy = this.state.data.datasets.slice(0);
                 console.log(datasetsCopy);
                 datasetsCopy[0].data = reportValues;

                 this.setState({
                     data: Object.assign({}, this.state.data, {
                         datasets: datasetsCopy
                     })
                 });

                 console.log(this.state.data);

             })
             .catch(err => {
                 console.log(err);
             });





     }else if(this.props.title === "Cholesterol") {

         axiosInstance.get("/DiagnosticAlertDataService/reports/bloodcholesterol/patient/" + patientId )
             .then(res => {

                 if (res.data["Reports"]["Report"] !== undefined) {
                     //console.log(res.data["Reports"]["Report"].length);
                     for (let i = 0; i < res.data["Reports"]["Report"].length; i++) {
                         reportValues.push(parseFloat(res.data["Reports"]["Report"][i]["myValue"].split("g/dL")[0]));
                     }
                 } else {
                     reportValues.splice(0, reportValues.length);
                 }

                 reportValues.unshift(200);


                 const datasetsCopy = this.state.data.datasets.slice(0);
                 console.log(datasetsCopy);
                 datasetsCopy[0].data = reportValues;

                 this.setState({
                     data: Object.assign({}, this.state.data, {
                         datasets: datasetsCopy
                     })
                 });

                 console.log(this.state.data);

             })
             .catch(err => {
                 console.log(err);
             });




     }

};


componentWillReceiveProps(selectedPatientId){
    this.getPatientsReportData(this.props.selectedPatientId);
}

render()
{

    return (
        <ResponsiveContainer width="80%" height="70%">
            <div>
                <h2>{this.props.title}</h2>
                <Line data={this.state.data}/>
            </div>
        </ResponsiveContainer>
    );
}

}


export default SimpleSteppedLineChart;