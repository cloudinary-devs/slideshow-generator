# slideshow-generator
Generate a slideshow from images with the same tag in Cloudinary.

## Instructions

Create a .env file in the root of the project with the CLOUDINARY_URL environment variable for your Cloudinary product environment.

For test purposes, upload these assets from the demo product environment to your product environment:

* [https://res.cloudinary.com/demo/video/upload/docs/empty.mp4](https://res.cloudinary.com/demo/video/upload/docs/empty.mp4)
* [https://res.cloudinary.com/demo/image/upload/docs/citc-intro.jpg](https://res.cloudinary.com/demo/image/upload/docs/citc-intro.jpg)
* [https://res.cloudinary.com/demo/image/upload/docs/citc-outro.jpg](https://res.cloudinary.com/demo/image/upload/docs/citc-outro.jpg)

You should have these images in your product environment with the following public IDs: 

* docs/citc-intro
* docs/citc-outro

And the video with public ID:

* docs/empty

Tag any images in your account that you want to be included in the slideshow with 'property12'. Later, you can change the tag in the main function in generateSlideshow.js.

## Install

```
npm install
```

## Run

```
node generateSlideshow.js
```
