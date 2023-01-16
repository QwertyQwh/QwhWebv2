import { Effect,EffectAttribute } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /*glsl */`
uniform float dispFactor;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

float valueAtPoint(sampler2D image, vec2 coord, vec2 texel, vec2 point) {
    vec3 luma = vec3(0.299, 0.587, 0.114);

    return dot(texture2D(image, coord + texel * point).xyz, luma)*50.;
}

float diffuseValue(int x, int y) {
    return valueAtPoint(depthBuffer, vUv, vec2(1.0 / resolution.x, 1.0 / resolution.y), vec2(x, y)) * 0.6;
}

float getValue(int x, int y) {
    return diffuseValue(x, y);
}

float combinedSobelValue() {
    // kernel definition (in glsl matrices are filled in column-major order)
    const mat3 Gx = mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1);// x direction kernel
    const mat3 Gy = mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1);// y direction kernel

    // fetch the 3x3 neighbourhood of a fragment

    // first column
    float tx0y0 = getValue(-1, -1);
    float tx0y1 = getValue(-1, 0);
    float tx0y2 = getValue(-1, 1);

    // second column
    float tx1y0 = getValue(0, -1);
    float tx1y1 = getValue(0, 0);
    float tx1y2 = getValue(0, 1);

    // third column
    float tx2y0 = getValue(1, -1);
    float tx2y1 = getValue(1, 0);
    float tx2y2 = getValue(1, 1);

    // gradient value in x direction
    float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
    Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
    Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

    // gradient value in y direction
    float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
    Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
    Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

    // magnitude of the total gradient
    float G = (valueGx * valueGx) + (valueGy * valueGy);
    return clamp(G, 0.0, 1.0);
}


void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor){
    float sobelValue = combinedSobelValue();
    sobelValue = smoothstep(0.01, 0.03, sobelValue);

    vec4 lineColor = vec4(1,0,0, 1);
    vec4 backColor = vec4(0.96, 0.92, 0.66, 1.0);

    if (sobelValue < 0.05 ) {
        outputColor = inputColor;
    } else {
        outputColor =  lineColor;
    }

    // outputColor = vec4(texture2D(depthBuffer, uv).xyz/1.5,1);
    
}
`

export default class PencilEffect extends Effect {
    constructor(props){
        super(
            'PencilEffect',
            fragmentShader,
            {
                uniforms: new Map([
                    ['dispFactor', new Uniform(props.dispFactor)]
                ]),
                attributes: EffectAttribute.DEPTH
            }
        )
        console.log('pencilEffect is contructed')

    }

    update(renderer,inputBuffer,deltaTime){
        // this.uniforms.get('offset').value += deltaTime;
    }

    setDispFactor(disp){

    }
}