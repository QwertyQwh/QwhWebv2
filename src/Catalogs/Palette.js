
const palette =  ["#cb997e","#ddbea9","#ffe8d6","#b7b7a4","#a5a58d","#6b705c"]
function get_random_color_from_palette() {
    return palette[Math.floor((Math.random()*palette.length))];
}

export default {palette,get_random_color_from_palette}