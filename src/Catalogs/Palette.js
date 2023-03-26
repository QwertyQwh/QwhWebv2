
const palette =  ["#ccd5ae","#e9edc9","#fefae0","#faedcd","#d4a373"]
function get_random_color_from_palette() {
    return palette[Math.floor((Math.random()*palette.length))];
}

export default {palette,get_random_color_from_palette}