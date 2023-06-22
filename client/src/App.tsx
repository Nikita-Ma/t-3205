import React, {useState} from "react";
import "./App.css";

function App() {

    const [formData, setFormData] = useState<{ email: string, number: string }>({
        email: "",
        number: "",
    });
    const [response, setResponse] = useState<{ data: any, loading: boolean }>({
        data: [],
        loading: false
    });
    const handleSubmit = (e: React.FormEvent) => {

        let abortController = new AbortController();

        async function sendRequest() {

            abortController = new AbortController();

            try {
                if (response.loading) {
                    abortController.abort()
                }
                setResponse({data: ['abort'], loading: true})
                const resData = await fetch(`http://localhost:7575/api/find-user?email=${formData.email}&number=${formData.number || 'null'}`,
                    {signal: abortController.signal});
                const dataRes = await resData.json();
                setResponse({data: dataRes, loading: false})
            } catch (error: any) {
                if (error.name === "AbortError") {
                    console.log("Request cancel");
                    setResponse({data: ["Request cancel"], loading: false})

                } else {
                    console.log("Have error", error);
                }
            }
        }

        sendRequest();

        e.preventDefault();

        setFormData({
            email: "",
            number: "",
        });
    };

    const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        const regex = /^[0-9-]+$/;

        // Guard number
        if (formData.number.split("").filter((item) => item !== "-").length % 2
            && name === "number"
            && formData.number.split("").filter((item) => item !== "-").length + 1 !== 6
            && regex.test(value)) {
            setFormData({
                ...formData,
                number: value.concat("-")
            });

        } else if (regex.test(value) && formData.number.split("").filter((item) => item !== "-").length !== 6) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        } else if (name !== "number") {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handlerInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            setFormData(prevState => ({
                ...prevState,
                number: prevState.number.slice(0, prevState.number.length - 1),
            }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" value={formData.email} name={"email"} onChange={handlerInput}
                       placeholder={"Enter email.."} required/>
                <br/>
                <input type="text" value={formData.number} name={"number"} onChange={handlerInput}
                       onKeyDown={handlerInputKeyDown}
                       placeholder={"Enter number.."}/>
                <br/>
                <button type={"submit"}>Submit</button>
            </form>
            {
                response ? response.data.map((item: any) => {
                    return (
                        <div key={item.id}>
                            <span>ID: {item.id}</span> &nbsp;
                            <span>Email: {item.email}</span> &nbsp;
                            <span>Number: {item.number}</span> &nbsp;
                            <hr/>
                        </div>)
                }) : null
            }
        </>
    );
}

export default App;
