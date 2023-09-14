// import type { NextApiRequest, NextApiResponse } from 'next';
// import cohere from 'cohere-ai';

// cohere.init(process.env.API_KEY as string);

// type ResponseType = {
//   message: string;
//   label?: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseType>
// ) {
//   if (req.method === 'POST') {
//     const { review } = req.body;

//     if (!review) {
//       res.status(400).json({ message: 'Review is required' });
//       return;
//     }

//     try {
//       const classificationResult = await classifyReview(review);
//       const label = classificationResult.prediction;

//       res.status(200).json({ message: 'Successfully classified', label });
//     } catch (error) {
//       res.status(500).json({ message: 'Error classifying the review' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

// async function classifyReview(input: string) {
//   const POSITIVE_SAMPLES = [
//     "The reception was great. I love how your staff welcomed us.",
//     "Your staff took us on a tour around the hotel, and I really enjoyed that.",
//     "The bedroom we stayed in was very peaceful. Also loved the paintings on the walls.",
//     "The amenities in the room were great and the rooms were also clean.",
//     "I have stayed in many hotels but this one tops it for me. Enjoyed the customer service and the clean rooms.",
//   ];

//   const NEGATIVE_SAMPLES = [
//     "The room was not neat or clean. There was no air conditioning system.",
//     "The Wi-Fi in the hotel was poor. I couldn't use the internet while I was there.",
//     "The lady who showed us our room had a very rude attitude.",
//     "Poor customer service and the rooms had a weird smell.",
//     "The air conditioning system was faulty, so the room was very hot.",
//   ];

//   const examples = POSITIVE_SAMPLES.map(text => ({ text, label: 'positive' }))
//     .concat(NEGATIVE_SAMPLES.map(text => ({ text, label: 'negative' })));

//   const response = await cohere.classify({
//     model: 'medium',
//     taskDescription: '',
//     outputIndicator: '',
//     inputs: [input],
//     examples: examples,
//   });

//   return response.body.classifications[0];
// }


 
// pages/api/analyzeReview.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import cohere from 'cohere-ai';

// cohere.init(process.env.COHERE_API_KEY);

// const examples = [
  
//   { text: 'The order came 5 days early', label: 'positive review' },
//   { text: 'The item exceeded my expectations', label: 'positive review' },
//   { text: 'I ordered more for my friends', label: 'positive review' },
//   { text: 'I would buy this again', label: 'positive review' },
//   { text: 'I would recommend this to others', label: 'positive review' },
//   { text: 'The package was damaged', label: 'negative review' },
//   { text: 'The order is 5 days late', label: 'negative review' },
//   { text: 'The order was incorrect', label: 'negative review' },
//   { text: 'I want to return my item', label: 'negative review' },
//   { text: 'The items material feels low quality', label: 'negative review' },
//   { text: 'The product was okay', label: 'neutral review' },
//   { text: 'I received five items in total', label: 'neutral review' },
//   { text: 'I bought it from the website', label: 'neutral review' },
//   { text: 'I used the product this morning', label: 'neutral review' },
//   { text: 'The product arrived yesterday', label: 'neutral review' }
// ];

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { reviewText } = req.body;

//     const response = await cohere.classify({
//       inputs: [reviewText],
//       examples: examples,
//     });

//     const classification = response.body.classifications[0].prediction;

//     res.status(200).json({ label: classification });
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// };


// import type { NextApiRequest, NextApiResponse } from 'next';
// import cohere from 'cohere-ai';

// cohere.init(process.env.COHERE_API_KEY);

// const examples = [
  
//   { text: 'The order came 5 days early', label: 'positive review' },
//   { text: 'The item exceeded my expectations', label: 'positive review' },
//   { text: 'I ordered more for my friends', label: 'positive review' },
//   { text: 'I would buy this again', label: 'positive review' },
//   { text: 'I would recommend this to others', label: 'positive review' },
//   { text: 'The package was damaged', label: 'negative review' },
//   { text: 'The order is 5 days late', label: 'negative review' },
//   { text: 'The order was incorrect', label: 'negative review' },
//   { text: 'I want to return my item', label: 'negative review' },
//   { text: 'The items material feels low quality', label: 'negative review' },
//   { text: 'The product was okay', label: 'neutral review' },
//   { text: 'I received five items in total', label: 'neutral review' },
//   { text: 'I bought it from the website', label: 'neutral review' },
//   { text: 'I used the product this morning', label: 'neutral review' },
//   { text: 'The product arrived yesterday', label: 'neutral review' }
// ];

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { reviewText } = req.body;
//   if (!reviewText || reviewText.trim() === "") {
//     return res.status(400).json({ error: 'Review text cannot be empty' });
// }


// const response = await cohere.classify({
//   inputs: [reviewText],
//   examples: examples,
// });

//  console.log(response)

//   const classification = response.body.classifications[0].prediction;

//   res.status(200).json({ label: classification });
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import cohere from 'cohere-ai';

cohere.init("YMa7BqCcmg0Dtd8txRpuKMelVyOkkz7Q8wQvHelL");

const examples = [
  { text: 'The order came 5 days early', label: 'positive review' },
  { text: 'The item exceeded my expectations', label: 'positive review' },
  { text: 'I ordered more for my friends', label: 'positive review' },
  { text: 'I would buy this again', label: 'positive review' },
  { text: 'I would recommend this to others', label: 'positive review' },
  { text: 'The package was damaged', label: 'negative review' },
  { text: 'The order is 5 days late', label: 'negative review' },
  { text: 'The order was incorrect', label: 'negative review' },
  { text: 'I want to return my item', label: 'negative review' },
  { text: 'The items material feels low quality', label: 'negative review' },
  { text: 'The product was okay', label: 'neutral review' },
  { text: 'I received five items in total', label: 'neutral review' },
  { text: 'I bought it from the website', label: 'neutral review' },
  { text: 'I used the product this morning', label: 'neutral review' },
  { text: 'The product arrived yesterday', label: 'neutral review' }
];

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  
  const { reviewText } = req.body;
  console.log(req.body)
  if (!reviewText || reviewText.trim() === "") {
    return res.status(400).json({ error: 'Review text cannot be empty' });
  }

  try {
    const response = await cohere.classify({
       inputs: [reviewText],
       examples: examples,
    });
 
    const classification = response.body.classifications[0].prediction;
    res.status(200).json({ label: classification });
 } catch (error) {
    console.error("Error when classifying:", error);
    res.status(500).json({ error: 'Internal server error' });
 }
 
  const classification = response.body.classifications[0].prediction;

  res.status(200).json({ label: classification });
}







 

