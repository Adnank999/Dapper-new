"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Group } from "three";
import { SkeletonUtils } from "three-stdlib";
import useIsMobile from "@/hooks/useIsMobile";

useGLTF.preload("/model/spiderman_2099-optimized.glb");

type Props = {
  visible: boolean;
  scrollProgress: React.MutableRefObject<number>;
  animationCompleted: boolean;
  setAnimationCompleted: (v: boolean) => void;
};

const Model2 = ({
  visible,
  scrollProgress,
  animationCompleted,
  setAnimationCompleted,
}: Props) => {
  const group = useRef<Group>(null);

  const gltf = useGLTF("/model/spiderman_2099-optimized.glb") as any;
  const { scene, animations, materials } = gltf;

  // Clone for skeleton-safe animation
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Bind animations to clone
  const { actions } = useAnimations(animations, clone);

  // Force FIRST animation clip
  const clip0 = animations?.[14] as THREE.AnimationClip | undefined;

  // console.log("animation",animations);

  // Cache action + duration once
  const actionRef = useRef<THREE.AnimationAction | null>(null);
  const durationRef = useRef<number>(1);

  const { camera } = useThree();
  const isMobile = useIsMobile();

  const initialCam = useMemo(
    () =>
      new THREE.Vector3(
        -6.782809400330284,
        0.3973643603409034,
        1.4024392340644003
      ),
    []
  );

  const targetCam = useMemo(
    () =>
      new THREE.Vector3(
        -2.095299586023116,
        0.16848200250957298,
        2.8664879130829286
      ),
    []
  );

  const modelPosition: [number, number, number] = isMobile
    ? [0, -1, 0]
    : [-1, -1, 0];

  // One-time material tweak
  useEffect(() => {
    const bodyMat = materials?.hero_spiderman209901_S02_04 as
      | THREE.MeshStandardMaterial
      | undefined;

    if (bodyMat) {
      bodyMat.emissive = new THREE.Color(0x800000);
      bodyMat.emissiveIntensity = 2;
      bodyMat.needsUpdate = true;
    }
  }, [materials]);

  useEffect(() => {
    // Wait for both actions and clip0
    if (!actions || !clip0) return;

    const a = actions[clip0.name] || null;

    actionRef.current = a;
    durationRef.current = clip0.duration || 1;

    if (a) {
      // Start and pause for scrubbing
      a.reset();
      a.play();
      a.paused = true;
      a.enabled = true;
    }
  }, [actions, clip0]);

  useFrame(() => {
    const p = THREE.MathUtils.clamp(scrollProgress.current || 0, 0, 1);

    // Camera lerp
    camera.position.lerpVectors(initialCam, targetCam, p);
    camera.lookAt(0, 0, 0);

    // Scrub FIRST clip
    const a = actionRef.current;
    if (a) {
      a.time = durationRef.current * p;
      // If you ever see it not updating, uncomment:
      // a.getMixer().update(0);
    }

    if (p >= 0.999 && !animationCompleted) {
      setAnimationCompleted(true);
    }
  });

  return (
    <group
      ref={group}
      position={modelPosition}
      visible={visible}
      dispose={null}
    >
      <primitive object={clone} />
    </group>
  );
};

export default Model2;
