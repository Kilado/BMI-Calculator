import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reloadImg from "./assets/reload.png";
import "./App.css";

function App() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState("");
    const [message, setMessage] = useState("");

    const calcBMI = (e) => {
        e.preventDefault();

        if (weight.length === 0 || height.length === 0) {
            toast.error("Please enter a valid height and weight", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            const bmi = weight / (height / 100) ** 2;
            setBmi(bmi.toFixed(1));

            if (bmi < 18) {
                setMessage("You are underweight");
            } else if (bmi > 18 && bmi < 25) {
                setMessage("Yor are a helthy weight");
            } else {
                setMessage("You are overweight");
            }
        }
    };

    const reload = () => {
        window.location.reload();
    };
    return (
        <div className="App">
            <div className="container">
                <h2 className="center">BMI Calculator</h2>
                <form onSubmit={calcBMI}>
                    <div>
                        <label>Height (cm)</label>
                        <input
                            type="text"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Weight (kg)</label>
                        <input
                            type="text"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="btn">Submit</button>
                        <img
                            className="reload-btn"
                            src={reloadImg}
                            alt="reload"
                            onClick={reload}
                        />
                    </div>
                </form>
                <div className="center">
                    <h3>Your BMI is: {bmi}</h3>
                    <p>Result: {message}</p>
                </div>
            </div>
            <ToastContainer style={{ width: "430px" }} />
        </div>
    );
}

export default App;
