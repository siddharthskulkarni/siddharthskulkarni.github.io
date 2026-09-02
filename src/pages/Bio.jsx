import { useEffect } from 'react';
import strings from '../strings.json';

const Bio = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="max-w-xl mt-8 font-[verdana]">
     <div className="max-w-xl mx-auto font-[verdana]">
      <div>
        <img
          src="my_photo.jpg"
          alt={strings.about.photoAlt}
          className="w-20 h-20 float-left mr-4 mb-1"
        />
        <h2 className="my-3 text-xl font-normal font-[verdana] text-blue-900">
          {strings.about.title}
        </h2>
        <p className="text-gray-700 text-justify">
          {strings.about.intro}
        </p> <br/>
        <p className="text-gray-700 text-justify">
          {strings.about.summary}
        </p>
      </div>
    </div>
    </div>
  )
};

export default Bio; 