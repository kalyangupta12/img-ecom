"use client"
import { apiClient } from "@/lib/api-client";
import { IProduct } from "@/models/Product";
import { useState,useEffect } from "react";

export default function Home() {
  const[products, setProducts] = useState<IProduct[]>([]);

  useEffect(()=>{
    const fetchProducts = async() => {
      try{
        const data = await apiClient.getProducts();
        setProducts(data);
      }catch(err){
        console.error(err);

      }
    } 
    fetchProducts();
  }, []);
  
  return (
    <div>
    
    </div>
  )
}
