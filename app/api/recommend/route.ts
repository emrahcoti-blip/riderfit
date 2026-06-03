import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { style, experience, climate, budget, bike, priorities } = await req.json()

  const prompt = `You are an expert motorcycle gear advisor with 15+ years of experience. A rider has this profile:
- Riding style: ${style}
- Experience level: ${experience}
- Climate: ${climate}
- Total budget: ${budget}
- Bike: ${bike || 'not specified'}
- Priorities: ${priorities?.join(', ') || 'safety, comfort'}

Recommend a complete 5-piece gear setup: helmet, jacket, gloves, boots, and pants.
For each item, recommend a specific real product (brand + model) that is sold by European retailers like Fc-Moto, Louis Moto, or Polo Motorrad.
Make sure all 5 items fit within the stated budget combined.

Respond ONLY with valid JSON, no markdown, no backticks, no extra text:
{
  "summary": "2-3 sentence overview explaining the logic and how it fits this rider's profile",
  "totalEstimate": "€XXX–€XXX",
  "items": [
    {
      "category": "Helmet",
      "name": "Brand Model Name",
      "why": "2 sentences explaining why this fits their profile specifically",
      "price": "€XXX–€XXX",
      "safetyRating": "ECE 22.06 / SHARP 5-star / etc",
      "searchQuery": "brand model name motorcycle"
    }
  ]
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  const text = data.content?.map((b: { type: string; text?: string }) => b.text || '').join('') || ''

  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch {
    return NextResponse.json({ error: 'Failed to parse recommendation' }, { status: 500 })
  }
}
