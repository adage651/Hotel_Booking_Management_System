import db from "../database/db.js";

export const create = (req, res) => {
    const { feedback,userId} =req.body;
   const query = `INSERT INTO feedback (feedback,guestId) VALUES (?,?)`;
   db.query(query, [feedback, userId], (error, results) => {
     if (error) {
       console.log(error);
       return res.status(500).json({ error: "Internal server error" });
     }
     return res.status(201).json({ message: "Feedback created successfully" });
   });
}
export const getFeedback = (req,res) =>{
    const query = `SELECT g.profilePicture,g.firstName,g.lastName,f.feedback,f.timestamp FROM feedback f
    JOIN guest g ON f.guestId=g.id ORDER BY timestamp DESC`;
    db.query(query, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ feedback: results });
    });
}