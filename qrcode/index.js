import qr from 'qr-image';
import inquirer from 'inquirer';
import Qrcode from 'qrcode-reader';
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'list',
    name: 'color',
    message: 'What is your favorite color?',
    choices: ['purple', 'red', 'green', 'yellow'],
  },
]).then(async answer => {
  const fileName = `${answer.name}.png`; // Create the file name with answer.name
  fs.writeFileSync(fileName, ''); // Create an empty file with the specified name
  console.log(`File '${fileName}' created successfully.`);
  
  const qrcode = qr.image(answer.name + answer.color, {
    type: 'png',
    size: 10,
    margin: 5,
  });
  
  const qrPath = `./${fileName}`;
  qrcode.pipe(fs.createWriteStream(qrPath));
  console.log(`QR code generated and saved as '${qrPath}'.`);
  
  const qrFile = fs.readFileSync(qrPath);
  const qrDecoder = new Qrcode();
  qrDecoder.callback = (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Decoded QR code:');
    console.log(result.result);
  };
  
  const image = await loadImage(qrFile);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, image.width, image.height);
  
  qrDecoder.decode(imageData.data, imageData.width, imageData.height);
});




















// import qr from 'qr-image'
// import ask from 'inquirer'
// import Qrcode from 'qrcode-reader'
// import fs, { read } from 'fs'
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
// ]).then(answer => {
//   const fileName = `${answer.name}.png`; // Create the file name with answer.name
//   fs.writeFileSync(fileName, ''); // Create an empty file with the specified name
//   console.log(`File '${fileName}' created successfully.`);
  
//   const qrcode = qr.image(answer.name + answer.color, {
//     type: 'png',
//     size: 10,
//     margin: 5,
//   });
  
//   const qrPath = `./${fileName}`;
//   qrcode.pipe(fs.createWriteStream(qrPath));
//   console.log(`QR code generated and saved as '${qrPath}'.`);
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

// //Function to decode QR code from an image
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

// // const imagePath ='./image.png'

// // decodeQRCode(imagePath)
// //   .then((result) => {
// //     console.log('Decoded QR Code:', result);
// //   })
// //   .catch((error) => {
// //     console.error('Error decoding QR Code:', error);
// //   });


