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


import type { NextApiRequest, NextApiResponse } from 'next';
import cohere from 'cohere-ai';

cohere.init(process.env.COHERE_API_KEY);

  const POSITIVE_SAMPLES = [
    "The reception was great. I love how your staff welcomed us.",
    "Your staff took us on a tour around the hotel, and I really enjoyed that.",
    "The bedroom we stayed in was very peaceful. Also loved the paintings on the walls.",
    "The amenities in the room were great and the rooms were also clean.",
    "I have stayed in many hotels but this one tops it for me. Enjoyed the customer service and the clean rooms.",
  ];

  const NEGATIVE_SAMPLES = [
    "The room was not neat or clean. There was no air conditioning system.",
    "The Wi-Fi in the hotel was poor. I couldn't use the internet while I was there.",
    "The lady who showed us our room had a very rude attitude.",
    "Poor customer service and the rooms had a weird smell.",
    "The air conditioning system was faulty, so the room was very hot.",
  ];

async function classifyReview(input: string) {
  const response = await cohere.classify({
    model: "medium",
    taskDescription: "",
    outputIndicator: "",
    inputs: [input],
    examples: POSITIVE_SAMPLES.map((sample) => ({
      text: sample,
      label: "positive",
    })).concat(
      NEGATIVE_SAMPLES.map((sample) => ({ text: sample, label: "negative" }))
    ),
  });

  return response.body.classifications[0];
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, number, review } = req.body;

  const classificationResult = await classifyReview(review);

  const label = classificationResult.prediction;

  // Here you can do whatever you want with the data (like storing it)
  const data = { name, number, review, label };

  res.status(200).json(data);
};








 

