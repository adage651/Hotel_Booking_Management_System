// import qr from 'qr-image'
// import ask from 'inquirer'
// import Qrcode from 'qrcode-reader'
// import fs, { read } from 'fs'
// // import qrd from 'jsqr'
// import sharp from 'sharp'
// // import zxing from 'zxing-js-library';

// ask.prompt([
//     {
//         type:'input',
//         name:'name',
//         message:'what is your name'
//     },
//     {
//         type:'list',
//         name:'color',
//         message:'what is your foverate color',
//         choices:['purple','red','green','yellow']
//     }
// ]).then(answer=>{
//     console.log('your qr code is ')
// //  let qrcode=qr.image(answer.name+answer.color,{type:'png',size:10, margin:5})
// //    qrcode.pipe(fs.createWriteStream('./aman.png'));
// // let imageData  = fs.readFileSync('./aman.png');
// // let image = new Uint8ClampedArray(imageData);
// // const bitmap = zxing.BinaryBitmap.fromBinarizer(new zxing.HybridBinarizer(imageData));

// // const reader = new zxing.MultiFormatReader();

// // reader.setHints([zxing.BarcodeFormat.QR_CODE]);
// // const result = reader.decode(bitmap);
// // const decodedData = result.getText();

// let decodedData;
// let qrFile = fs.readFileSync('./aman.png')
// let qr= new Qrcode();
// qr.decode(qrFile, (err,result) => {
//     if (err){
//         console.log(err)
//     return;
//     }

//     console.log(result.result)

// })

// // let imgHeight;
// // let imgWidth;
// // sharp(imageData).metadata().then(data => {
// //     imgHeight=data.imageHeight
// //     imgWidth=data.imageWidth
// // })



// //let decodedData = qrd(image,imgHeight,imgWidth); 
// //console.log(decodedData)

//    //let readimg=qr.imageSync('./aman.png')
// //    let readimg=fs.readFileSync('./aman.png')
// //    let image=new Uint8ClampedArray(readimg);
// //   let decode=qrd(image,qrCodeHeight,qrCodeWidth)
// // console.log(decode);

// })
// import { readFileSync } from 'fs';
// import { Image } from 'image-js';
// import jsQR from 'jsqr';

// // Specify the path to the QR code image file
// const imagePath = './aman.png';

// // Read the QR code image file
// const imageBuffer = readFileSync(imagePath);

// // Create an Image object from the image buffer
// const image = await Image.load(imageBuffer);

// // Get the raw pixel data from the image
// const { data, width, height } = image;

// // Decode the QR code using jsQR
// const code = jsQR(data, width, height);

// if (code) {
//   console.log('Decoded QR code:', code.data);
// } else {
//   console.error('No QR code found in the image.');
// }


// import qr from 'qr-image'
// import fs from 'fs'
// import express from 'express'
// import bodyParser from 'body-parser'   

 







// const app = express();

// app.use(bodyParser.urlencoded({extended:true}))

// app.post("/data",(req, res)=>{
//     let name=req.body.name;
//     let qrcode=qr.image(name,{type:'png',size:10, margin:5})
//    qrcode.pipe(fs.createWriteStream('./image.png'));

// })
// app.get("/", (req, res) => {
//   const imagePath ='./image.png'; // Replace with the actual path to your image file

//   fs.readFile(imagePath, (err, data) => {
//     if (err) {
//       console.error('Error reading image file:', err);
//       res.status(500).send('Error reading image file');
//       return;
//     }

//     res.writeHead(200, {
//       'Content-Type': 'image/jpeg',
//       'Content-Length': data.length
//     });

//     res.end(data);
//   });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
// import fs from 'fs/promises';
// import path from 'path';
// import QrCode from 'qrcode-reader';
// import jimp from 'jimp';

// Function to decode QR code from an image
// async function decodeQRCode(imagePath) {
//   try {
//     const imageBuffer = await fs.readFile(imagePath);
//     const image = await jimp.read(imageBuffer);

//     return new Promise((resolve, reject) => {
//       const qr = new QrCode();
//       qr.callback = (err, value) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(value);
//         }
//       };

//       qr.decode(image.bitmap);
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// // Example: Decode QR code from a PNG file

// const imagePath ='./image.png'

// decodeQRCode(imagePath)
//   .then((result) => {
//     console.log('Decoded QR Code:', result);
//   })
//   .catch((error) => {
//     console.error('Error decoding QR Code:', error);
//   });
// import express from 'express'
// const app = express();
// const port = 3000;

// app.get('/server-location', (req, res) => {
//   // Simulated server location (replace with your actual logic)
//   const serverLocation = { latitude: 37.7749, longitude: -122.4194 };

//   res.send(serverLocation);
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
const stripe = require('stripe')('sk_test_51ORzpTEmEX0IXwGFEfzb2URMseBLzvSubi0bCc0LV2PG7YendVbtL2nRezHcOsf4Q8tH29H4JkVND5nMZLe3cVIr000fJ4CuYw');

// Simulate a payment transaction
async function simulatePayment() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,  // Amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    console.log(paymentIntent.client_secret);
  } catch (error) {
    console.error(error);
  }
}

// Call the simulatePayment function to initiate the payment simulation
simulatePayment();
