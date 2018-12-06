import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {axiosInstance} from "../constants/constants";


const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};


class MediacardPatientNumber extends Component {


    constructor(props) {
        super(props);
        this.state = {
            alertData: []
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
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const {classes} = this.props;



        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.state.alertData.length}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="h3">
                            CRITICAL ALERTS !
                        </Typography>
                        <Typography component="p">
                            These are the Alerts which require immediate responses.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

MediacardPatientNumber.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediacardPatientNumber);