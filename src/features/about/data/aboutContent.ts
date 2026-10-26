export const ABOUT_VIDEO ={
    id:"7ISbFvTwPE8",
    title:"The Boo Fairies - Official Video"
} as const;

export const FAQ_SITE: ReadonlyArray<{ readonly q: string; readonly a: string }> = [
  {
    q: "What is this website?",
    a: "This is an unofficial concept redesign of The Book Fairies, built as a portfolio project. The books and drop locations shown here are fictional. For the real project, visit ibelieveinbookfairies.com.",
  },
  {
    q: 'What does "Still waiting" mean?',
    a: 'A book marked "Still waiting" has been hidden but not yet found by anyone. Once someone discovers it and reports back, the status changes to "Found by a reader."',
  },
  {
    q: "Why can't I see the exact location of a waiting book?",
    a: "Showing a precise location turns finding into hunting — the book would be gone within minutes. We reveal the exact spot only after a book has been found, so the magic of the search stays intact.",
  },
  {
    q: "I found a book! What do I do?",
    a: "Take it home and read it. When you're done, you can leave it somewhere new for the next person — that's the whole spirit of the project. Head to the official site to get your own stickers.",
  },
  {
    q: "How do I get my drop onto this site?",
    a: "Drop Log submissions are coming soon. You'll be able to submit a book's ISBN, city, and a photo — and once verified, it will appear in the drops feed.",
  },
] as const;

export const FAQ_PROJECT: ReadonlyArray<{ readonly q: string; readonly a: string }> = [
  {
    q: "What is The Book Fairies project?",
    a: "The Book Fairies is a global movement founded by Cordelia Oxley in March 2017. Readers attach an official sticker to a finished book and hide it in a public place for a stranger to find, read, and pass on.",
  },
  {
    q: "How do I become a Book Fairy?",
    a: "Order official stickers from the Book Fairies shop, stick one on a book you've loved, and hide it somewhere public. It really is that simple.",
  },
  {
    q: "Where can I find my country's Official Book Fairy?",
    a: "Each country or region has an Official Book Fairy who manages local social media and coordinates drops. Search the hashtag #ibelieveinbookfairies or check the official site's directory.",
  },
] as const;