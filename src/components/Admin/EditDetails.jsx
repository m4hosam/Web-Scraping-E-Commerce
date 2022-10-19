import React, { useState } from 'react';
import axios from 'axios';
import Footer from './EditFooter'
import Header from './EditHeader'
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';




function EditDetails() {

    const laptop = useLocation().state;

    const [brand, setbrand] = useState(laptop.brand);
    const [name, setname] = useState(laptop.name);
    const [price, setPrice] = useState(laptop.price);
    const [model, setmodel] = useState(laptop.series);
    const [modelNo, setmodelNo] = useState(laptop.modelNo);
    const [ops, setops] = useState(laptop.ops);
    const [cpuGen, setcpuGen] = useState(laptop.cpuGen);
    const [cpuType, setcpuType] = useState(laptop.cpuType);
    const [ram, setram] = useState(laptop.ram);
    const [diskSize, setdiskSize] = useState(laptop.diskSize);
    const [diskType, setdiskType] = useState(laptop.diskType);
    const [screenSize, setscreenSize] = useState(laptop.screenSize);


    var array = [
        (childdata) => {
            setbrand(childdata);
        },
        (childdata) => {
            setname(childdata);
        },
        (childdata) => {
            setPrice(childdata);
        },
        (childdata) => {
            setmodel(childdata);
        },
        (childdata) => {
            setmodelNo(childdata);
        },
        (childdata) => {
            setops(childdata);
        },
        (childdata) => {
            setcpuType(childdata);
        },
        (childdata) => {
            setcpuGen(childdata);
        },
        (childdata) => {
            setram(childdata);
        },
        (childdata) => {
            setdiskSize(childdata);
        },
        (childdata) => {
            setdiskType(childdata);
        },
        (childdata) => {
            setscreenSize(childdata);
        }
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const post = {
            name: name,
            imgUrl: laptop.imgUrl,
            brand: brand,
            series: model,
            modelNo: modelNo,
            ops: ops,
            cpuType: cpuType,
            cpuGen: cpuGen,
            ram: ram,
            diskSize: diskSize,
            diskType: diskType,
            screenSize: screenSize,
            price: price
        };
        console.log("post----------");
        console.log(post);
        await axios.post("http://localhost:5000/publish", post);

        // navigate("/editLaptop");

    }

    return (<>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Header
                brand={laptop.brand}
                name={laptop.name}
                imgUrl={laptop.imgUrl}
                price={laptop.price}
                array={array}
            />
            <Footer
                laptop={laptop}
                array={array}
            />
            <Button type='submit' variant="contained" style={{ margin: '1rem 0' }}>Publish</Button>
        </form>

    </>
    );
}

export default EditDetails;