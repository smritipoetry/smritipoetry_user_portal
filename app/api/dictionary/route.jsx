import axios from "axios";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");
  const language = searchParams.get("lang");

  try {
    if (!word) {
      return Response.json({ error: "No word provided" }, { status: 400 });
    }

    if (language === "english") {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      const data = response.data[0];
      return Response.json({
        word: data.word,
        phonetic: data.phonetic,
        audio: data.phonetics.find((p) => p.audio)?.audio || null,
        meanings: data.meanings.map((meaning) => ({
          partOfSpeech: meaning.partOfSpeech,
          definition: meaning.definitions[0].definition,
          synonyms: meaning.definitions[0].synonyms || [],
        })),
      });
    } else if (language === "hindi" || language === "urdu") {
      const targetLang = language === "hindi" ? "hi" : "ur";

      const response = await axios.post(
        "https://translate.argosopentech.com/translate",
        {
          q: word,
          source: "en",
          target: targetLang,
          format: "text",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const translated = response.data.translatedText;

      if (!translated) {
        return Response.json(
          { error: "Translation not found" },
          { status: 404 }
        );
      }

      return Response.json({
        word,
        meanings: [
          {
            definition: translated,
            synonyms: [],
          },
        ],
      });
    } else {
      return Response.json({ error: "Unsupported language" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in API:", error.message);

    return Response.json(
      { error: "Something went wrong. Try again later." },
      { status: 500 }
    );
  }
}
