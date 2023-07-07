import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { exit } from 'node:process';

dotenv.config();

if (!process.env.CLOUDINARY_URL) {
  console.warn(
    "Check you've got a .env file in the root of the project with the CLOUDINARY_URL environment variable for your Cloudinary product environment."
  );
  exit(1);
}

cloudinary.config(true);

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
});


/////////////////////////////////////
// Gets the list of public IDs
// that have the specified tag
/////////////////////////////////////
const getPublicIdsByTag = async (tag = 'property-demo') => {
  const response = await fetch(
    `https://res.cloudinary.com/${cloudinary.config().cloud_name}/image/list/${tag}.json`
  );
  const { resources } = await response.json();
  const publicIds = resources.map((resource) => resource.public_id);
  return publicIds;
};

// To use your own tag, pass the tag into this function, otherwise the 'property-demo' tag is used
const publicIds = await getPublicIdsByTag();

/////////////////////////////////////
// Builds the slideshow URL
// with random transitions
/////////////////////////////////////
const buildUrl = () => {

  // REPLACE THE RANDOM STRINGS IN THESE PUBLIC IDs 
  // WITH THE UPLOADED ONES AFTER RUNNING SETUP:
  const emptyVideoPublicId = 'empty_lzglfg.mp4';
  const introPublicId = 'citc-intro_wswhtj';
  const outroPublicId = 'citc-outro_nkjysl';

  const allTransitions = [
    'fade', 'wipeleft', 'wiperight', 'wipeup', 'wipedown', 'slideleft', 'slideright', 'slideup', 'slidedown', 'circlecrop', 'rectcrop', 'distance', 'fadeblack', 'fadewhite', 'radial', 'smoothleft', 'smoothright', 'smoothup', 'smoothdown', 'circleopen', 'circleclose', 'vertopen', 'vertclose', 'horzopen', 'horzclose', 'dissolve', 'pixelize', 'diagtl', 'diagtr', 'diagbl', 'diagbr', 'hlslice', 'hrslice', 'vuslice', 'vdslice', 'hblur', 'fadegrays', 'wipetl', 'wipetr', 'wipebl', 'wipebr', 'squeezeh', 'squeezev'
  ];

  // Start of the URL
  let slideshowUrl = `https://res.cloudinary.com/${cloudinary.config().cloud_name}/video/upload/du_1.1/ar_16:9,c_fill,w_400/fl_splice:transition_(name_fade;du_1.0),l_${introPublicId}/du_6.0/ar_16:9,c_fill,w_400/fl_layer_apply/`;

  for (let publicId of publicIds) {

    // Pick a random transition
    const transition = allTransitions[Math.floor(Math.random() * allTransitions.length)];

    // Replace forward slashes with colons
    publicId = publicId.replace(/\//g, ':');

    // Append the asset to the URL
    slideshowUrl += `fl_splice:transition_(name_${transition};du_1.5),l_${publicId}/du_6.0/ar_16:9,c_fill,w_400/fl_layer_apply/`;
  }

  // Append the outro and the rest of the URL
  slideshowUrl += `fl_splice:transition_(name_radial;du_1.5),l_${outroPublicId}/du_6.0/ar_16:9,c_fill,w_400/fl_layer_apply/${emptyVideoPublicId}`;

  return slideshowUrl;
};

console.log('Slideshow URL: ', buildUrl());


