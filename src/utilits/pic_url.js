
const pic_url = (num) => {
    if (num >= 1 && num <= 9) {
        num = '0' + num
    }
    return `https://developer.accuweather.com/sites/default/files/${num}-s.png`;
    
}

export default pic_url;