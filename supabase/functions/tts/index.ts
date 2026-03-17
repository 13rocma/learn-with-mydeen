import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Use tts-api with lower pitch to get a male-sounding Arabic voice
const TTS_API = "https://tts-api.netlify.app";

async function synthesizeMaleArabic(text: string): Promise<Uint8Array | null> {
  try {
    const encodedText = encodeURIComponent(text);
    // pitch=0.75 gives a deeper, male-sounding voice
    const url = `${TTS_API}/?text=${encodedText}&lang=ar&pitch=0.75&speed=0.95`;
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`TTS API responded with ${response.status}`);
      return null;
    }
    
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (err) {
    console.error("TTS API error:", err);
    return null;
  }
}

// Fallback: Google Translate TTS directly
async function synthesizeGoogleTTS(text: string, lang: string): Promise<Uint8Array | null> {
  try {
    const encodedText = encodeURIComponent(text);
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodedText}`;
    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Referer": "https://translate.google.com/",
      },
    });
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (err) {
    console.error("Google TTS fallback error:", err);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, lang = "ar" } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Try male voice API first, then fallback
    let audioData = await synthesizeMaleArabic(text);
    
    if (!audioData || audioData.length === 0) {
      console.log("Male TTS API failed, falling back to Google TTS");
      audioData = await synthesizeGoogleTTS(text, lang);
    }

    if (!audioData || audioData.length === 0) {
      throw new Error("All TTS engines failed");
    }

    return new Response(audioData, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
