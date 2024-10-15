// src/app/components/Timer.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Timer from "./timer";
import { describe , test } from "node:test";
import '@testing-library/jest-dom';

describe("Timer Component", () => {
  test("renders the timer", () => {
    render(<Timer />);
    expect(screen.getByText(/Digital Timer/i)).toBeInTheDocument();
    expect(screen.getByText(/00:00/i)).toBeInTheDocument();
  });

  test("starts the timer when Start button is clicked", () => {
    jest.useFakeTimers();
    render(<Timer />);

    fireEvent.click(screen.getByText(/Start/i));
    expect(screen.getByText(/Pause/i)).toBeInTheDocument();

    jest.advanceTimersByTime(60000); 
    expect(screen.getByText(/00:59/i)).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("resets the timer when Reset button is clicked", () => {
    jest.useFakeTimers();
    render(<Timer />);

    fireEvent.click(screen.getByText(/Start/i));
    jest.advanceTimersByTime(60000); 
    fireEvent.click(screen.getByText(/Reset/i));

    expect(screen.getByText(/00:00/i)).toBeInTheDocument();

    jest.useRealTimers();
  });
});
