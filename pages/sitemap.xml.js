{
  /* <sitemapindex
  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'
  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
  xsi:schemaLocation='http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
>
  <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
    <url>
      <loc>https://www.thediscoverkashmir.in/</loc>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/contact</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/destinations</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/travelblogs</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/packages</loc>
      <priority>0.8</priority>
    </url>
    <!-- Dynamic routes -->
    <url>
      <loc>https://www.thediscoverkashmir.in/packages/[packageName]</loc>
      <priority>0.6</priority>
      <changefreq>daily</changefreq>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/travelblog/[title]</loc>
      <priority>0.6</priority>
      <changefreq>daily</changefreq>
    </url>
    <url>
      <loc>
        https://www.thediscoverkashmir.in/destinations/[destinationName]
      </loc>
      <priority>0.6</priority>
      <changefreq>daily</changefreq>
    </url>
  </urlset>
</sitemapindex>; */
}
//pages/sitemap.xml.js

import slugify from 'slugify';
import des from '../Data/Destinations.json';
import blog from '../Data/Blog.json';
import pack from '../Data/Packages.json';

function generateSiteMap({ Packages, Destinations, TravelBlogs }) {
  return `<sitemapindex
  xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'
  xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'
  xsi:schemaLocation='http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd'
>
  <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
    <url>
      <loc>https://www.thediscoverkashmir.in/</loc>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/contact</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/destinations</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/travelblogs</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://www.thediscoverkashmir.in/packages</loc>
      <priority>0.8</priority>
    </url>
    ${blog.map((item) => {
      return `
            <url>
                <loc>${`https://www.thediscoverkashmir.in/travelblogs/${item?.Title.replace(
                  / /g,
                  '-'
                ).toLowerCase()}?id=${item?.id}`}</loc>
            </url>
          `;
    })}
    ${pack
      .map((item) => {
        return `
          <url>
              <loc>${`https://www.thediscoverkashmir.in/packages/${item?.packageName
                .replace(/ /g, '-')
                .toLowerCase()}?id=${item?.id}`}</loc>
          </url>
        `;
      })
      .join('')}
      ${des
        .map((item) => {
          return `
            <url>
                <loc>${`https://www.thediscoverkashmir.in/destinations/${item?.destinationName
                  .replace(/ /g, '-')
                  .toLowerCase()}?id=${item?.id}`}</loc>
            </url>
          `;
        })
        .join('')}
  </urlset>
</sitemapindex>
     
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}
import path from 'path';
import fsPromises from 'fs/promises';

export async function getServerSideProps({ res }) {
  const jsonDirectory = path.join(process.cwd(), 'Data');
  //Read the json data file data.json
  const Packages = await fsPromises.readFile(
    jsonDirectory + '/Packages.json',
    'utf8'
  );
  const Destinations = await fsPromises.readFile(
    jsonDirectory + '/Destinations.json',
    'utf8'
  );

  const TravelBlogs = await fsPromises.readFile(
    jsonDirectory + '/Blog.json',
    'utf8'
  );

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(Packages, Destinations, TravelBlogs);
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {
      Packages: JSON.parse(Packages),
      Destinations: JSON.parse(Destinations),
      TravelBlogs: JSON.parse(TravelBlogs),
    },
  };
}
// export async function getServerSideProps({ res }) {
//   // We make an API call to gather the URLs for our site
//   const request = await fetch(EXTERNAL_DATA_URL);
//   const posts = await request.json();

//   // We generate the XML sitemap with the posts data
//   const sitemap = generateSiteMap(posts);

//   res.setHeader('Content-Type', 'text/xml');
//   // we send the XML to the browser
//   res.write(sitemap);
//   res.end();

//   return {
//     props: {},
//   };
// }

export default SiteMap;
