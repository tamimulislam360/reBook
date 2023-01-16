import React from 'react';
import Testimonial from './Testimonial';


const TestimonialSection = () => {
  const testimonials = [
    {
      quote: "This is an amazing service!",
      author: "John Doe"
    },
    {
      quote: "I highly recommend it!",
      author: "Jane Smith"
    },
    {
      quote: "It exceeded my expectations!",
      author: "Bob Johnson"
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-medium mb-4 text-center text-secondary">What Our clients say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} quote={testimonial.quote} author={testimonial.author} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
