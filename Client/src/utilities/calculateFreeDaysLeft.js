const calculateFreeDaysLeft = (createdDate) => {
    const currentDate = new Date();
    const subscriptionStartDate = new Date(createdDate);
    const diffInTime = currentDate - subscriptionStartDate;
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
    return 365 - diffInDays;
  };
  
  export default calculateFreeDaysLeft;
  