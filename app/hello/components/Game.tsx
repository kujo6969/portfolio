"use client";
import { useRef, useEffect, useState } from "react";

const CANVAS_SIZE = 400;
const SCALE = 20;
const ROWS = CANVAS_SIZE / SCALE;

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface Position {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [dir, setDir] = useState<Direction>(Direction.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const randomFood = () => ({
    x: Math.floor(Math.random() * ROWS),
    y: Math.floor(Math.random() * ROWS),
  });

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (dir !== Direction.DOWN) setDir(Direction.UP);
          break;
        case "ArrowDown":
          if (dir !== Direction.UP) setDir(Direction.DOWN);
          break;
        case "ArrowLeft":
          if (dir !== Direction.RIGHT) setDir(Direction.LEFT);
          break;
        case "ArrowRight":
          if (dir !== Direction.LEFT) setDir(Direction.RIGHT);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      setSnake((prev) => {
        const head = { ...prev[prev.length - 1] };

        switch (dir) {
          case Direction.UP:
            head.y -= 1;
            break;
          case Direction.DOWN:
            head.y += 1;
            break;
          case Direction.LEFT:
            head.x -= 1;
            break;
          case Direction.RIGHT:
            head.x += 1;
            break;
        }

        if (head.x < 0 || head.x >= ROWS || head.y < 0 || head.y >= ROWS) {
          setGameOver(true);
          return prev;
        }

        if (
          prev.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [...prev, head];

        if (head.x === food.x && head.y === food.y) {
          setFood(randomFood());
          setScore((s) => s + 1);
        } else {
          newSnake.shift();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.fillStyle = "red";
    ctx.shadowColor = "rgba(255,0,0,0.6)";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(
      food.x * SCALE + SCALE / 2,
      food.y * SCALE + SCALE / 2,
      SCALE / 2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    if (snake.length > 1) {
      ctx.strokeStyle = "#0f0";
      ctx.lineWidth = SCALE;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      snake.forEach((segment, i) => {
        const x = segment.x * SCALE + SCALE / 2;
        const y = segment.y * SCALE + SCALE / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    } else {
      const s = snake[0];
      ctx.fillStyle = "#0f0";
      ctx.beginPath();
      ctx.arc(
        s.x * SCALE + SCALE / 2,
        s.y * SCALE + SCALE / 2,
        SCALE / 2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText("Game Over", CANVAS_SIZE / 2 - 80, CANVAS_SIZE / 2);
    }
  }, [snake, food, score, gameOver]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(randomFood());
    setDir(Direction.RIGHT);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{ border: "2px solid white", backgroundColor: "#111" }}
      />
      <div style={{ marginTop: 10 }}>
        <button
          onClick={restartGame}
          style={{ padding: "10px 20px", fontSize: 16 }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
