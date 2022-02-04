const sharp = require('sharp');

const resizeImage = (img) => {
    return sharp(img).resize({ width: 780 })
        .webp()
        .toBuffer()
        .catch(function(err) {
            console.log("Unable to resize image");
        });
}

module.exports = {
    resizeImage
}
