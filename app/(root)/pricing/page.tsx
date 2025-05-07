"use client";

import React, { useState } from 'react';

const PricingTable: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annually'>('Monthly');

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Find the Perfect Plan for Your Needs</h1>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-slate-300 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('Monthly')}
            className={`px-6 cursor-pointer py-2 rounded-md font-medium ${billingCycle === 'Monthly' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('Annually')}
            className={`px-6 py-2 cursor-pointer rounded-md font-medium ${billingCycle === 'Annually' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600'}`}
          >
            Annually
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Freetancer Plan */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-[30px] text-center font-bold mb-2">Basic 30GB</h3>
          <p className=" mb-6">Get stuff faster, then play it in HD. Suitable for light use</p>
          <div className="mb-6">
            <span className="text-3xl font-bold">
              ₹{billingCycle === 'Monthly' ? '519' : '4999'}<span className="text-lg font-normal">/{billingCycle === 'Monthly' ? 'month' : 'year'}</span>
            </span>
            {billingCycle === 'Annually' && (
              <span className="text-sm text-gray-500 block">Billed annually</span>
            )}
          </div>
          <span className='mb-2 text-sm block text-orange-300'>30% Off for a Limited Time!</span>
          <button className="w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-700 transition-colors mb-8">
            {/* Buy plan */} Coming soon..
          </button>
          <ul className="space-y-3">
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              30GB
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              2 Links at a Time
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Seedr Ultra© Download Servers
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              1:1 Ratio or 12h
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              HD Streaming
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              8 Download Connections To Device
            </li>
          </ul>
        </div>

        {/* Startup Plan */}
        <div className="border-2 border-blue-500 rounded-lg p-6 hover:shadow-lg transition-shadow relative">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-[3px]">
            Most popular
          </div>
          <h3 className=" text-[30px] text-center  font-bold mb-2">Pro 100GB</h3>
          <p className=" mb-6">Get stuff even faster, use private trackers, and save more files.</p>
          <div className="mb-6">
            <span className="text-3xl font-bold">
              ₹{billingCycle === 'Monthly' ? '749' : '8999'}<span className="text-lg font-normal">/{billingCycle === 'Monthly' ? 'month' : 'year'}</span>
            </span>
            {billingCycle === 'Annually' && (
              <span className="text-sm text-gray-500 block">Billed annually</span>
            )}
          </div>
          <span className='mb-2 text-sm block text-orange-300'>35% Off for a Limited Time!</span>
          <button className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition-colors mb-8">
            {/* Buy plan */}  Coming soon..
          </button>
          <ul className="space-y-3">
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              100GB
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              5 Links at a Time
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Including All Basic Features
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              High-Speed FTP
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              2:1 Ratio or 24 Hours
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Private Tracker Support
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Static IP For Private Trackers
            </li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-[30px] text-center font-bold mb-2">Master 1TB</h3>
          <p className=" mb-6">Get everything, mount Seedr as a network drive, or even test your scripting skills with our API!</p>
          <div className="mb-6">
            <span className="text-3xl font-bold">
              ₹{billingCycle === 'Monthly' ? '1499' : '14999'}<span className="text-lg font-normal">/{billingCycle === 'Monthly' ? 'month' : 'year'}</span>
            </span>
            {billingCycle === 'Annually' && (
              <span className="text-sm text-gray-500 block">Billed annually</span>
            )}
          </div>
          <span className='mb-2 text-sm block text-orange-300'>40% Off for a Limited Time!</span>
          <button className="w-full cursor-pointer bg-gray-800 text-white py-2 rounded-md font-medium hover:bg-gray-700 transition-colors mb-8">
            {/* Buy plan */}  Coming soon..
          </button>
          <ul className="space-y-3">
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              1024GB
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              25 Links at a Time
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Including All Basic & Pro Features
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              WebDAV Drive & High-Speed FTP
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              5:1 Ratio or 5 Days
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              First Priority Support
            </li>
            <li className="flex items-center ">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              REST API Access
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;