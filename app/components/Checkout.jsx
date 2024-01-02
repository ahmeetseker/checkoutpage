"use client";

import React, { useState } from "react";

import { MinusIcon, PlusIcon, CrossCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Checkout = () => {

  
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Vintage Backbag",
      price: 20,
      discountedPrice: 34.99,
      imageSrc: "https://picsum.photos/100/100",
    },

    {
      id: 2,
      name: "Vinasas",
      price: 25,
      discountedPrice: 32.99,
      imageSrc: "https://picsum.photos/100/100",
    },
    // Add more items as needed
  ]);



const [goals, setGoals] = useState(Array(items.length).fill(0));

  const onClick = (index, value) => {
    const newGoals = [...goals];
    newGoals[index] += value;
    setGoals(newGoals);
  };

  const calculateTotal = () => {
    let subtotal = 0;

    items.forEach((item, index) => {
      subtotal += goals[index] * item.price;
    });

    const kdvPercentage = 18;
    const kdv = (subtotal * kdvPercentage) / 100;

    const total = subtotal + kdv;

    return {
      subtotal: subtotal.toFixed(2),
      kdv: kdv.toFixed(2),
      total: total.toFixed(2),
    };
  }

  const removeItem = (index) => {
    const newItems = [...items];
    const newGoals = [...goals];

    newItems.splice(index, 1);
    newGoals.splice(index, 1);

    setItems(newItems);
    setGoals(newGoals);
  };
 return (
  <>
   <Drawer>
    <DrawerTrigger asChild>
     <Button variant="outline">Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
     <div className="mx-auto space-y-4 w-full max-w-sm">
      <DrawerHeader>
       <DrawerTitle>Sepetim</DrawerTitle>
      </DrawerHeader>

      
      {items.map((item, index) => (
        <Card key={item.id}>
        <div   className="p-4 justify-between flex">
          <div className="flex shrink-0">
            <img
              className="h-[100px] r object-fit-cover rounded-sm"
              src={item.imageSrc}
              alt=""
            />
          </div>

          <div className="ml-2 space-y-2 product-info">
            <h2 className="truncate">{item.name}</h2>
            <div className="product-price">
              <p>
                <strong>{item.price}</strong>{" "}
                <span className="line-through">{item.discountedPrice}</span>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 shrink-0 rounded-full"
                onClick={() => onClick(index, -1)}
                disabled={goals[index] <= 0}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="text-center">
                <div className="text-sm font-bold tracking-tighter">
                  {goals[index]}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 shrink-0 rounded-full"
                onClick={() => onClick(index, 1)}
                disabled={goals[index] >= 400}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>

          <div className="flex justify-end">
            <button  onClick={() => removeItem(index)} className="hover:text-red-500">
              <CrossCircledIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        </Card>
      ))}


    

      <DrawerClose asChild></DrawerClose>
     </div>

     <DrawerFooter className="mt-0">

      
      <div class="buy-detail border-b  p-2 ">
       <p className="font-bold">Ara Toplam:</p>
       <p>   ${calculateTotal().subtotal}</p>
      </div>
      <div class="buy-detail border-b p-2">
       <p  className="font-bold">Tax(%18)</p>
       <p>${calculateTotal().kdv}</p>
      </div>  
      <div class="buy-detail border-b p-2">
       <p  className="font-bold">Total</p>
       <p>  ${calculateTotal().total} </p>
      </div>
   

      
     </DrawerFooter>
    </DrawerContent>
   </Drawer>
  </>
 );
};

export default Checkout;
