"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function TornadoParticles({ count = 2000 }) {
    const points = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Tornado shape logic
            const angle = Math.random() * Math.PI * 2;
            const radius = 2 + Math.random() * 5; // Base radius
            const y = (Math.random() - 0.5) * 20; // Height spread

            // Spiral effect: radius increases with height or stays chaotic
            const spiralRadius = radius + Math.abs(y) * 0.5;

            const x = Math.cos(angle) * spiralRadius;
            const z = Math.sin(angle) * spiralRadius;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        return positions;
    }, [count]);

    useFrame((state, delta) => {
        if (points.current) {
            points.current.rotation.y += delta * 0.2; // Rotate the tornado
            points.current.rotation.z += delta * 0.05; // Slight tilt rotation
        }
    });

    return (
        <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ff2a2a" // Scarlet
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function Debris() {
    // Placeholder for larger floating debris (cubes for now)
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const count = 50;

    const dummy = new THREE.Object3D();

    useMemo(() => {
        // Initialize positions, strictly done in render loop or setup if static.
        // For performance, just random positions here
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            const t = time + i * 100;
            const radius = 5 + Math.sin(t * 0.1) * 2;
            const y = Math.cos(t * 0.2) * 5;

            dummy.position.set(
                Math.cos(t * 0.5) * radius,
                y,
                Math.sin(t * 0.5) * radius
            );
            dummy.rotation.x = t * 0.2;
            dummy.rotation.z = t * 0.3;
            dummy.scale.setScalar(0.2 + Math.random() * 0.3); // Varies size

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff8c00" wireframe />
        </instancedMesh>
    );
}

export default function MultiverseBackground() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <fog attach="fog" args={['#050505', 10, 25]} />
                <ambientLight intensity={0.5} />
                <TornadoParticles />
                <Debris />
            </Canvas>
        </div>
    );
}
