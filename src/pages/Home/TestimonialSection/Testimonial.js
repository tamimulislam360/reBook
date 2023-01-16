const Testimonial = ({ quote, author }) => {
    return (
      <div className="bg-base-100 text-secondary hover:bg-secondary hover:text-primary shadow-lg p-6 rounded-lg">
        <p className="font-medium">{quote}</p>
        <p className="opacity-80 text-right">- {author}</p>
      </div>
    );
};
  
export default Testimonial