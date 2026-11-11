import strings from '../strings.json';

const Quotes = () => {
  const quotes = strings.quotes.items || [];

  return (
    <div className="max-w-2xl mt-12 font-[verdana]">
      <h2 className="mb-10 text-xl font-normal text-blue-900">{strings.quotes.title}</h2>
      <ul className="list-disc list-outside space-y-8 pl-5 text-gray-800">
        {quotes.map((quote, index) => (
          <li key={`${quote.author}-${index}`}>
            <blockquote>“{quote.text}”</blockquote>
            <p className="mt-2">— {quote.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;
