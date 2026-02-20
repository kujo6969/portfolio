"use client"; // client-side component
import { useRef, useEffect, useState } from "react";

// Game constants
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

  // Generate random food position
  const randomFood = () => ({
    x: Math.floor(Math.random() * ROWS),
    y: Math.floor(Math.random() * ROWS),
  });

  // Game loop
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

    const interval = setInterval(() => {
      if (gameOver) return;

      setSnake((prev) => {
        const newSnake = [...prev];
        const head = { ...newSnake[newSnake.length - 1] };

        // Move head
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

        // Wrap around edges
        head.x = (head.x + ROWS) % ROWS;
        head.y = (head.y + ROWS) % ROWS;

        // Check collision with self
        if (
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y,
          )
        ) {
          setGameOver(true);
          return prev;
        }

        newSnake.push(head);

        // Check food
        if (head.x === food.x && head.y === food.y) {
          setFood(randomFood());
          setScore((prev) => prev + 1);
        } else {
          newSnake.shift(); // move forward
        }

        return newSnake;
      });
    }, 150);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKey);
    };
  }, [dir, food, gameOver]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * SCALE, food.y * SCALE, SCALE, SCALE);

    // Draw snake
    ctx.fillStyle = "#0f0";
    snake.forEach((segment) => {
      ctx.fillRect(segment.x * SCALE, segment.y * SCALE, SCALE, SCALE);
    });

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);

    if (gameOver) {
      ctx.fillStyle = "white";
      ctx.font = "30px Arial";
      ctx.fillText("Game Over", CANVAS_SIZE / 2 - 70, CANVAS_SIZE / 2);
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
