const sharp = require('sharp');

const resizeImage = (img) => {
    const { IMAGE_WIDTH } = process.env;
    console.log('image width: ', IMAGE_WIDTH);
    return sharp(img).resize({ width: 780 })
        .webp()
        .toBuffer()
        .catch(function(err) {
            console.log("Unable to resize image: ", err.message);
            throw err;
        });
}

module.exports = {
    resizeImage
}
