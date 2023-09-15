import { NextResponse } from 'next/server';
import axios from 'axios';
<<<<<<< HEAD
=======

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }

    const body = await req.json();
    const reviewText = body.reviewText;

    if (!reviewText || typeof reviewText !== 'string') {
        return new NextResponse("Invalid reviewText provided", { status: 400 });
    }

    const cohereOptions = {
        method: 'POST',
        url: 'https://api.cohere.ai/classify',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'authorization': `Bearer ${process.env.COHERE_AI_API}`
        },
        data: {
            text: reviewText   
        }
    };

    try {
        const cohereResponse = await axios.request(cohereOptions);
        
        if (cohereResponse.data && cohereResponse.data.message) {
            return NextResponse.json({ message: cohereResponse.data.message });
        } else {
            return NextResponse.json(cohereResponse.data);
        }
    } catch (error) {
        console.error("Error fetching sentiment from Cohere:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
>>>>>>> 21423bddee5fe9dd0b09a62a73a0f5682b54f8bb

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }

    const body = await req.json();
    const reviewText = body.reviewText;

    if (!reviewText || typeof reviewText !== 'string') {
        return new NextResponse("Invalid reviewText provided", { status: 400 });
    }

    const cohereOptions = {
        method: 'POST',
        url: 'https://api.cohere.ai/classify',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'authorization': `Bearer ${process.env.COHERE_AI_API}`
        },
        data: {
            text: reviewText   
        }
    };

    try {
        const cohereResponse = await axios.request(cohereOptions);
        
        if (cohereResponse.data && cohereResponse.data.message) {
            return NextResponse.json({ message: cohereResponse.data.message });
        } else {
            return NextResponse.json(cohereResponse.data);
        }
    } catch (error) {
        console.error("Error fetching sentiment from Cohere:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
 

