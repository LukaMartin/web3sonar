import React from "react";
import { IoMdRefresh } from "react-icons/io";

type SpinnerProps = {
  size?: number;
  color?: string;
  icon: boolean;
};

export default function LoadingSpinner({
  size = 40,
  color = "#1976d2",
  icon,
}: SpinnerProps) {
  return (
    <div className="spinner-container" style={{ width: size, height: size }}>
      <div
        className="spinner"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {icon && (
        <div className="icon-container">
          <IoMdRefresh size={20} className="text-white/85" />
        </div>
      )}
      <style jsx>{`
        .spinner-container {
          position: relative;
          display: inline-block;
        }
        .spinner {
          display: inline-block;
          border-width: 4px;
          border-style: solid;
          border-radius: 50%;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        .icon-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
