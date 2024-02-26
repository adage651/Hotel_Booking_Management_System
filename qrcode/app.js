document.querySelector('.form1').addEventListener('submit',(evt)=>{
    evt.preventDefault();
    

  

    let name=document.querySelector('.form1').elements.name.value;
    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(name)
      })
        .then(response => response.text())
        .then(responseText => {
          console.log('Data sent successfully:', responseText);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
        
   



fetch('http://localhost:3000/image')
.then(response => response.blob())
.then(imageBlob => {
  // Process the imageBlob as needed
  const imageURL = URL.createObjectURL(imageBlob);
  const imgElement = document.createElement('img');
  imgElement.src = imageURL;
  document.body.appendChild(imgElement);
})
.catch(error => {
  console.error('Error receiving image:', error);
});


})

