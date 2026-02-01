import { useEffect } from 'react';

const Bio = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="max-w-xl mt-8 font-[verdana]">
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
          Hi, I’m Siddharth Kulkarni. I have a B.Tech
          in Computer Engineering from NIT Surat and
          an MS in Applied Mathematics from
          UMass Amherst. 
        </p> <br/>
        <p className="text-gray-700 text-justify">
          I write about mathematics, machine learning,
          finance, and other life stuff.
        </p>
      </div>
    </div>
    </div>
  )
};

export default Bio; 