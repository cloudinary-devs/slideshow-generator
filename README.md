# slideshow-generator
Generate a slideshow from images with the same tag in Cloudinary.

## Install

```
npm install
```

## Set up

Create a **.env** file in the root of the project containing the CLOUDINARY_URL environment variable for your Cloudinary product environment.

For example:

```
CLOUDINARY_URL=cloudinary://12345:abcde@cloudname
```

For test purposes, run:

```
npm run setup
```

This uploads some test assets into your product environment and tags the images in the slideshow (except the intro and outro) with the tag `property-demo`.
The public IDs of the uploaded assets contain random strings, so update these consts in `buildURL()` in **generateSlideshow.js**:

* const emptyVideoPublicId = 'empty_aauing.mp4';
* const introPublicId = 'citc-intro_lngkz4';
* const outroPublicId = 'citc-outro_dxoige';

To use your own images in the slideshow: 

1. Update `introPublicId` and `outroPublicId` to the public IDs of the assets you want to use for the intro and outro. 
1. Tag the images in your product environment that you want to be part of the slideshow (except the intro and outro). 
1. Pass the tag to `getPublicIdsByTag()` (line 36 in **generateSlideshow.js**).


## Run

```
npm start
```
