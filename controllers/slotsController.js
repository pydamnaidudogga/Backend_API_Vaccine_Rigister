 //  slots controllers file
 
 
 // Get Available Slots for a given day
 const Slot = require('../models/Slots')
 const User = require('../models/User');
 module.exports.slotAvailability = async (req, res) => {
    try {
    //   const date = new Date(req.params.date);
    const slotId = req.body.slotId;
      const slot = await Slot.findById(slotId);
      res.status(200).json(slot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  


// The below function is used for Once the registered time slot is lapsed, the user should be considered as vaccinated for that registered dose (first/second).

  async function checkTimeSlots(){
   const users = await User.find({});
   console.log('the slots update function is running');
   users.map((user)=>{
    // first dose expire date
        const firstDoseExpirationDate = new Date(user.firstDose.date);
        // second dose expire date
        const secondDoseExpireatonDate =new Date(user.secondDose.date);
        // current date
        const currentDate = new Date();

        // Compare the expiration with the current date and time
        if (firstDoseExpirationDate < currentDate) {

           if(user.firstDose.registered&&!user.firstDose.vaccinated){
                user.firstDose.vaccinated=true;
            }
     
        } 
        if (secondDoseExpireatonDate < currentDate) {
           if(user.secondDose.registered&&!user.secondDose.vaccinated){
               user.secondDose.vaccinated=true;
            }
        } 

        async function userSave(){
            await user.save();

        }
        userSave();
        

        
        
    });
    
}


 

// Define the start and end times
const startTime = new Date();
startTime.setHours(10, 0, 0); // Set the start time to 10 AM

const endTime = new Date();
endTime.setHours(17, 0, 0); // Set the end time to 5 PM

// Calculate the initial delay to the next 10 AM
let initialDelay = startTime.getTime() - Date.now();

// Schedule the first execution at 10 AM
setTimeout(runProgram, initialDelay);

// Define the program logic to be executed
function runProgram() {
  // Execute your program logic here
  
  checkTimeSlots();

  // Check if the current time is before the end time
  const currentTime = new Date();
  if (currentTime < endTime) {
    // Schedule the next execution at the next day's 10 AM
    const nextExecution = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds());
    const nextDelay = nextExecution.getTime() - currentTime.getTime();
    setTimeout(runProgram, nextDelay);
  }
}
 