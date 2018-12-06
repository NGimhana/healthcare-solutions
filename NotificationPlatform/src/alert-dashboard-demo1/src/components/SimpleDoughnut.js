import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {ResponsiveContainer} from "recharts";
import {axiosInstance, axiosInstanceEPIC} from "../constants/constants";
import PropTypes from "prop-types";

let data = [];
let labelArray =[];
class SimpleDouhnut extends Component {


    constructor(props) {
        super(props);
        this.getCriticalPatients = this.getCriticalPatients.bind(this);
    }

    state = {
        alertData: [],
        labels: [],
        patientData123Name:'',
        data: {
            labels: ['Jason Argonaut ', 'Jessica Argonaut', 'Emily Williams - 1', 'Emily Williams - 2'],
            datasets: [
                {
                    data: [],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#42f41d',
                        '#ff4343'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#42f41d',
                        '#ff4343'
                    ]
                }]
        },
    };

    componentDidMount() {
        this.getCriticalPatients();
    }


    searchPatientNameFunction(patientId){
        axiosInstanceEPIC.get("/Patient/"+patientId)
            .then(res=> {
                this.setState({
                    patientData123Name:res.data.name[0].text,
                })
            })
            .catch(err=>{
                console.log(err);
            })

        return this.state.patientData123Name
    }


    getCriticalPatients() {

        let data1 = [];

        axiosInstance.get("/RDBMSDataService/allpatients")
            .then(res => {
                const patientList = res.data.Patients.Patient.splice(0);
                patientList.forEach(element => {

                    axiosInstance.get("/DiagnosticAlertDataService/reports/patient/"+element.patientId)
                        .then(res1=>{
                            data1.push(res1.data.Reports.Report.length);
                            let patientReportCount = data1.splice(0);
                            const datasetsCopy = this.state.data.datasets.slice(0);
                            datasetsCopy[0].data = patientReportCount;

                            this.setState({
                                data: Object.assign({}, this.state.data, {
                                    datasets: datasetsCopy
                                })
                            });
                        })
                        .catch(err=>{
                            console.log(err)
                        });

                });

            })
            .catch(err => {

            });

    }


    render() {

        return (
            <ResponsiveContainer width="80%" height="70%">
                <Doughnut data={this.state.data} options={{maintainAspectRatio: false}}/>
            </ResponsiveContainer>


        );
    }
}

SimpleDouhnut.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default SimpleDouhnut;