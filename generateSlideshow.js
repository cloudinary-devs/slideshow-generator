require('dotenv').config();

const cloudinary = require('cloudinary').v2;

if (typeof process.env.CLOUDINARY_URL === 'undefined') {
    console.warn("Check you've got a .env file in the root of the project with the CLOUDINARY_URL environment variable for your Cloudinary product environment.");
  }

// Return "https" URLs by setting secure: true
cloudinary.config({
    secure: true
  });


 
/////////////////////////////////////
// Builds the slideshow URL
// with random transitions
/////////////////////////////////////
function makeSlideshowUrl(jsonAssets) {

    console.log(jsonAssets);

    let allTransitions = [
        'fade', 'wipeleft', 'wiperight', 'wipeup', 'wipedown', 'slideleft', 'slideright', 'slideup','slidedown', 'circlecrop', 'rectcrop', 'distance', 'fadeblack', 'fadewhite', 'radial', 'smoothleft', 'smoothright', 'smoothup', 'smoothdown', 'circleopen', 'circleclose', 'vertopen', 'vertclose', 'horzopen', 'horzclose', 'dissolve', 'pixelize', 'diagtl', 'diagtr', 'diagbl', 'diagbr', 'hlslice', 'hrslice', 'vuslice', 'vdslice', 'hblur', 'fadegrays', 'wipetl', 'wipetr', 'wipebl', 'wipebr', 'squeezeh', 'squeezev'
    ];
    
    // Start of the URL
    let slideshowUrl = "https://res.cloudinary.com/" + cloudinary.config().cloud_name + "/video/upload/du_1.1/ar_16:9,c_fill,w_400/fl_splice:transition_(name_fade;du_1.0),l_docs:citc-intro/du_6.0/ar_16:9,c_fill,w_400/fl_layer_apply/";

    // For each of the assets in the JSON response
    for (asset in jsonAssets.resources) {

        // Pick a random transition
        let transition = allTransitions[Math.floor(Math.random()*allTransitions.length)]; 

        // Get the public ID of the asset from the JSON response
        let publicId = jsonAssets.resources[asset].public_id;

        // Replace forward slashes with colons
        publicId = publicId.replace(/\//g, ':');

        // Append the asset to the URL
        slideshowUrl += "fl_splice:transition_(name_" + transition + ";du_1.5),l_" + publicId + "/du_6.0/ar_16:9,c_fill,w_400/fl_layer_apply/"
    }

    // Append the outro and the rest of the URL
    slideshowUrl += "fl_splice:transition_(name_radial;du_1.5),l_docs:citc-outro/du_6.0/ar_16:9,c_fill,w_400/fl_layer_apply/docs/empty.mp4";

    return slideshowUrl;
}

/////////////////////////////////////
// Gets the JSON response of images 
// with the specified tag
/////////////////////////////////////
const getList = async (tag) => {

    try {
        let jsonAssets = "";
        const http = require('http')
        const options = {
             host: 'res.cloudinary.com',
             path: '/carl/image/list/' + tag +'.json'
        } 
        
        http.get(options, (res) => {
             let code = res.statusCode;
             let body = "";
             console.log("Got response: " + code)
             res.on('data', chunk => {
                body += chunk;
             });
             res.on('end', () => {
                  if (code === 200) {
                    jsonAssets = JSON.parse(body);

                    // Create the slideshow
                    let slideshowUrl = makeSlideshowUrl(jsonAssets);

                    console.log(slideshowUrl);
        
                  } else {
                       console.log("Code wasn't 200!");
                  }
             })
        }).on('error', function(e) {
             console.log("Got error: " + e.message)
        })
    } catch (error) {
      console.error(error);
    }
};



//////////////////
//
// Main function
//
//////////////////
(async () => {

    let tag = "property12";
    await getList(tag);

})();  