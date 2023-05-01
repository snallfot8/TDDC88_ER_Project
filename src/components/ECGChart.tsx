import "./ECGChart.css"
import ECGLead from "./ECGLead"
import { FC, Fragment, useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

// for ensuring correct read of data from API
type ECGData = {
    i: number[],
    ii: number[],
    iii: number[],
    v1: number[],
    v2: number[],
    v3: number[],
    v4: number[],
    v5: number[],
    v6: number[],
    avl: number[],
    avr: number[],
    avf: number[],
}

const ECGChart: FC = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [apiData, setECG] = useState<ECGData>();  //useState will return some type of ECGData, or undef

    useEffect(() => {
        fetch("/api/getECG")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setECG(data);  //This overrides the setECG made by useState
                setIsLoading(false);
            });

    }, []);

    //borrowed code from AllPatients, maybe not the best way but sure was the fastest way!
    return !isLoading && apiData !== undefined ? (
        
            <div className="ecg-chart">
                <div className="grid-item"> <ECGLead lead="i" mockData={apiData.i} />       </div>
                <div className="grid-item"> <ECGLead lead="avr" mockData={apiData.avr} />   </div>
                <div className="grid-item"> <ECGLead lead="v1" mockData={apiData.v1} />     </div>
                <div className="grid-item"> <ECGLead lead="v4" mockData={apiData.v4} />     </div>
                <div className="grid-item"> <ECGLead lead="ii" mockData={apiData.ii} />     </div>
                <div className="grid-item"> <ECGLead lead="avl" mockData={apiData.avl} />   </div>
                <div className="grid-item"> <ECGLead lead="v2" mockData={apiData.v2} />     </div>
                <div className="grid-item"> <ECGLead lead="v5" mockData={apiData.v5} />     </div>
                <div className="grid-item"> <ECGLead lead="iii" mockData={apiData.iii} />   </div>
                <div className="grid-item"> <ECGLead lead="avf" mockData={apiData.avf} />   </div>
                <div className="grid-item"> <ECGLead lead="v3" mockData={apiData.v3} />     </div>
                <div className="grid-item"> <ECGLead lead="v6" mockData={apiData.v6} />     </div>
            </div>
    ) : (
        <Fragment> 
            <div className="ecg-chart">
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>
                <div className="grid-item"> <Skeleton animation="wave" variant="text" width={250} height={150} /> </div>

            </div>
        </Fragment>
    );
};

export default ECGChart;