"use client"
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { GuestCounterProps } from '@/types';



export const GuestCounter: React.FC<GuestCounterProps> = ({ 
  label, 
  count, 
  onIncrement, 
  onDecrement, 
  min = 0, 
  max = 10 
}) => (
  <div className="flex items-center justify-between py-3">
    <span className="text-gray-700 font-medium">{label}</span>
    <div className="flex items-center space-x-3">
      <button
        onClick={onDecrement}
        disabled={count <= min}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-semibold">{count}</span>
      <button
        onClick={onIncrement}
        disabled={count >= max}
        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
); 