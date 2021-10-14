import * as Three from 'three'

const vertexShader = `
      attribute vec3 aPosition;
      attribute vec3 aColor;
      attribute float aScale;
      attribute float aSpeed;

      varying vec3 vColor;

      varying vec3 vNormal;

      varying float vSpeed;
      void main(){
        vColor = aColor;

        vNormal = normal;

        vSpeed = aSpeed;

        vec3 transformed = position.xyz * aScale;
        transformed += aPosition;
        gl_Position = projectionMatrix* modelViewMatrix * vec4(transformed, 1.);
      }
    `

const fragmentShader = `
      varying vec3 vColor;

      varying vec3 vNormal;

      varying float vSpeed;

      uniform vec3 dirLightDirection;
      uniform vec3 dirLightColor;

      uniform vec3 ambientColor;

      uniform float time;
      void main(){
        vec3 norm = normalize(vNormal);

        vec3 addedLights = vec3(0.0, 0.0, 0.0);

        float nDotL = clamp(dot(dirLightDirection, norm), 0.0, 1.0);

        vec3 diffuseColor = dirLightColor * vColor * nDotL;

        float alpha = sin(time * vSpeed) * 0.25 + 0.75;

        gl_FragColor = vec4(diffuseColor + ambientColor * vColor, alpha);
      }
    `

const material = new Three.ShaderMaterial({
  uniforms: {
    dirLightColor: { value: new Three.Color(0xFFFFFF) },
    dirLightDirection: { value: new Three.Vector3(0.0, 0.0, 1.0) },
    ambientColor: { value: new Three.Color(0xD3D3D3) },
    time: { value: 0.0 }
  },
  fragmentShader: fragmentShader,
  vertexShader: vertexShader,
  blending: Three.AdditiveBlending, // mix color of two overlapped sphere
  transparent: true, // must set true to make material transparent
  depthWrite: false // partly solve the covering issue
})

const baseGeom = new Three.SphereBufferGeometry(480, 32, 32)

export function getBvSpheres(positions, colors, scales, speeds) {
  const instancedGeom = new Three.InstancedBufferGeometry().copy(baseGeom)
  instancedGeom.instanceCount = colors.length

  instancedGeom.setAttribute(
    'aColor',
    new Three.InstancedBufferAttribute(new Float32Array(colors), 3)
  )
  instancedGeom.setAttribute(
    'aPosition',
    new Three.InstancedBufferAttribute(new Float32Array(positions), 3)
  )
  instancedGeom.setAttribute(
    'aScale',
    new Three.InstancedBufferAttribute(new Float32Array(scales), 1)
  )
  instancedGeom.setAttribute(
    'aSpeed',
    new Three.InstancedBufferAttribute(new Float32Array(speeds), 1)
  )

  return new Three.Mesh(instancedGeom, new Three.ShaderMaterial().copy(material))
}
