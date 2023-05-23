import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [bmiData, setBmiData] = useState({
    height: "",
    weight: "",
    bmi: "",
    message: "",
  });

  const calcBMI = (e) => {
    e.preventDefault();

    const { height, weight } = bmiData;

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
      setBmiData((prevData) => ({
        ...prevData,
        bmi: bmi.toFixed(1),
      }));

      if (bmi < 18) {
        setBmiData((prevData) => ({
          ...prevData,
          message: "You are underweight",
        }));
      } else if (bmi > 18 && bmi < 25) {
        setBmiData((prevData) => ({
          ...prevData,
          message: "Yor are a helthy weight",
        }));
      } else {
        setBmiData((prevData) => ({
          ...prevData,
          message: "You are overweight",
        }));
      }
    }
  };

  const reload = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reload the page?",
    );
    if (confirmed) {
      window.location.reload();
    }
  };

  return (
    <div className="App">
      <div className="container center">
        <h2>BMI Calculator</h2>
        <form onSubmit={calcBMI}>
          <div>
            <label>Height (cm)</label>
            <input
              type="text"
              value={bmiData.height}
              onChange={(e) =>
                setBmiData((prevData) => ({
                  ...prevData,
                  height: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Weight (kg)</label>
            <input
              type="text"
              value={bmiData.weight}
              onChange={(e) =>
                setBmiData((prevData) => ({
                  ...prevData,
                  weight: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <button className="btn">Submit</button>
            <img
              className="reload-btn"
              src="reload.png"
              alt="reload"
              onClick={reload}
            />
          </div>
        </form>
        <div className="center">
          <h3>Your BMI is: {bmiData.bmi}</h3>
          <p>Result: {bmiData.message}</p>
        </div>
        <ToastContainer className="toast" />
      </div>
    </div>
  );
}

export default App;
