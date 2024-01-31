// pages/api/ccavenueResponse.js
import qs from 'querystring';
import ccav from 'ccavenue'; // Import the necessary modules

export default function handler(req, res) {
  if (req.method === 'POST') {
    let ccavEncResponse = '';
    let ccavResponse = '';
    const workingKey = '828078A3C7E40E8582EA9CDD0E0A8831'; // Put in the 32-Bit key shared by CCAvenues.

    req.on('data', function (data) {
      ccavEncResponse += data;
      const ccavPOST = qs.parse(ccavEncResponse);
      const encryption = ccavPOST.encResp;
      ccavResponse = ccav.decrypt(encryption, workingKey);
    });

    req.on('end', function () {
      let pData = '';
      pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>';
      pData = pData + ccavResponse.replace(/=/gi, '</td><td>');
      pData = pData.replace(/&/gi, '</td></tr><tr><td>');
      pData = pData + '</td></tr></table>';
      const htmlcode = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>${pData}</center><br></body></html>`;

      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(htmlcode);
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
