import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "@material-ui/core/Button/Button";
import {axiosInstance} from "../constants/constants";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class SimpleExpansionPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertData: [],
        }
    }

    componentDidMount() {

        this.timer = setInterval(
            () => this.increment(),
            1000
        )





    }

    increment(){
        axiosInstance.get("/DiagnosticAlertDataService/allreports")
            .then(res => {
                this.setState({
                    alertData: res.data["Reports"]["Report"],
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {classes} = this.props;
        {/*<li>{order.patient.patientName}</li>*/}
        let listItems = this.state.alertData.map((report) =>

            <div className={classes.root}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>{report.reportTitle} </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Patient Name&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{report.patient.patientName} &nbsp;</strong><br/>
                            Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{report.patient.gender}</strong><br/>
                        </Typography>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            More
                        </Button>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
        return (
            <div className={classes.root}>
                <ul>{listItems}</ul>
            </div>
        );
    }

}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);