import { ImageResponse } from 'next/og';
import { decodeResultsFromUrl } from '@/lib/scoring';
import { CATEGORIES } from '@/lib/quiz-data';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

function getScoreColor(score: number): string {
  if (score >= 80) return '#00b894'; // success (green)
  if (score >= 60) return '#6c5ce7'; // primary (purple)
  if (score >= 40) return '#fdcb6e'; // warning (yellow)
  return '#ff7675'; // danger (red)
}

function getLevelEmoji(level: string): string {
  if (level === 'Highly AI-Proof') return '';
  if (level === 'Moderately Safe') return '';
  if (level === 'At Risk') return '';
  return '';
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dataStr = searchParams.get('data');
    const result = dataStr ? decodeResultsFromUrl(dataStr) : null;

    if (!result) {
      // Fallback Image for invalid or missing data
      return new ImageResponse(
        (
          <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#0a0a0f', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ color: 'white', fontSize: 72, fontWeight: 'bold', fontFamily: 'sans-serif' }}>AI Proof</h1>
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    const color = getScoreColor(result.overallScore);

    return new ImageResponse(
      (
        <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#0a0a0f',
          color: 'white',
          flexDirection: 'row',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}>
          {/* Left Side - Primary Information */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '55%', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', fontSize: 42, fontWeight: 'bold', color: 'white', letterSpacing: '-0.02em' }}>
              AI Proof
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: 180, fontWeight: 'bold', color, lineHeight: 1, letterSpacing: '-0.05em' }}>
                  {Math.round(result.overallScore)}
                </span>
                <span style={{ fontSize: 50, color: '#a0a0b0', marginLeft: '12px', fontWeight: 'bold' }}>/100</span>
              </div>
              <div style={{ 
                display: 'flex', 
                fontSize: 48, 
                color: color, 
                marginTop: '16px',
                fontWeight: 'bold',
                letterSpacing: '-0.02em'
              }}>
                {result.level} {getLevelEmoji(result.level)}
              </div>
            </div>
            
            <div style={{ display: 'flex', fontSize: 28, color: '#a0a0b0', fontWeight: 500 }}>
              Take the quiz at ai-proof.vercel.app
            </div>
          </div>

          {/* Right Side - Category Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '45%', justifyContent: 'center', paddingLeft: '40px' }}>
            {CATEGORIES.map(cat => {
              const score = result.breakdown[cat.id] || 0;
              const barColor = getScoreColor(score);
              return (
                <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: 24, fontWeight: 600 }}>
                    <span style={{ color: '#e0e0e0' }}>{cat.name}</span>
                    <span style={{ color: barColor }}>{Math.round(score)}</span>
                  </div>
                  {/* Progress Bar Track */}
                  <div style={{ display: 'flex', width: '100%', height: '14px', backgroundColor: '#1a1a24', borderRadius: '7px', overflow: 'hidden' }}>
                    {/* Progress Bar Fill */}
                    <div style={{ 
                      display: 'flex', 
                      width: `${Math.max(2, score)}%`, 
                      height: '100%', 
                      backgroundColor: barColor,
                      borderRadius: '7px',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ),
      { 
        width: 1200, 
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=3600, immutable'
        }
      }
    );
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
