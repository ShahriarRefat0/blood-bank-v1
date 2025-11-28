import React from 'react'

export default function loading() {
  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center">
        <span className="loading loading-ring loading-xl text-red-600"></span>
      </div>
    </div>
  );
}
