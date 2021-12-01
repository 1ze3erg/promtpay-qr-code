import axios from "axios";
import { useState } from "react";
import parse from "html-react-parser";
import "./App.css";

function App() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState(0);
    const [qr, setQr] = useState("");

    const createQr = async () => {
        const res = await axios.post("http://localhost:8888/create-qr", { mobileNumber: phoneNumber, amount });
        setQr(res.data);
    };

    return (
        <div>
            <label htmlFor="">Phone Number</label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="xxx-xxx-xxxx"
            />
            <label htmlFor="">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={createQr}>Create Promtpay QR code</button>
            <p>Scan QR code below to transfer</p>
            <div style={{ width: "200px" }}>{parse(qr)}</div>
            <p>Transfer to Promtpay: {phoneNumber}</p>
            <p>Amount: {amount}</p>
        </div>
    );
}

export default App;
