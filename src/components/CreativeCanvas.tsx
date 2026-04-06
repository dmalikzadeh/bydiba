"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const VERTEX_SHADER = `
attribute float size;
attribute vec3 customColor;
varying vec3 vColor;

void main() {
  vColor = customColor;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT_SHADER = `
uniform sampler2D pointTexture;
varying vec3 vColor;

void main() {
  vec4 tex = texture2D(pointTexture, gl_PointCoord);
  gl_FragColor = vec4(vColor, tex.a);
}
`;

const TEXT_LINES = ["MADE", "BY DIBA"];

type ParticleData = {
  positions: number[];
  colors: number[];
  sizes: number[];
};

function mixColors(from: THREE.Color, to: THREE.Color, amount: number) {
  return from.clone().lerp(to, amount);
}

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(0.4, "rgba(0,0,0,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function visibleHeightAtZDepth(depth: number, camera: THREE.PerspectiveCamera) {
  const cameraOffset = camera.position.z;
  const adjustedDepth =
    depth < cameraOffset ? depth - cameraOffset : depth + cameraOffset;
  const vFov = (camera.fov * Math.PI) / 180;
  return 2 * Math.tan(vFov / 2) * Math.abs(adjustedDepth);
}

function visibleWidthAtZDepth(depth: number, camera: THREE.PerspectiveCamera) {
  return visibleHeightAtZDepth(depth, camera) * camera.aspect;
}

function createTextParticles(
  font: ReturnType<FontLoader["parse"]>,
  camera: THREE.PerspectiveCamera,
) {
  const viewportWidth = visibleWidthAtZDepth(0, camera);
  const viewportHeight = visibleHeightAtZDepth(0, camera);
  const textSize = Math.min(viewportWidth * 0.14, viewportHeight * 0.22);
  const lineHeight = textSize * 1.2;
  const totalHeight = lineHeight * (TEXT_LINES.length - 1);

  const baseTop = new THREE.Color("#111111");
  const baseBottom = new THREE.Color("#555555");

  const colors: number[] = [];
  const sizes: number[] = [];
  const positions: number[] = [];

  TEXT_LINES.forEach((line, lineIndex) => {
    const shapes = font.generateShapes(line, textSize);
    const holes = shapes.flatMap((shape) => shape.holes ?? []);
    const allShapes = [...shapes, ...holes];

    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;

    if (!boundingBox) {
      geometry.dispose();
      return;
    }

    const lineWidth = boundingBox.max.x - boundingBox.min.x;
    const lineBoxHeight = boundingBox.max.y - boundingBox.min.y;
    const centerOffsetX = -boundingBox.min.x - lineWidth / 2;
    const centerOffsetY =
      -boundingBox.min.y -
      lineBoxHeight / 2 +
      totalHeight / 2 -
      lineIndex * lineHeight;

    const sampleCount = Math.max(80, Math.round(textSize * 5));

    allShapes.forEach((shape) => {
      shape.getSpacedPoints(sampleCount).forEach((point) => {
        const x = point.x + centerOffsetX;
        const y = point.y + centerOffsetY;
        const z = THREE.MathUtils.randFloatSpread(1.5);

        const mixFactor = THREE.MathUtils.clamp(
          (y + viewportHeight / 4) / (viewportHeight / 2),
          0,
          1,
        );
        const color = mixColors(baseBottom, baseTop, mixFactor);

        positions.push(x, y, z);
        colors.push(color.r, color.g, color.b);
        sizes.push(2.2 + Math.random() * 1.4);
      });
    });

    geometry.dispose();
  });

  return { positions, colors, sizes } satisfies ParticleData;
}

export default function CreativeCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000);
    camera.position.set(0, 0, 160);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.position = "absolute";
    container.appendChild(renderer.domElement);

    const font = new FontLoader().parse(helvetiker);
    const texture = createParticleTexture();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-9999, 9999);
    const pointerDown = { current: false };

    const interactionPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
      }),
    );
    scene.add(interactionPlane);

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      blending: THREE.NormalBlending,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    let particles: THREE.Points<
      THREE.BufferGeometry,
      THREE.ShaderMaterial
    > | null = null;
    let restPositions = new Float32Array();
    let restColors = new Float32Array();
    let restSizes = new Float32Array();
    let positionArray!: Float32Array;
    let colorArray!: Float32Array;
    let sizeArray!: Float32Array;

    const idleColor = new THREE.Color("#1a1a1a");
    const hoverColor = new THREE.Color("#c0654a");
    const clickColor = new THREE.Color("#e07a5f");

    const rebuild = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      const planeWidth = visibleWidthAtZDepth(0, camera);
      const planeHeight = visibleHeightAtZDepth(0, camera);
      interactionPlane.scale.set(planeWidth, planeHeight, 1);

      const particleData = createTextParticles(font, camera);
      const geometry = new THREE.BufferGeometry();

      const posAttr = new THREE.Float32BufferAttribute(
        particleData.positions,
        3,
      );
      const colAttr = new THREE.Float32BufferAttribute(particleData.colors, 3);
      const sizeAttr = new THREE.Float32BufferAttribute(particleData.sizes, 1);

      posAttr.setUsage(THREE.DynamicDrawUsage);
      colAttr.setUsage(THREE.DynamicDrawUsage);
      sizeAttr.setUsage(THREE.DynamicDrawUsage);

      geometry.setAttribute("position", posAttr);
      geometry.setAttribute("customColor", colAttr);
      geometry.setAttribute("size", sizeAttr);

      if (particles) {
        scene.remove(particles);
        particles.geometry.dispose();
      }

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      restPositions = new Float32Array(particleData.positions);
      restColors = new Float32Array(particleData.colors);
      restSizes = new Float32Array(particleData.sizes);
      positionArray = posAttr.array as Float32Array;
      colorArray = colAttr.array as Float32Array;
      sizeArray = sizeAttr.array as Float32Array;
    };

    rebuild();

    const getHitPoint = () => {
      raycaster.setFromCamera(pointer, camera);
      const [hit] = raycaster.intersectObject(interactionPlane);
      return hit?.point ?? null;
    };

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => {
      pointer.set(-9999, 9999);
      pointerDown.current = false;
    };
    const onDown = () => {
      pointerDown.current = true;
    };
    const onUp = () => {
      pointerDown.current = false;
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    container.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(container);

    let frameId = 0;
    let isInView = false;
    let isPageVisible = document.visibilityState === "visible";

    const stopRender = () => {
      if (!frameId) return;
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const render = () => {
      frameId = requestAnimationFrame(render);
      if (!particles) return;

      const hitPoint = getHitPoint();
      const time = performance.now() * 0.001;
      const radius = pointerDown.current ? 24 : 18;
      const lift = pointerDown.current ? 6 : 3;

      for (let i = 0; i < sizeArray.length; i++) {
        const bi = i * 3;
        const ox = restPositions[bi];
        const oy = restPositions[bi + 1];
        const oz = restPositions[bi + 2];

        let cx = positionArray[bi];
        let cy = positionArray[bi + 1];
        let cz = positionArray[bi + 2];

        const tx = ox + Math.sin(time * 0.7 + oy * 0.07 + i * 0.02) * 0.15;
        const ty = oy + Math.cos(time * 0.5 + ox * 0.05 + i * 0.015) * 0.1;
        const tz = oz + Math.sin(time * 1.1 + ox * 0.03) * 0.8;

        let tr = restColors[bi];
        let tg = restColors[bi + 1];
        let tb = restColors[bi + 2];
        let ts = restSizes[i];

        if (hitPoint) {
          const dx = cx - hitPoint.x;
          const dy = cy - hitPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const force = (radius - Math.max(dist, 0.001)) / radius;
            const angle = Math.atan2(dy, dx);
            const push = pointerDown.current ? 7 : 3;

            cx += Math.cos(angle) * force * push;
            cy += Math.sin(angle) * force * push;
            cz += force * lift;

            const c = mixColors(
              idleColor,
              pointerDown.current ? clickColor : hoverColor,
              force * 0.85,
            );
            tr = c.r;
            tg = c.g;
            tb = c.b;
            ts = restSizes[i] + force * (pointerDown.current ? 3.5 : 1.8);
          }
        }

        const ease = pointerDown.current ? 0.05 : 0.08;
        positionArray[bi] = cx + (tx - cx) * ease;
        positionArray[bi + 1] = cy + (ty - cy) * ease;
        positionArray[bi + 2] = cz + (tz - cz) * 0.07;
        colorArray[bi] += (tr - colorArray[bi]) * 0.12;
        colorArray[bi + 1] += (tg - colorArray[bi + 1]) * 0.12;
        colorArray[bi + 2] += (tb - colorArray[bi + 2]) * 0.12;
        sizeArray[i] += (ts - sizeArray[i]) * 0.14;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles.geometry.attributes.customColor.needsUpdate = true;
      particles.geometry.attributes.size.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const startRender = () => {
      if (frameId || !isInView || !isPageVisible) return;
      render();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry?.isIntersecting ?? false;

        if (!isInView) {
          pointer.set(-9999, 9999);
          pointerDown.current = false;
          stopRender();
          return;
        }

        startRender();
      },
      { threshold: 0.1 },
    );

    const onVisibilityChange = () => {
      isPageVisible = document.visibilityState === "visible";

      if (!isPageVisible) {
        stopRender();
        return;
      }

      startRender();
    };

    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopRender();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      container.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      if (particles) {
        scene.remove(particles);
        particles.geometry.dispose();
      }
      interactionPlane.geometry.dispose();
      (interactionPlane.material as THREE.MeshBasicMaterial).dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 touch-none"
      aria-hidden="true"
    />
  );
}
