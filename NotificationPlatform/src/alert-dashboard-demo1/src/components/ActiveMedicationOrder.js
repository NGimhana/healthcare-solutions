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

class ActiveMedicationOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            medicationOrderData: []
        }
    }

    componentDidMount() {

        this.timer = setInterval(
            () => this.increment(),
            1000
        )

    }

    increment(){
        axiosInstance.get("/MedicationOrderDataService/allmedicationorders")
            .then(res => {
                this.setState({
                    medicationOrderData: res.data["patient"]["MedicationOrders"],
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
                            {this.state.medicationOrderData.length}
                        </Typography>
                        <Typography gutterBottom variant="headline" component="h3">
                            ACTIVE MEDICATION ORDERS !
                        </Typography>
                        <Typography component="p">
                            These are the active Medication orders .
                        </Typography>
                    </CardContent>
                </CardActionArea>

            </Card>
        );
    }
}

ActiveMedicationOrder.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActiveMedicationOrder);