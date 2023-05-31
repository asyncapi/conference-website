import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ThreeGlobe from 'three-globe';
import countries from './globe-data.min.json';
import { paths, venues } from './data';

const GlobeComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let renderer, camera, scene, controls;
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let Globe;
    let ref = containerRef.current;

    init();
    initGlobe();
    onWindowResize();
    animate();

    // Initializing core ThreeJS elements
    function init() {
      // Initialize renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Initialize scene, light
      scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));

      // Initialize camera, light
      camera = new THREE.PerspectiveCamera();
      camera.updateProjectionMatrix();

      var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dLight.position.set(-800, 2000, 400);
      camera.add(dLight);

      var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
      dLight1.position.set(-200, 500, 200);
      camera.add(dLight1);

      var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
      dLight2.position.set(-200, 500, 200);
      camera.add(dLight2);

      camera.position.z = 400;
      camera.position.x = 0;
      camera.position.y = 0;

      scene.add(camera);

      // Additional effects
      scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

      // Initialize controls
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dynamicDampingFactor = 0.01;
      controls.enablePan = false;
      controls.minDistance = 300;
      controls.maxDistance = 500;
      controls.rotateSpeed = 0.8;
      controls.zoomSpeed = 1;
      controls.autoRotate = true;

      controls.minPolarAngle = Math.PI / 3.5;
      controls.maxPolarAngle = Math.PI - Math.PI / 3;

      window.addEventListener('resize', onWindowResize, false);
      document.addEventListener('mousemove', onMouseMove);
    }

    // Globe
    function initGlobe() {
      // Initialize the Globe
      Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(true)
        .atmosphereColor('#3a228a')
        .atmosphereAltitude(0.25)
        .hexPolygonColor((e) => {
          if (
            ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
              e.properties.ISO_A3
            )
          ) {
            return "rgba(255,255,255, 1)";
          } else return "rgba(255,255,255, 0.7)";
        })
        .customLayerData(venues)
        .customThreeObject(d => {
          const marker = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            new THREE.MeshBasicMaterial({ color: "#ffffff" })
          );
          marker.userData = d;

          return marker;
        })
        .customThreeObjectUpdate((obj, d) => {
          Object.assign(obj.position, Globe.getCoords(d.lat, d.lng, d.alt));
        });

      // Arc animations are followed after the globe enters the scene
      setTimeout(() => {
        Globe.arcsData(paths)
          .arcColor((e) => {
            return e.status ? "#9cff00" : "#FF4000";
          })
          .arcAltitude((e) => {
            return e.arcAlt;
          })
          .arcStroke((e) => {
            return e.status ? 0.5 : 0.3;
          })
          .arcDashLength(0.9)
          .arcDashGap(4)
          .arcDashAnimateTime(1000)
          .arcsTransitionDuration(1000)
          .arcDashInitialGap((e) => e.order * 1)
          .pointsData(venues)
          .pointColor(() => "#ffffff")
          .pointsMerge(true)
          .pointAltitude(0.07)
          .pointRadius(0.25);
      }, 1000);

      Globe.rotateY(-Math.PI * (5 / 9));
      Globe.rotateZ(-Math.PI / 6);
      const globeMaterial = Globe.globeMaterial();
      globeMaterial.color = new THREE.Color(0x3a228a);
      globeMaterial.emissive = new THREE.Color(0x220038);
      globeMaterial.emissiveIntensity = 0.1;
      globeMaterial.shininess = 0.7;

      scene.add(Globe);
    }

    function onMouseMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    function onWindowResize() {
      console.log(containerRef.current.offsetWidth);
      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      if(containerRef.current.offsetWidth < 600) { controls.minDistance = 500;}
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    }

    function animate() {
      camera.position.x +=
        Math.abs(mouseX) <= windowHalfX / 2
          ? (mouseX / 2 - camera.position.x) * 0.005
          : 0;
      camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
      camera.lookAt(scene.position);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    return () => {
      // Cleanup function
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onMouseMove);
      ref.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ maxWidth: '100%', height: '100%' }}/>;
};

export default GlobeComponent;

