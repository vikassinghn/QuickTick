const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.post("/addTask", async (req, res) => {
    try {
      const { title, body, userId } = req.body; // ✅ Use userId instead of email
  
      if (!title || !body || !userId) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // Find user by userId
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Create a new task
      const list = new List({ title, body, user: existingUser._id });
      await list.save();
  
      // Add task reference to the user's list
      existingUser.list.push(list._id);
      await existingUser.save(); // ✅ Add await
  
      res.status(201).json({ message: "Task added successfully", list });
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

router.put("/updateTask/:id",async(req,res)=>{
    try{
        const {title,body,email} = req.body;
        const existingUser = await User.findOne(({email}));
        if(existingUser){
            const list = await List.findByIdAndUpdate(req.params.id,{title,body});
            list.save();
            return res.status(200).json({message:"Task Updated"})
        }
    }catch(error){
        console.log(error);
    }
});

router.delete("/deleteTask/:id",async(req,res)=>{
    try{
        const {email} = req.body;
        const existingUser = await User.findOneAndUpdate({email},{$pull:{list:req.params.id}});
        if(existingUser){
            await List.findByIdAndDelete(req.params.id);
            return res.status(200).json({message:"Task Deleted"})
        }
    }catch(error){
        console.log(error);
    }
});

router.get("/getTask/:id", async (req, res) => {
    try {
        const tasks = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

        return res.status(200).json({ tasks }); // ✅ Changed key from `list` to `tasks`
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ error: "Server Error" }); // ✅ Proper error response
    }
});


module.exports = router;