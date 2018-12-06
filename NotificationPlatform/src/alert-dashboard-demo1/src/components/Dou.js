import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

class Dou extends Component {

    constructor(props){
        super(props);
        this.increment = this.increment.bind(this);
    }
    state = {
        data: {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [
                {
                data: [300, 50, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.increment(),
            1000
        )
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    increment() {
        const datasetsCopy = this.state.data.datasets.slice(0);
        console.log(datasetsCopy);
        const dataCopy = datasetsCopy[0].data.slice(0);
        dataCopy[0] = dataCopy[0] + 10;
        datasetsCopy[0].data = dataCopy;

        this.setState({
            data: Object.assign({}, this.state.data, {
                datasets: datasetsCopy
            })
        });
    }

    render(){
        return(
            <div>
                <Doughnut data = {this.state.data}/>
            </div>
        )
    }
}

export default Dou;