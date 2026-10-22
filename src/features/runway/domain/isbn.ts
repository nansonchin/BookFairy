// 责任：判断一个字符串是不是合法的 ISBN，并统一成「无连字符、大写」的写法。

// "978-0-14-032872-1" → "9780140328721"；不合法返回 null
export function normalizeIsbn(input: string): string | null {
  const compact = input.replace(/[\s-]/g, "").toUpperCase();

  // ISBN-13：奇数位 ×1、偶数位 ×3，总和必须是 10 的倍数
  if (/^\d{13}$/.test(compact)) {
    const sum = [...compact].reduce((total, char, index) => total + Number(char) * (index % 2 === 0 ? 1 : 3), 0);
    return sum % 10 === 0 ? compact : null;
  }

  // ISBN-10：从 10 到 1 加权，最后一位可以是 X（代表 10），总和必须是 11 的倍数
  if (/^\d{9}[\dX]$/.test(compact)) {
    const sum = [...compact].reduce(
      (total, char, index) => total + (char === "X" ? 10 : Number(char)) * (10 - index),
      0
    );
    return sum % 11 === 0 ? compact : null;
  }

  return null;
}