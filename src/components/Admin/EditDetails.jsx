import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './EditFooter'
import Header from './EditHeader'
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';




function EditDetails(props) {
    const navigate = useNavigate();
    // let laptop = {}

    const laptop = useLocation().state;
    // const [laptop2, setlaptop2] = useState([]);

    // console.log("Hit")
    // useEffect(() => {
    //     if (props.id) {
    //         axios.get(`http://localhost:5000/products/${props.id}`).then((response) => {
    //             setlaptop2(response.data);
    //             console.log(response.data)
    //         });
    //     }
    // }, []);

    // console.log("laptop1")
    // console.log(laptop1)
    // console.log("laptop2")
    // console.log(laptop2)
    // laptop = laptop1 === null ? laptop2 : laptop1




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
    const [id, setId] = useState(laptop._id);


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
            _id: id,
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
        // console.log("post----------");
        // console.log(post);
        await axios.post("http://localhost:5000/publish", post).then((response) => {
            // console.log(response.data)
            // console.log("----------------------------\n");
            // navigate("/editLaptop", { state: response.data });
            // console.log("Done axios")
            navigate("/products");
        });

        // console.log("Done axios")
        // navigate("/products");


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