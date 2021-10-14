/*
import * as Three from 'three'
import ball from '../../../../../public/ball.png'
import polyhedron from '../../../../../public/polyhedron.png'
import disc from '../../../../../public/disc.png'

const vertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute float genre;
  attribute float alpha;

  varying vec3 vColor;
  varying float vGenre;
  varying float vAlpha;
  void main() {
    vColor = customColor;

    vGenre = genre;

    vAlpha = alpha;

    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

    gl_PointSize = size * ( 300.0 / -mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 color;
  uniform sampler2D pointTexture[3];

  varying vec3 vColor;
  varying float vGenre;
  varying float vAlpha;

  void main() {

    gl_FragColor = vec4( color * vColor, vAlpha );

    int vIndex = int(vGenre);
    if(vIndex == 2){
      gl_FragColor = gl_FragColor * texture2D( pointTexture[2], gl_PointCoord );
    }else if(vIndex == 1){
      gl_FragColor = gl_FragColor * texture2D( pointTexture[1], gl_PointCoord );
    }else{
      gl_FragColor = gl_FragColor * texture2D( pointTexture[0], gl_PointCoord );
    }
    if ( gl_FragColor.a < ALPHATEST ) discard;
  }
`

const bvPointMaterial = new Three.ShaderMaterial({
  uniforms: {
    color: {
      value: new Three.Color(0xffffff)
    },
    pointTexture: {
      value: [
        new Three.TextureLoader().load(ball),
        new Three.TextureLoader().load(polyhedron),
        new Three.TextureLoader().load(disc)
      ]
    }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  alphaTest: 0.1,
  transparent: true
})

export function getBvPoints(positions, colors, sizes, genres, alphas) {
  const geometry = new Three.BufferGeometry()
  geometry.setAttribute('position', new Three.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('customColor', new Three.Float32BufferAttribute(colors, 3))
  geometry.setAttribute('size', new Three.Float32BufferAttribute(sizes, 1))
  geometry.setAttribute('genre', new Three.Float32BufferAttribute(genres, 1))
  geometry.setAttribute('alpha', new Three.Float32BufferAttribute(alphas, 1))

  return new Three.Points(geometry, bvPointMaterial)
}
*/
