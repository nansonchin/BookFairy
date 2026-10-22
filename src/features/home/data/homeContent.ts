// src/features/home/data/homeContent.ts
// 责任：首页的文案和数字。想改内容只改这里，不用碰组件。

export const STEPS = [
  { no: "01", title: "Read", text: "Finish a book you loved too much to keep to yourself." },
  { no: "02", title: "Dress", text: "Add an official sticker, and a ribbon if you like, so the finder knows it’s a gift." },
  { no: "03", title: "Hide", text: "Leave it somewhere public: a bench, a café, a train seat. Then walk away." },
] as const;

// 数字来自官方站 ibelieveinbookfairies.com，会变，上线前请核对
export const STATS = [
  { value: "17,000+", label: "book fairies" },
  { value: "100", label: "countries" },
  { value: "2017", label: "hiding books since" },
] as const;
