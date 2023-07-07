import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();
cloudinary.config(true);
if (!process.env.CLOUDINARY_URL) {
  console.warn(
    "Check you've got a .env file in the root of the project with the CLOUDINARY_URL environment variable for your Cloudinary product environment."
  );
  exit(1);
}

// These assets will be uploaded to your product environment
const resources = [
  'https://res.cloudinary.com/demo/video/upload/docs/empty.mp4',
  'https://res.cloudinary.com/demo/image/upload/docs/citc-intro.jpg',
  'https://res.cloudinary.com/demo/image/upload/docs/citc-outro.jpg',
  'https://res.cloudinary.com/demo/image/upload/docs/dining-room-3108037_1280',
  'https://res.cloudinary.com/demo/image/upload/docs/bedroom-5664221_1280',
  'https://res.cloudinary.com/demo/image/upload/docs/interior-2685521_1280',
  'https://res.cloudinary.com/demo/image/upload/docs/kitchen-2165756_1280',
];

// Set upload options to set the public ID to the filename with random characters added
let uploadOptions = {
  use_filename: true,
  unique_filename: true,
  resource_type: 'auto',
};

// Add a tag on upload to the images in the slideshow (not the intro, outro or empty video)
const promises = resources.map((resource) => {
  if (resource.includes(1280)) {
    uploadOptions = {
      ...uploadOptions,
      tags: 'property-demo',
    };
  }
  // Upload the asset with the options
  return cloudinary.uploader.upload(resource, uploadOptions);
});

try {
  // Upload all the files to your product environment
  const responses = await Promise.all(promises);
  console.log(
    `Successful upload. Please take a note of the following public IDs and update buildUrl() in generateSlideshow.js:`
  );

  const table = responses.map((response) => ({
    'Public ID': response.public_id,
  }));
  console.table(table);
} catch (error) {
  console.error(error);
}