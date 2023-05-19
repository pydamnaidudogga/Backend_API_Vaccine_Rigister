// User Registration
const User = require('../models/User');
const Slot = require('../models/Slots');

// This is the controller for user signUP
module.exports.signUP= async (req, res) => {
    try {
        console.log(req.body);
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // This is the controller for User Login
 module.exports.logIn =  async (req, res) => {
    try {
    //    retrive the require parameters to login from the req
      const { phoneNumber, password } = req.body;
    //   Finding the phoneNumber and password in the database
      const user = await User.findOne({ phoneNumber, password });
    //   if user not found then show this error
      if (!user) {
        throw new Error('Invalid credentials');
      }
    //   if the user found then send the user
      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
  
 // Register for a slot (first/second dose)
 module.exports.slotBook = async (req, res) => {
    try {
      const userId = req.params.userId;
      const dose = req.params.dose; // 'first' or 'second'
      const slotId = req.body.slotId;
    //   finding the user and slot in the database
      const user = await User.findById(userId);
      const slot = await Slot.findById(slotId);
    // if the user or slot is not found then throw the error
      if (!user || !slot) {
        throw new Error('User or Slot not found');
      }
    //   slot date
      const dateFromSlot = slot.date;
      const temp=slot.endTime.split(' ');
      const timeFromSlot = temp[0];
      
    //   save the slot date along with time
      const sloteDate = `${dateFromSlot}T${timeFromSlot}:00`;
    
    //   for first dose
      if (dose === 'first') {
        if (user.firstDose.registered) {
          throw new Error('First dose already registered');
        }
     
        user.firstDose.date=sloteDate;
        user.firstDose.registered = true;
        user.firstDose.slotId = slotId;
      } else if (dose === 'second') {
        if (!user.firstDose.vaccinated) {
          throw new Error('First dose not completed');
        }
        if (user.secondDose.registered) {
          throw new Error('Second dose already registered');
        }
        user.secondDose.date= sloteDate;
        user.secondDose.registered = true;
        user.secondDose.slotId = slotId;
      } else {
        throw new Error('Invalid dose type');
      }
    //   decrease the slots count
      slot.availableDoses -= 1;
      if (slot.availableDoses === 0) {
        slot.available = false;
      }
    //   save the user and slot
      await user.save();
      await slot.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Update a registered slot
 module.exports.slotUpdate = async (req, res) => {
    try {
      const userId = req.params.userId;
      const dose = req.params.dose; // 'first' or 'second'
      const slotId = req.body.slotId;
      const user = await User.findById(userId);
    //   current slot id
      const slot = await Slot.findById(slotId);
    //   previous slot id
      let previousSlot;
      if (!user || !slot) {
        throw new Error('User or Slot not found');
      }
      const dateFromSlot = slot.date;
      const temp=slot.endTime.split(' ');
      const timeFromSlot = temp[0];

      const sloteDate = `${dateFromSlot}T${timeFromSlot}:00`;
  
      if (dose === 'first') {
        previousSlot = user.firstDose.slotId;
        user.firstDose.date=sloteDate;
        user.firstDose.slot = slotId;
      } else if (dose === 'second') {
        previousSlot = user.secondDose.slotId;
        user.secondDose.date= sloteDate;
        user.secondDose.slot = slotId;
      } else {
        throw new Error('Invalid dose type');
      }

    //   decrease the present slot count
      slot.availableDoses -= 1;
      if (slot.availableDoses === 0) {
        slot.available = false;
      }
    //  finding the previous slot 
      const previousSlotInfo =  await Slot.findById(previousSlot);
      if(slot.available == false){
        slot.available = true;
      }
      //   Increase the previous slot count
      previousSlotInfo.availableDoses += 1;
      await user.save();
      await previousSlot.save();
      await slot.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


