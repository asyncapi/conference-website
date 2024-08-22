import React from "react";
import Image from 'next/image';
import Link from "next/link";
import "./gallery.module.css";

function Gallery() {
  const images = [
    {
     id:1,
     src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
     id:2,
     src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
     id:3,
     src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
     id:4,
     src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
     id:5,
     src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
     id:6,
     src:"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];
  return (
    <div className="container mt-5">
        <h1 className="text-white font-medium text-center text-[32px] mb-5">OUR EVENT GALLERY</h1>
        <div className=" gallery">
        {images.map((image, index) => {
            return (
                <div className="pics p-2 " key={index}>
                    <img src={image.src} style={{width:'100%'}}></img>
                </div>
            )
        })}
        </div>
        <div className="flex justify-center mt-5">
          <a className="text-white text-center cursor-pointer rounded-md bg-purple-900  w-[108px] p-2 hover:scale-105 duration-200 ease-in-out">
            Browse All
          </a>
        </div>
        
    </div>
  );
}

export default Gallery;
