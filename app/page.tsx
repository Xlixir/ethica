"use client"

import axios from "axios";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { ModeToggle } from "./components/toggle"; 

type Review = {
  text: string;
  upvotes: number;
  downvotes: number;
  classification?: 'positive' | 'negative' | 'neutral' | 'unknown';
  date: Date;
}

const Home: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      window.location.href = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string;
    }
  }, [isLoaded, isSignedIn]);

  const handleAddReview = async () => {
    const classification = await handleAnalyse();
    const newReviews = [...reviews, { text: review, upvotes: 0, downvotes: 0, classification, date: new Date() }];
    setReviews(sortReviewsByVotes(newReviews));
    setReview("");
  };

  const sortReviewsByVotes = (reviews: Review[]) => {
    return reviews.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  };

  const handleAnalyse = async (): Promise<'positive' | 'negative' | 'neutral' | 'unknown'> => {
    try {
      const res = await fetch('/api/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reviewText: review })
      });

      const data = await res.json();
      return data.label;
    } catch (error) {
      return user.firstName || 'unknown';
    }
  };

  return (
    <div className="flex flex-col justify-between items-start w-full h-screen p-4">
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-bold italic text-black-600 hover:text-blue-700 transition duration-300 transform hover:scale-105 hover:cursor-pointer">
          ethica
        </h1>
        <div className="flex space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full mt-8">
        <textarea 
           className="resize-none border rounded p-2 w-full focus:ring focus:ring-blue-200 transition duration-300" 
          rows={5} 
          placeholder="Enter your review" 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
        />
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2 transition duration-300" onClick={handleAddReview}>Add Review</button>
          <button className="bg-green-500 hover:bg-green-600 text-white rounded p-2 transition duration-300" onClick={handleAnalyse}>Analyse</button>
        </div>
      </div>

      <div className="mt-8">
        {reviews.map((r, index) => (
          <div key={index} className="flex justify-between border-b pb-2 mb-2">
            <div>
              <p>{r.text} <span className="text-gray-500">({r.classification})</span></p>
              <p className="text-sm text-gray-400">{r.date.toLocaleString()}</p>
            </div>
            <div>
              <button onClick={() => {
                const updatedReviews = [...reviews];
                updatedReviews[index].upvotes++;
                setReviews(sortReviewsByVotes(updatedReviews));
              }}>👍 {r.upvotes}</button>
              <button onClick={() => {
                const updatedReviews = [...reviews];
                updatedReviews[index].downvotes--;
                setReviews(sortReviewsByVotes(updatedReviews));
              }}>👎 {r.downvotes}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


 