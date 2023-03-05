import "./../styles.css"
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three";

function Wall(props) {


    return (
        <>
        <Plane position={props.position} scale={props.scale} rotation={props.rotation}/>
        </>
    );
}

function Plane(props) {

    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "textures/hospedale-prova.jpg",
        process.env.PUBLIC_URL + "textures/hospedale-prova.jpg",
      ]);
    
      useEffect(() => {
        [normal, roughness].forEach((t) => {
          t.wrapS = RepeatWrapping;
          t.wrapT = RepeatWrapping;
          t.repeat.set(1, 1);
          t.offset.set(0, 0);
        });
    
        normal.encoding = LinearEncoding;
        roughness.encoding= LinearEncoding;
      }, [normal, roughness]);

      //          color={'#228930'}

    return (
        <mesh position={props.position} scale={props.scale} rotation={props.rotation}>
            <planeBufferGeometry attach="geometry" />
            <MeshReflectorMaterial
          envMapIntensity={0}
          normalMap={normal}
          normalScale={[0.15, 0.15]}
          roughnessMap={roughness}
          dithering={true}
          roughness={0.7}
          color={[0.015,0.075,0.065]}
          blur={0} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={0} // How much blur mixes with surface roughness (default = 1)
          mixStrength={0} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          debug={0}
          reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
        />
        </mesh>
    );
}

export { Wall };