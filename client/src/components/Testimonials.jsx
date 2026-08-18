const testimonials = [
    {
        name: 'Real Movers Group',
        trip: 'Turtle Bay Resort',
        quote: 'AFEL TOURS handled everything, from transport SGR logistics, hotel transfers and accommodations. The lodge had a beachfront which was very nice. We never had to worry about anything, we are already planning the nexzt trip with them.'
    }, 

        {
        name: 'Regina Kirigwi',
        trip: 'Sun n Sand Beach Resort',
        quote: 'AFEL TOURS handled everything, from transport SGR logistics, hotel transfers and accommodations.  We never had to worry about anything, we are already planning the nexzt trip with them.'
    }, 

        {
        name: 'Mercy & Ann',
        trip: 'Girls trip to Lake Naivasha Resort',
        quote: 'AFEL TOURS handled everything. The lodge had a beachfront which was very nice. We never had to worry about anything.'
    }, 
    {
    name: 'Corporate Retreat, Nairobi Tech Co.',
    trip: 'Executive Conference Package',
    quote:
      'Our 40-person offsite ran without a hitch. AV setup, accommodation, meals — all sorted before we even arrived. Highly recommend for corporate groups.',
  },

    {
        name: 'Mr Richards',
        trip: 'Family Getaway to TreeTops Hotel Aberdare',
        quote: 'AFEL TOURS handled everything. The lodge was very nice with spacious well lit rooms . We never had to worry about anything.'
    }, 

        {
        name: 'Ann Wanjiku',
        trip: 'Solo Getaway to Lake Naivasha Resort',
        quote: 'AFEL TOURS handled everything. The lodge was very nice with spacious well lit rooms . We never had to worry about anything.'
    }, 

]


function Testimonials() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            <div className="mb-10 text-center">
                <p className="font-display text-xs font-semibold uppercase tracking-widest text-brass mb-2">What Our Clients Say</p>
                <h2>Trusted by Travellers Across East Africa</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap--6">
                {testimonials.map((t, i) => (
                    <div key={i} className="border border-line bg-white rounded-xl p-6 flex flex-col">
                        <svg className="w-8 h-8 text-brass mb-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"></path>
                        </svg>
                        
                        <p className="text-charcoal/80 leading-relaxed mb-6 flex-1">{t.quote}</p>

                        <div className="border-t border-line pt-4">
                            <p className="font-display font-semibold text-charcoal">{t.name}</p>
                            <p className="font-display text-xs uppercase tracking-wide text-moss">{t.trip}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>       
    )
}

export default Testimonials