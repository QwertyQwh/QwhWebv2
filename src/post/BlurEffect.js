import { Effect,EffectAttribute } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /*glsl */`
uniform float sigma;

float normpdf(in float x, in float sigma)
{
	return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;
}

void mainImage(const in vec4 inputColor, const in vec2 uv,  out vec4 outputColor){
		//declare stuff
    //init color variable

		//declare stuff
        const int mSize = 21;
		int kSize = (mSize-1)/2;
		float kernel[mSize];
		vec3 final_colour = vec3(0.0);
		
		//create the 1-D kernel
		float Z = 0.0;
		for (int j = 0; j <= kSize; ++j)
		{
			kernel[kSize+j] = kernel[kSize-j] = normpdf(float(j), sigma);
		}
		
		//get the normalization factor (as the gaussian has been clamped)
		for (int j = 0; j < mSize; ++j)
		{
			Z += kernel[j];
		}
		
		//read out the texels
		for (int i=-kSize; i <= kSize; ++i)
		{
			for (int j=-kSize; j <= kSize; ++j)
			{
				final_colour += kernel[kSize+j]*kernel[kSize+i]*texture2D(inputBuffer, uv+vec2(float(i),float(j)) / resolution.xy).rgb;
			}
		}

		outputColor = vec4(final_colour/(Z*Z), 1.0);


    // vec3 col = vec3(0.,0.,0.);
    // float kSize = 5.;
    // for (float i=-kSize; i <= kSize; ++i)
    // {
    //     for (float j=-kSize; j <= kSize; ++j)
    //     {
    //         col += texture2D(inputBuffer, uv+vec2(float(i),float(j)) / resolution.xy).rgb;
    //     }
    // }
    // //divide the sum of values by the amount of samples
    // outputColor = vec4(col/(2.*kSize+1.)/(2.*kSize+1.),1.0);
}
`

export default class BlurEffect extends Effect {
    constructor(props){
        super(
            'PencilEffect',
            fragmentShader,
            {
                uniforms: new Map([
                    ['mSize', new Uniform(props.strength)],
                    ['sigma', new Uniform(props.gamma)]
                ])
            }
        )
    }

    update(renderer,inputBuffer,deltaTime){
        // this.uniforms.get('offset').value += deltaTime;
    }

}