


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







 

