// (server.js)
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./api"); 

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' 
}));
app.use(express.json()); 


app.use("/api", apiRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
