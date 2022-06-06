import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";


const Stats = () => {

    const [loading, setLoading] = useState<boolean>(false);

    const [dataSet, setDataSet] = useState<number[]>([]);
    const [ip, setIp] = useState<string>("");

    useEffect(() => {

        if(loading)
            return;

        setLoading(true);

        // Fetch
        fetch('https://get.geojs.io/v1/ip.json')
            .then(response => response.json()) // Transform the response in json
            .then(response => {
                console.log("RESPONSE:");
                console.log(response);

                const res = [4,5,6,7,8,9,4,5,41,55]

                setDataSet(res);
                setIp(response.ip);
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });
    })

    //https://react-bootstrap.github.io/components/alerts
    return (
        <Container>
            <div>Stats</div>

            {ip}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>value</th>
                </tr>
                </thead>
                <tbody>
                {dataSet.map((value, index) => {
                    return (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{value}</td>
                        </tr>
                    )
                })}

                </tbody>
            </Table>



        </Container>
    )
}

export default Stats;