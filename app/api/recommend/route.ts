import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { style, experience, climate, budget, bike, priorities } = await req.json()

  const prompt = `You are an expert motorcycle gear advisor. A rider has this profile:
- Riding style: ${style}
- Experience level: ${experience}
- Climate: ${climate}
- Total budget: ${budget}
- Bike: ${bike || 'not specified'}
- Priorities: ${priorities?.join(', ') || 'safety, comfort'}

Recommend a complete 5-piece gear setup: helmet, jacket, gloves, boots, and pants.
For each item, recommend a specific real product sold by European retailers.

Respond ONLY with valid JSON, no markdown:
{
  "summary": "2-3 sentence overview",
  "totalEstimate": "€XXX–€XXX",
  "items": [
    {
      "category": "Helmet",
      "name": "Brand Model Name",
      "why": "2 sentences why this fits",
      "price": "€XXX–€XXX",
      "safetyRating": "ECE 22.06",
      "searchQuery": "brand model motorcycle"
    }
  ]
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  
  if (!res.ok) {
    console.error('Anthropic API error:', JSON.stringify(data))
    return NextResponse.json({ error: 'API error', details: data }, { status: 500 })
  }

  const text = data.content?.map((b: { type: string; text?: string }) => b.text || '').join('') || ''

  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch {
    console.error('Parse error:', text)
    return NextResponse.json({ error: 'Failed to parse recommendation' }, { status: 500 })
  }
}
EOFcd ~/Downloads/riderfit
cd ~/Downloads/riderfit


cat > ~/Downloads/riderfit/app/api/recommend/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { style, experience, climate, budget, bike, priorities } = await req.json()

  const prompt = `You are an expert motorcycle gear advisor. A rider has this profile:
- Riding style: ${style}
- Experience level: ${experience}
- Climate: ${climate}
- Total budget: ${budget}
- Bike: ${bike || 'not specified'}
- Priorities: ${priorities?.join(', ') || 'safety, comfort'}

Recommend a complete 5-piece gear setup: helmet, jacket, gloves, boots, and pants.
For each item, recommend a specific real product sold by European retailers.

Respond ONLY with valid JSON, no markdown:
{
  "summary": "2-3 sentence overview",
  "totalEstimate": "€XXX–€XXX",
  "items": [
    {
      "category": "Helmet",
      "name": "Brand Model Name",
      "why": "2 sentences why this fits",
      "price": "€XXX–€XXX",
      "safetyRating": "ECE 22.06",
      "searchQuery": "brand model motorcycle"
    }
  ]
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  
  if (!res.ok) {
    console.error('Anthropic API error:', JSON.stringify(data))
    return NextResponse.json({ error: 'API error', details: data }, { status: 500 })
  }

  const text = data.content?.map((b: { type: string; text?: string }) => b.text || '').join('') || ''

  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch {
    console.error('Parse error:', text)
    return NextResponse.json({ error: 'Failed to parse recommendation' }, { status: 500 })
  }
}cat > ~/Downloads/riderfit/app/api/recommend/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { style, experience, climate, budget, bike, priorities } = await req.json()

  const prompt = `You are an expert motorcycle gear advisor. A rider has this profile:
- Riding style: ${style}
- Experience level: ${experience}
- Climate: ${climate}
- Total budget: ${budget}
- Bike: ${bike || 'not specified'}
- Priorities: ${priorities?.join(', ') || 'safety, comfort'}

Recommend a complete 5-piece gear setup: helmet, jacket, gloves, boots, and pants.
For each item, recommend a specific real product sold by European retailers.

Respond ONLY with valid JSON, no markdown:
{
  "summary": "2-3 sentence overview",
  "totalEstimate": "€XXX–€XXX",
  "items": [
    {
      "category": "Helmet",
      "name": "Brand Model Name",
      "why": "2 sentences why this fits",
      "price": "€XXX–€XXX",
      "safetyRating": "ECE 22.06",
      "searchQuery": "brand model motorcycle"
    }
  ]
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  
  if (!res.ok) {
    console.error('Anthropic API error:', JSON.stringify(data))
    return NextResponse.json({ error: 'API error', details: data }, { status: 500 })
  }

  const text = data.content?.map((b: { type: string; text?: string }) => b.text || '').join('') || ''

  try {
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return NextResponse.json(parsed)
  } catch {
    console.error('Parse error:', text)
    return NextResponse.json({ error: 'Failed to parse recommendation' }, { status: 500 })
  }
}
