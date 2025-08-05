import DatePicker from "./Components/DatePicker";
import ListOfToken from './ListOfToken'
import { useState } from "react";
function Body() {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
      console.log("API URL:", apiUrl); // should show https://localhost:44316 
    const [isLoading,updateLoadingState] = useState(false);
    const [data,updateData] = useState({
        TokenId:0
    });
    const fethTheData = (from,to) =>{
        updateLoadingState(true);
        var requestOptions ={
            method: "GET",
        }
        fetch(`${apiUrl}/MYOBExoSync/GetToken`)
        .then((response) => response.text())
        .then((result) =>{
            const data = result ? JSON.parse(result) : [];
            if(data && data.length) {
                processTheData(data);
            }
        })
        .catch((error) => {
            console.log("error",error);
        })
        .finally(()=>{
            updateLoadingState(false);
        })
    };
    const onDateChangeApp =(from,to) => {
        fethTheData(from,to);
    };
    const processTheData = (data) =>{
        updateData({items:data});
    }
    return(
        <>
            <DatePicker onDateChange={onDateChangeApp}></DatePicker>
            <br/>
            <ListOfToken items={data.items}></ListOfToken>
        </>
    );
}
export default Body