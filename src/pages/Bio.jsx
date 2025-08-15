import { useEffect } from 'react';

const Bio = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="max-w-xl mx-auto font-[verdana]">
     <div className="max-w-xl mx-auto font-[verdana]">
      <div>
        <img
          src="my_photo.png"
          alt="Siddharth Kulkarni"
          className="w-20 h-20 object-cover float-left mr-4 mb-1"
        />
        <h2 className="my-3 text-xl font-normal font-[verdana] text-blue-900">
          Bio
        </h2>
        <p className="text-gray-700">
          Mathematician. Writer.
        </p>
      </div>
    </div>
    </div>
  )
};

export default Bio; 