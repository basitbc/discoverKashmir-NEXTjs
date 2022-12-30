import { useEffect } from 'react';

// pages/api/user
// export async function getDetails() {
//   const response = await fetch(
//     `http://localhost:8081/discoverkashmir/details/getall`
//   );
//   const jsonData = await response.json();
//   return jsonData;
// }

// const details = {
//   Logo: 'Discover Kashmir',
//   phoneNo: '+91-9419584775',
//   email: 'thediscoverkashmir@gmail.com',
//   whatsAppNumber: '+91-9419585775',
//   address: 'JogiLankar near V.B College Rainawari Srinagar J&K, India -190003',
//   about:
//     'Discover new cultures and have a wonderful rest with Backpack Story! Select the country you’d like to visit and provide our agents with estimated time – they’ll find and offer the most suitable tours and hotels.   During our work we organized countless journeys for our clients. We started as a small tour bureau, and soon we expanded our offers list. Today we have valuable experience travelling and we can advise the most stunning resorts, cities and countries to visit!',
//   about_image_front: '',
//   about_image_back: '',
// };

// export default async function handler(req, res) {
//   res.status(200).json(details);
// }

// import path from 'path';

// import fsPromises from 'fs/promises';

// export default async function handler(req, res) {
//   //Find the absolute path of the json directory
//   const jsonDirectory = path.join(process.cwd(), 'Data');
//   //Read the json data file data.json
//   const fileContents = await fsPromises.readFile(
//     jsonDirectory + '/Details.json',
//     'utf8'
//   );
//   //Return the content of the data file in json format
//   res.status(200).json(fileContents);
// }
