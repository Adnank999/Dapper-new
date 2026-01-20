uniform float u_time;

varying vec2 vUv;
varying float vGlobalAlpha;
varying float vRand;
varying float vPointAlpha;

//add extra rainbox color
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  float circle = distance(gl_PointCoord.xy, vec2(0.5));
  circle = 1.0 - smoothstep(0.3, 0.5, circle);

  //vec3 color = vec3(0.17, 0.53, 0.96) * circle;(original)
  //vec3 color = vec3(0.925, 0.0, 0.247) * circle;

  // hue changes across the sprite + over time
  float hue = fract(vUv.x + vUv.y + u_time * 0.0002);

  // vivid rainbow: saturation=1, value=1
  vec3 rainbow = hsv2rgb(vec3(hue, 1.0, 1.0));

  vec3 color = rainbow * circle;
  
  float alpha = circle * vGlobalAlpha;
  alpha *= vPointAlpha;

  gl_FragColor = vec4(color, alpha);
}
