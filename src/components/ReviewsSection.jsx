export default function ReviewsSection() {
  const reviews = [
    {
      quote: '“AURELIS feels less like a machine and more like a piece of moving architecture.”',
      author: 'AURELIS DESIGN REVIEW'
    },
    {
      quote: '“The defining quality is not sheer speed. It is total acoustic composure at high velocity.”',
      author: 'GRAND TOURING JOURNAL'
    },
    {
      quote: '“Quiet, deliberate, and unmistakably grand. A new benchmark for luxury grand touring.”',
      author: 'AURELIS CONCEPT CRITIQUE'
    }
  ]

  return (
    <section className="section-padding theme-dark">
      <div className="container">
        <span className="eyebrow-tag">Editorial Reactions · 19</span>
        <h2 className="display-title">WHAT PEOPLE ARE SAYING.</h2>
        
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <blockquote>{r.quote}</blockquote>
              <cite>— {r.author}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
