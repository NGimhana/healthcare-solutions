import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Grid from "@material-ui/core/Grid/Grid";
import SimpleSteppedLineChart from "./components/SimpleSteppedLineChart";
import PropTypes from "prop-types";
import MediacardPatientNumber from "./components/MediacardPatientNumber";
import ActiveMedicationOrder from "./components/ActiveMedicationOrder";
import SimpleExpansionPanel from "./components/SimpleExpansionPanel";
import SimpleDoughnut from "./components/SimpleDoughnut";
import SimpleBarChart from "./components/SimpleBarChart";
import {withStyles} from "@material-ui/core";
import {axiosInstance, axiosInstanceEPIC} from "./constants/constants";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import { subscribeToTimer } from './api';


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
        backgroundColor: '#e96c15'
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,

    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',

    },
    chartContainer: {
        marginLeft: 5,
        marginTop: 20,
        width: "80%",
        height: "30%",
        backgroundColor: "#ffffff"

    },
    tableContainer: {
        height: 320,
    },
    doughnutChartContainer: {
        width: 470,
        height: 470,

    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },


});



class App extends Component {


    constructor(props) {
        super(props);
        this.patientData = [];

        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));



        this.state = {
            textFieldValue: '',
            searchPatientList: [],
            PatientId: '',
            myData: {},
            patientData: [],
            patientData123 :[],
            patientData123Name :'',
            pa:'',

        };
        this.handleSelectedPatientChange = this.handleSelectedPatientChange.bind(this);
        this.loadAllPatients = this.loadAllPatients.bind(this);

    }




    handleSelectedPatientChange(patientId) {
        this.setState({
            PatientId: patientId,
        });
        this.setState({
            pa: this.state.PatientId,
        });
        console.log(this.state.pa);
    }

    loadAllPatients() {
        axiosInstance.get("/RDBMSDataService/allpatients")
            .then(res => {
                this.setState({
                    patientData: res.data["Patients"]["Patient"],
                });

            })
            .catch(err => {
                console.log(err);
            });

        console.log(this.state.patientData);
    }


    searchPatients(patientName) {
        let givenName = patientName.split(" ")[0];
        let familyName = patientName.split(" ")[1];
        let patientsObject = [];
        console.log(givenName + " " + familyName);

        axiosInstanceEPIC.get("/Patient?family=" + familyName + "&given= " + givenName)
            .then(res => {
                for (let i = 0; i < res.data["total"]; i++) {
                    patientsObject.push(res.data["entry"][i]);
                }
                this.setState({searchPatientList: patientsObject})
                console.log(this.state.searchPatientList);
            })
            .catch(err => {
                console.log(err);
            });
    }


    searchPatientFunction(patientId){
        axiosInstanceEPIC.get("/Patient/"+patientId)
            .then(res=> {
                this.setState({
                    patientData123:res.data,
                })
            })
            .catch(err=>{
                console.log(err);
            })

        return this.state.patientData123
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


    handleTextFieldChange(event) {
        this.setState({
            textFieldValue: event.target.value
        });
    }


    render() {
        const {classes} = this.props;

        let listItems = this.state.searchPatientList.map((patient) =>

            <div style={{width: '50%'}}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>{patient.resource.name[0].text} </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Patient Id&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{patient.resource.id}</strong><br/>
                            Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{patient.resource.gender}</strong><br/>
                            BirthDate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{patient.resource.birthDate}</strong><br/>
                        </Typography>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => {
                            this.addPatient(patient.resource.id)
                        }}>
                            Add
                        </Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );


        let patientList = this.state.patientData.map((patient) =>

            <div style={{width: '50%'}}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}><strong>{this.searchPatientNameFunction(patient.patientId)}</strong></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Patient Id&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{patient.patientId}</strong><br/>
                            Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{this.searchPatientFunction(patient.patientId).gender}</strong><br/>
                            BirthDate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{this.searchPatientFunction(patient.patientId).birthDate}</strong><br/>
                        </Typography>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => {
                            //this.setState({PatientId:patient.EmployeeNumber})
                            this.handleSelectedPatientChange(patient.patientId)
                        }}>
                            Search
                        </Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );


        return (

            <BrowserRouter>
                <Dashboard>
                    <Switch>
                        <Route exact path={"/"} render={() =>

                            <div>
                                <Grid container spacing={8}>

                                    <Grid item xs={3}>
                                        <MediacardPatientNumber/>
                                        <br/>
                                        <ActiveMedicationOrder/>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <div className={classes.doughnutChartContainer}>
                                            {/*/!*ALERTS PANEL*!/*/}
                                            <SimpleExpansionPanel/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div className={classes.doughnutChartContainer}>
                                            <h3>Top Critical Patients on Day</h3>
                                            <SimpleDoughnut/>
                                        </div>
                                    </Grid>
                                </Grid>


                                <h3>Alerts Distribution over the Week 1/10/2018-7/10/2018</h3>
                                <SimpleBarChart/>
                                <br/>
                            </div>


                        }/>
                        <Route path={"/patients"} render={() =>

                            <div>
                                <Button
                                    variant="contained" color="primary" className={classes.button}
                                    onClick={() => {
                                        this.loadAllPatients()
                                    }}>
                                    Load Patients
                                </Button>

                                <Grid container spacing={8}>

                                    <Grid item xs={5}>
                                        <h3>Patient(s) in DB</h3>
                                        <ul>{patientList}</ul>
                                    </Grid>

                                    <Grid item xs={3}>
                                        <div className={classes.doughnutChartContainer}>
                                            {/*ALERTS PANEL*/}
                                            <SimpleSteppedLineChart selectedPatientId={this.state.pa}
                                                                    title="Potasium"/>
                                            <br/>
                                            <SimpleSteppedLineChart
                                                                    selectedPatientId={this.state.pa}
                                                                    title="Hemoglobin"/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className={classes.doughnutChartContainer}>
                                            <SimpleSteppedLineChart selectedPatientId={this.state.pa}
                                                                    title="Glucose"/>
                                            <br/>
                                            <SimpleSteppedLineChart selectedPatientId={this.state.pa}
                                                                    title="Cholesterol"/>
                                            {/*<Dou/>*/}
                                        </div>
                                    </Grid>

                                </Grid>

                            </div>
                        }/>
                        <Route path={"/addpatient"} render={() =>
                            <div>
                                <h2>Search Patient</h2>
                                <Grid container spacing={12}>
                                    <Grid item xs={10}>
                                        <TextField
                                            id="outlined-with-placeholder"
                                            label="Patient Name"
                                            placeholder="Placeholder"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            value={this.state.textFieldValue}
                                            onChange={event => this.handleTextFieldChange(event)}
                                        />
                                        <br/>
                                        <Button
                                            variant="contained" color="primary" className={classes.button}
                                            onClick={() => {
                                                this.searchPatients(this.state.textFieldValue)
                                            }}>
                                            Search
                                        </Button>
                                    </Grid>
                                </Grid>
                                <div>
                                    <h3>Available Patient(s) in EPIC</h3>
                                    <ul>{listItems}</ul>
                                </div>

                            </div>
                        }/>
                    </Switch>
                </Dashboard>
            </BrowserRouter>
        );
    }

    addPatient(patientId) {

        let patientData =
        "{  \n" +
        "   \"_postpatient\":{  \n" +
        "      \"patientId\":\"temp\",\n" +
        "      \"shouldMonitor\":1,\n" +
        "      \"EMR_PLATFORM\":\"EPIC\"\n" +
        "   }\n" +
        "}";

        let obj = JSON.parse(patientData);


        axiosInstance.post('/RDBMSDataService/patient', obj
        )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


        alert("Patient Added to DB");
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
