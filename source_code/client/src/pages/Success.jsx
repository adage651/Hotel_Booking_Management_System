const Success =()=>{

}
export default Success;
export const loader =async()=>{

    const result=localStorage.getItem('sessionId')
    try {
const userSession=localStorage.getItem('sessionId')
console.log(userSession)
      const response = await fetch(`http://localhost:8000/payment/status` ,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userSession})
      });
      const { paymentStatus } = await response.json();
    } catch (error) {
      console.error('Error checking payment status:', error);
    }

}
