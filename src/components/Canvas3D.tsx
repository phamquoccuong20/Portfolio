import React, { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number; // original x
  oy: number; // original y
  oz: number; // original z
}

interface Label3D {
  text: string;
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  color: string;
}

interface Packet3D {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

export default function Canvas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Create 3D points on a sphere shell
    const pointsCount = 120;
    const points: Point3D[] = [];
    const radius = 220;

    for (let i = 0; i < pointsCount; i++) {
      // Golden spiral distribution on sphere surface (very uniform and clean)
      const phi = Math.acos(-1 + (2 * i) / pointsCount);
      const theta = Math.sqrt(pointsCount * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points.push({ x, y, z, ox: x, oy: y, oz: z });
    }

    // 3D Floating Tech labels on a slightly outer shell (radius 260)
    const techTags = [
      { text: "TOS LOGISTICS", phi: 0.6, theta: 1.2, color: "#06b6d4" },
      { text: "SQL PRO v12", phi: 1.8, theta: 2.3, color: "#10b981" },
      { text: "WEBSOCKET SERVER", phi: 2.6, theta: 3.5, color: "#3b82f6" },
      { text: "NODE CORE", phi: 1.1, theta: 4.8, color: "#8b5cf6" },
      { text: "REALTIME MON", phi: 2.1, theta: 0.4, color: "#f59e0b" }
    ];

    const labels: Label3D[] = techTags.map(tag => {
      const rOuter = 250;
      const x = rOuter * Math.sin(tag.phi) * Math.cos(tag.theta);
      const y = rOuter * Math.sin(tag.phi) * Math.sin(tag.theta);
      const z = rOuter * Math.cos(tag.phi);
      return {
        text: tag.text,
        x, y, z,
        ox: x, oy: y, oz: z,
        color: tag.color
      };
    });

    // Autonomous packets flowing between constellation points
    const packets: Packet3D[] = [];
    const maxPackets = 15;

    // Helper to find neighboring points
    const getNeighbors = (pointIndex: number, maxCount = 4) => {
      const neighbors: number[] = [];
      const pt = points[pointIndex];
      const items = points.map((p, idx) => {
        const dx = p.ox - pt.ox;
        const dy = p.oy - pt.oy;
        const dz = p.oz - pt.oz;
        const dist = dx * dx + dy * dy + dz * dz;
        return { idx, dist };
      });
      items.sort((a, b) => a.dist - b.dist);
      // Skip item 0 which is self
      for (let i = 1; i <= maxCount; i++) {
        if (items[i] && items[i].dist < 40000) {
          neighbors.push(items[i].idx);
        }
      }
      return neighbors;
    };

    // Handle resizing accurately
    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Keep track of mouse movement with easing
    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const midX = rect.left + rect.width / 2;
      const midY = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - midX) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - midY) / (rect.height / 2);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Easing variables for rotation angles
    let angleX = 0;
    let angleY = 0;

    const render = () => {
      // Clear with soft Slate backtrail
      ctx.fillStyle = "rgba(248, 250, 252, 0.08)"; 
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Incremental rotation (Auto spin + mouse control)
      angleY = mouseRef.current.x * 0.4 + Date.now() * 0.00012;
      angleX = mouseRef.current.y * 0.4 + Date.now() * 0.00008;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const centerX = width / 2;
      const centerY = height / 2;
      const perspective = 350;

      // Project 3D points to 2D
      const projected: { sx: number; sy: number; scale: number; alpha: number; z: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // Rotate Y-axis
        let x1 = pt.ox * cosY - pt.oz * sinY;
        let z1 = pt.ox * sinY + pt.oz * cosY;

        // Rotate X-axis
        let y2 = pt.oy * cosX - z1 * sinX;
        let z2 = pt.oy * sinX + z1 * cosX;

        // Perspective Projection
        const scale = perspective / (perspective + z2);
        const sx = x1 * scale + centerX;
        const sy = y2 * scale + centerY;

        // Visual properties
        const alpha = Math.min(1, Math.max(0.12, (perspective - z2) / (perspective * 1.5)));
        projected.push({ sx, sy, scale, alpha, z: z2 });

        // Draw particle
        ctx.beginPath();
        ctx.arc(sx, sy, scale * 2.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.75})`;
        ctx.fill();

        if (scale > 1.15) {
          ctx.beginPath();
          ctx.arc(sx, sy, scale * 4.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.14})`;
          ctx.fill();
        }
      }

      // Draw structural constellation lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        const pi = projected[i];
        let linkCount = 0;
        const maxLinks = 4;

        for (let j = i + 1; j < projected.length; j++) {
          if (linkCount >= maxLinks) break;

          const pj = projected[j];
          const distZ = pi.z - pj.z;
          const distX = pi.sx - pj.sx;
          const distY = pi.sy - pj.sy;
          const distSq = distX * distX + distY * distY;

          if (distSq < 4800 && Math.abs(distZ) < 180) {
            linkCount++;
            const avgAlpha = (pi.alpha + pj.alpha) / 2;
            ctx.beginPath();
            ctx.moveTo(pi.sx, pi.sy);
            ctx.lineTo(pj.sx, pj.sy);
            ctx.strokeStyle = `rgba(6, 182, 212, ${avgAlpha * 0.16})`;
            ctx.stroke();
          }
        }
      }

      // Spawning / driving packets randomly
      if (packets.length < maxPackets && Math.random() < 0.04) {
        const fromIndex = Math.floor(Math.random() * points.length);
        const neighbors = getNeighbors(fromIndex, 3);
        if (neighbors.length > 0) {
          const toIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
          packets.push({
            fromIndex,
            toIndex,
            progress: 0,
            speed: 0.015 + Math.random() * 0.02
          });
        }
      }

      // Render packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const pFrom = points[pkt.fromIndex];
        const pTo = points[pkt.toIndex];

        // Linear interpolation in 3D
        const px = pFrom.ox + (pTo.ox - pFrom.ox) * pkt.progress;
        const py = pFrom.oy + (pTo.oy - pFrom.oy) * pkt.progress;
        const pz = pFrom.oz + (pTo.oz - pFrom.oz) * pkt.progress;

        // Perform rotation matching camera
        let x1 = px * cosY - pz * sinY;
        let z1 = px * sinY + pz * cosY;
        let y2 = py * cosX - z1 * sinX;
        let z2 = py * sinX + z1 * cosX;

        const scale = perspective / (perspective + z2);
        const sx = x1 * scale + centerX;
        const sy = y2 * scale + centerY;
        const alpha = Math.min(1, Math.max(0.2, (perspective - z2) / (perspective * 1.5)));

        // Drawing glowing packet particle
        ctx.beginPath();
        ctx.arc(sx, sy, scale * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.9})`; // Green color represents data flows
        ctx.fill();

        // Optional tiny glow ring
        ctx.beginPath();
        ctx.arc(sx, sy, scale * 7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Render Projected 3D technology text labels
      for (let m = 0; m < labels.length; m++) {
        const lbl = labels[m];

        // Rotate
        let x1 = lbl.ox * cosY - lbl.oz * sinY;
        let z1 = lbl.ox * sinY + lbl.oz * cosY;
        let y2 = lbl.oy * cosX - z1 * sinX;
        let z2 = lbl.oy * sinX + z1 * cosX;

        const scale = perspective / (perspective + z2);
        const sx = x1 * scale + centerX;
        const sy = y2 * scale + centerY;
        const alpha = Math.min(1, Math.max(0.1, (perspective - z2) / (perspective * 1.5)));

        // Only draw labels facing the front hemisphere to avoid clutter
        if (z2 < 120) {
          ctx.save();
          // Draw connecting dot
          ctx.beginPath();
          ctx.arc(sx, sy, scale * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = lbl.color;
          ctx.globalAlpha = alpha * 0.8;
          ctx.fill();

          // Connect label text to sphere point with a light dashed line
          ctx.beginPath();
          ctx.setLineDash([2, 3]);
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx + (z2 < 0 ? 15 : -15) * scale, sy - 12 * scale);
          ctx.strokeStyle = `rgba(100, 116, 139, ${alpha * 0.4})`;
          ctx.stroke();

          // Print font label
          ctx.font = `bold ${Math.max(9, Math.round(11 * scale))}px "JetBrains Mono", monospace`;
          ctx.fillStyle = lbl.color;
          ctx.globalAlpha = alpha;
          ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
          ctx.shadowBlur = 4;
          ctx.fillText(
            lbl.text, 
            sx + (z2 < 0 ? 18 : -18) * scale - (z2 >= 0 ? ctx.measureText(lbl.text).width : 0), 
            sy - 8 * scale
          );
          ctx.restore();
        }
      }

      // Draw subtle orbital ring
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 230, 45, angleY * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-transparent"
      id="space-canvas-container"
    >
      <canvas ref={canvasRef} className="block w-full h-full" id="space-3d-canvas" />
    </div>
  );
}

