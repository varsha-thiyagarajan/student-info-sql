const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",      
    password: "1207",      
    database: "StudentDB"
});


app.get("/student/:name",(req,res)=>
{
    const name=req.params.name
    db.query("SELECT * FROM Students WHERE Name=?",[name],(err,result)=>
    {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Student not found" });
        res.json(result[0]); 
    })


})


app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});