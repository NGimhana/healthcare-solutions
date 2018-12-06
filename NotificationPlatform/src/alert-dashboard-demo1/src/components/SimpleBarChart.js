import React, {Component} from 'react';
import ResponsiveContainer from "recharts/lib/component/ResponsiveContainer";
import {Bar} from 'react-chartjs-2';
import {axiosInstance} from "../constants/constants";


const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
            label: 'Number of Alerts',
            // backgroundColor: 'rgba(255,99,132,0.2)',
            backgroundColor: '#0eb4ff',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [100, 80, 70, 55, 60, 60, 71]
        }
    ]
};








class SimpleBarChart extends Component{


    getAllPatients(){
        
    }


    render(){
        return (
            <ResponsiveContainer width={"100%"} height={250}>
                {/*<PieChart>*/}
                {/*<Pie data={EXAMPLE_DATA} innerRadius="90%" outerRadius="100%" fill="#ff0000" paddingAngle={5} />*/}
                {/*</PieChart>*/}

                <Bar data={data}
                     width={700}
                     height={250}
                     options={{
                         maintainAspectRatio: false
                     }}/>
            </ResponsiveContainer>


        );

    }

}

export default SimpleBarChart;