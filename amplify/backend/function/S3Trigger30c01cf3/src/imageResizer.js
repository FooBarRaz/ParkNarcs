const sharp = require('sharp');

const resizeImage = (img) => {
    const { IMAGE_WIDTH } = process.env;
    console.log('image width: ', IMAGE_WIDTH);
    const width = Number.parseInt(IMAGE_WIDTH) || 780;
    return sharp(img)
        .withoutEnlargement()
        .resize({ width })
        .max()
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
