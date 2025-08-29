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
        <p className="text-gray-700 text-justify">
          I’m Siddharth Kulkarni — mathematician and writer. I'm an Applied Mathematics graduate student at the University of Massachusetts. I’m currently exploring Machine Learning and some areas of Pure Mathematics. I like reading, writing, and playing chess.
        </p>
      </div>
    </div>
    </div>
  )
};

export default Bio; 