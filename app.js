const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Sample PMPML bus data
let buses = [
    {
        id: 1,
        number: "101",
        from: "Swargate",
        to: "Hinjewadi",
        type: "AC",
        status: "On Time"
    },
    {
        id: 2,
        number: "102",
        from: "Katraj",
        to: "Pune Station",
        type: "Non-AC",
        status: "Delayed"
    },
    {
        id: 3,
        number: "103",
        from: "Hadapsar",
        to: "Shivajinagar",
        type: "AC",
        status: "On Time"
    }
];

// Home page
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>PMPML Bus Tracker</title>

            <style>
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background: #f4f7fb;
                    color: #222;
                }

                header {
                    background: linear-gradient(135deg, #0066ff, #00b894);
                    color: white;
                    padding: 35px;
                    text-align: center;
                }

                header h1 {
                    margin: 0;
                    font-size: 35px;
                }

                .container {
                    width: 90%;
                    max-width: 1000px;
                    margin: 30px auto;
                }

                .stats {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 25px;
                }

                .stat {
                    flex: 1;
                    background: white;
                    padding: 25px;
                    border-radius: 15px;
                    text-align: center;
                    box-shadow: 0 5px 15px #ddd;
                }

                .stat h2 {
                    color: #0066ff;
                    font-size: 30px;
                }

                .buses {
                    display: grid;
                    grid-template-columns:
                        repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                }

                .bus {
                    background: white;
                    padding: 20px;
                    border-radius: 15px;
                    box-shadow: 0 5px 15px #ddd;
                }

                .bus h2 {
                    color: #0066ff;
                }

                .status {
                    display: inline-block;
                    padding: 7px 12px;
                    border-radius: 20px;
                    background: #d4edda;
                    color: #155724;
                }

                .delayed {
                    background: #fff3cd;
                    color: #856404;
                }

                @media(max-width: 600px) {
                    .stats {
                        flex-direction: column;
                    }
                }
            </style>
        </head>

        <body>

            <header>
                <h1>🚌 PMPML Live Bus Tracker</h1>
                <p>Simple Node.js Bus Management Application</p>
            </header>

            <div class="container">

                <div class="stats">

                    <div class="stat">
                        <h2>${buses.length}</h2>
                        <p>Total Buses</p>
                    </div>

                    <div class="stat">
                        <h2>
                            ${buses.filter(
                                bus => bus.status === "On Time"
                            ).length}
                        </h2>
                        <p>On Time</p>
                    </div>

                    <div class="stat">
                        <h2>
                            ${buses.filter(
                                bus => bus.status === "Delayed"
                            ).length}
                        </h2>
                        <p>Delayed</p>
                    </div>

                </div>

                <div class="buses">

                    ${buses.map(bus => `
                        <div class="bus">

                            <h2>🚌 Bus ${bus.number}</h2>

                            <p>
                                <strong>From:</strong>
                                ${bus.from}
                            </p>

                            <p>
                                <strong>To:</strong>
                                ${bus.to}
                            </p>

                            <p>
                                <strong>Type:</strong>
                                ${bus.type}
                            </p>

                            <span class="${
                                bus.status === "Delayed"
                                    ? "status delayed"
                                    : "status"
                            }">
                                ${bus.status}
                            </span>

                        </div>
                    `).join("")}

                </div>

            </div>

        </body>
        </html>
    `);
});


// Get all buses
app.get("/api/buses", (req, res) => {
    res.json({
        success: true,
        total: buses.length,
        buses: buses
    });
});


// Search bus by number
app.get("/api/buses/:number", (req, res) => {

    const bus = buses.find(
        bus => bus.number === req.params.number
    );

    if (!bus) {
        return res.status(404).json({
            success: false,
            message: "Bus not found"
        });
    }

    res.json({
        success: true,
        bus: bus
    });
});


// Add new bus
app.post("/api/buses", (req, res) => {

    const { number, from, to, type, status } = req.body;

    if (!number || !from || !to) {
        return res.status(400).json({
            success: false,
            message: "Bus number, from and to are required"
        });
    }

    const newBus = {
        id: buses.length + 1,
        number,
        from,
        to,
        type: type || "Non-AC",
        status: status || "On Time"
    };

    buses.push(newBus);

    res.status(201).json({
        success: true,
        message: "Bus added successfully",
        bus: newBus
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`🚌 PMPML Bus Tracker running on port ${PORT}`);
    console.log(`🌐 http://localhost:${PORT}`);
});