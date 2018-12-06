import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class SelectedListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 1,
            patientId : "",
        };
    }

    handleListItemClick = (event, index , patientId) => {
        this.setState({ selectedIndex: index , patientId : patientId });
        this.props.handleSelectedPatientChange(patientId);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 0}
                        onClick={event => this.handleListItemClick(event, 0 , "Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB")}
                    >
                        <ListItemText primary="John Aragount" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1 ,"")}
                    >
                        <ListItemText primary="Jessica Aragount" />
                    </ListItem>

                    <ListItem
                        button
                        selected={this.state.selectedIndex === 2}
                        onClick={event => this.handleListItemClick(event, 2)}
                    >
                        <ListItemText primary="Flapjacks Ragsdale" />
                    </ListItem>

                    <ListItem
                        button
                        selected={this.state.selectedIndex === 4}
                        onClick={event => this.handleListItemClick(event, 4)}
                    >
                        <ListItemText primary="Pancakes Ragsdale" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 5}
                        onClick={event => this.handleListItemClick(event, 5)}
                    >
                        <ListItemText primary="Waffles Ragsdale " />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 6}
                        onClick={event => this.handleListItemClick(event, 6)}
                    >
                        <ListItemText primary="Bacon Ragsdale" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedIndex === 7}
                        onClick={event => this.handleListItemClick(event, 7)}
                    >
                        <ListItemText primary="James Kirk" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

SelectedListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedListItem);

