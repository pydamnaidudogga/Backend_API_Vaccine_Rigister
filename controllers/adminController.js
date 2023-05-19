//  Admin controllers file



 const User = require('../models/User');
 const Admin = require('../models/Admin');
const Slot = require('../models/Slots');
 // Admin Login
 module.exports.logIn =  async (req, res) => {
    try {
      const { userName, password } = req.body;
      const admin = await Admin.findOne({ userName, password });
      if (!admin) {
        throw new Error('Invalid credentials');
      }
      res.status(200).json(admin);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };

// List of all rigisterd users

module.exports.getAllRigisterdUsers = async (req, res) => {

    
    try {
        //   const date = new Date(req.params.date);
        const users = await User.find({});
          res.status(200).json(users);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }

}


//   List of users rigisterd for the particulat date

module.exports.getSlotUsersList = async (req, res) => {
    let usersList =[];
    try {
        //   const date = new Date(req.params.date);
        const slotId = req.body.slotId;
          const slot = await Slot.findById(slotId);
          if (!slot) {
            throw new Error('Slot not found !');
          }
          const users = await User.find({});
        //  the below map is used to check the slotid for every user
          users.map((user) => {
            userFirstDoseSlotId = user.firstDose.slotId;
            userSecondDoseSlotId = user.secondDose.slotId;
            if(user.firstDose.registered){
               if(userFirstDoseSlotId.toString()===slotId){
                   usersList.push(user);
               }
            }
            if(user.secondDose.registered){
                if(userSecondDoseSlotId.toString()===slotId){
                    usersList.push(user);
                }

            }
           
          })
          res.status(200).json(usersList);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
}