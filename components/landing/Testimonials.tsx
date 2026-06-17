import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Chemtrack completely transformed our warehouse operations. The batch traceability alone saved us thousands in compliance fines.",
      author: "Sarah Jenkins",
      role: "Operations Manager",
      company: "Apex Chemical Manufacturing",
    },
    {
      quote: "Before this platform, our expiry tracking was a spreadsheet nightmare. Now, automated alerts ensure we never waste valuable reagents.",
      author: "Dr. Michael Chen",
      role: "Compliance Officer",
      company: "BioPharma Research Labs",
    },
    {
      quote: "The multi-site warehouse visibility gives us real-time confidence in our inventory valuation. It's an indispensable enterprise tool.",
      author: "Robert Kowalski",
      role: "Procurement Head",
      company: "Global Industrial Supply",
    },
    {
      quote: "Managing safety data sheets and hazard classifications used to take days. Chemtrack does it instantly and keeps us 100% audit-ready.",
      author: "Elena Rodriguez",
      role: "Warehouse Manager",
      company: "Metro Water Treatment",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Enterprise Leaders
          </h2>
          <p className="text-lg text-muted-foreground">
            See how top organizations are modernizing their chemical inventory management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <Quote className="h-10 w-10 text-primary/20 mb-6" />
              <p className="text-lg text-foreground font-medium leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
