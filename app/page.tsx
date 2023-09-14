"use client";

 
// import axios from "axios";
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useEffect, useState } from 'react';
// import { useAuth } from "@clerk/nextjs";
// import { ModeToggle } from "./components/toggle"; 

// type Review = {
//   text: string;
//   upvotes: number;
//   downvotes: number;
//   sentiment?: 'positive' | 'negative' | 'neutral' | 'unknown';
//   date: Date;
// }

// const Home: React.FC = () => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const [review, setReview] = useState<string>("");
//   const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     if (isLoaded && !isSignedIn) {
//       window.location.href = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string;
//     }
//   }, [isLoaded, isSignedIn]);

//   const handleAddReview = async () => {
//     const sentiment = await handleAnalyse();
//     setReviews([...reviews, { text: review, upvotes: 0, downvotes: 0, sentiment, date: new Date() }]);
//     setReview("");
//   };

//   const handleAnalyse = async (): Promise<'positive' | 'negative' | 'neutral' | 'unknown'> => {
//     try {
//       const res = await axios.post('/api/sentiment', { reviews: review });

//       const data = await res.json();
//       return data.sentiment;
//     } catch (error) {
//       console.error("Error analyzing sentiment:", error);
//       return user.firstName || "unknown";
//     }
//   };

//   const handleUpvote = (index: number) => {
//     const newReviews = [...reviews];
//     newReviews[index].upvotes += 1;
//     setReviews(newReviews);
//   };

//   const handleDownvote = (index: number) => {
//     const newReviews = [...reviews];
//     newReviews[index].downvotes -= 1;
//     setReviews(newReviews);
//   };

//   const sortedReviews = reviews.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));

//   return (
//     <div className="flex flex-col justify-between items-start w-full h-screen p-4">
//       <div className="flex justify-between w-full">
//         <h1 className="text-4xl font-bold text-black-600">ethica</h1>
//         <div className="flex space-x-4">
//           <ModeToggle />
//           <UserButton afterSignOutUrl="/"/>
//         </div>
//       </div>

//       <div className="flex flex-col space-y-4 w-full mt-8">
//         <textarea 
//           className="resize-none border rounded p-2 w-full" 
//           rows={5} 
//           placeholder="Enter your review" 
//           value={review} 
//           onChange={(e) => setReview(e.target.value)} 
//         />
//         <div className="flex space-x-4">
//           <button className="bg-blue-500 text-white rounded p-2" onClick={handleAddReview}>Add Review</button>
//           <button className="bg-green-500 text-white rounded p-2" onClick={handleAnalyse}>Analyse</button>
//         </div>
//       </div>

//       <div className="mt-8">
//         {sortedReviews.map((r, index) => (
//           <div key={index} className="flex justify-between border-b pb-2 mb-2">
//             <div>
//               <p>{r.text} <span className="text-gray-500">({r.sentiment})</span></p>
//               <p className="text-sm text-gray-400">{r.date.toLocaleString()}</p>
//             </div>
//             <div>
//               <button onClick={() => handleUpvote(index)}>👍 {r.upvotes}</button>
//               <button onClick={() => handleDownvote(index)}>👎 {r.downvotes}</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useState } from 'react';

const Home = () => {
  const [reviewText, setReviewText] = useState('');
  const [classification, setClassification] = useState<string | null>(null);

  async function handleSubmit() {
    const response = await fetch('/api/sentiment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: "Example Name", number: "12345", review: reviewText })
    });

    const data = await response.json();
    setClassification(data.label);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Review Classifier</h1>

      <textarea 
        rows={5} 
        cols={50} 
        value={reviewText} 
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Enter your review here..."
      ></textarea>

      <button onClick={handleSubmit} style={{ display: "block", marginTop: "10px" }}>
        Submit Review
      </button>

      {classification && (
        <div style={{ marginTop: "20px" }}>
          <strong>Review Classification:</strong> {classification}
        </div>
      )}
    </div>
  );
}

export default Home;




 






 