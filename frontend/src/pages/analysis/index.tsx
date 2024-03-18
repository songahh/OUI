import { Drawer } from "src/components/control/Drawer";
import { Button } from "src/components/control/Button";
import { Header } from "src/components/control/Header";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { Switch } from "./components/Switch";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SwitchWrapper = styled(Switch)`
    display: flex;
    // justify-contents: flex-end;
    margin-left: auto;
`;

const Analysis = () => {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "First dataset",
            data: [33, 53, 85, 41, 44, 65],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
    };

    return(
        <>
            <Header>
                <Drawer></Drawer>
                <Button></Button>
                <Button></Button>
            </Header>
            <SwitchWrapper></SwitchWrapper>
            <div>
                <Line data={data} />
                <Line data={data} />
            </div>
        </>
    );

}

export default Analysis;