import "./FaqItem.scss";

type FaqItemProps = {
  readonly q: string;
  readonly a: string;
  readonly defaultOpen?: boolean;
};

export function FaqItem({ q, a, defaultOpen = false }: FaqItemProps) {
  return (
    <details className="faq-item" open={defaultOpen}>
    
      <summary className="faq-item__q">{q}</summary>
      <p className="faq-item__a">{a}</p>
    </details>
  );
}