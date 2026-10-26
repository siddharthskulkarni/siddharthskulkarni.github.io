import strings from '../strings.json';

const Quotes = () => {
  const quotes = strings.quotes.items || [];

  return (
    <div className="max-w-2xl mt-12 font-[verdana]">
      <h2 className="mb-10 text-xl font-normal text-blue-900">{strings.quotes.title}</h2>
      <div className="space-y-10">
        {quotes.map((quote, index) => (
          <figure key={`${quote.author}-${index}`} className="text-gray-800">
            <blockquote>
              “{quote.text}”
            </blockquote>
            <figcaption className="mt-4">
              — {quote.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
