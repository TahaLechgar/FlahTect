import DashboardLayout from "../Layouts/DashboardLayout";
import MOCK_DATA from "../components/MOCK_DATA.json";
import {useEffect, useMemo} from "react";
import {useState} from "react";
import Table from "../components/Dashboard/Table";
import AddRDV from "../components/Dashboard/Client/AddRDV";
import UpdateRDV from "../components/Dashboard/Client/UpdateRDV";


const ClientDashboard = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [rdvData, setRdvData] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:2001/api/clients', {
            method: 'GET'
        }).then(response => response.json())
            .then(json => {
                setIsLoading(false)
                setRdvData(json.data)
                console.log(json.data)
            })
    }, [])



    const columns = useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id', // accessor is the "key" in the data
            },
            {
                Header: 'Date',
                accessor: 'first_name',
            },
            {
                Header: 'Time',
                accessor: 'last_name',
            }
            ,
            {
                Header: 'Subject',
                accessor: 'email',
            }

        ],
        []
    )

    const data = useMemo(
        () => MOCK_DATA,
        []
    )

    const [formToggle, setFormToggle] = useState(true)

    const addHandler = () => {
        setFormToggle(true)
    }
    const updateHandler = () => {
        setFormToggle(false)
    }




    return (
        <div>

            <DashboardLayout>
                {formToggle ? <AddRDV /> : <UpdateRDV />}
                <Table onAdd={addHandler} onUpdate={updateHandler} columns={columns} data={data} />
            </DashboardLayout>

        </div>
    );
};

export default ClientDashboard;