import { FC, useRef } from 'react';
import ReactPlayer from 'react-player/lazy';

type Props = {
  videoUrl: string;
  title: string;
};


const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
      <div className="relative w-full h-0 pb-[56.25%]">
        <ReactPlayer
          url={videoUrl || 'https://youtu.be/3DIpUrPnQRQ?si=dZBl0l0u_mkENL-H'}
          width="100%"
          height="100%"
          className="absolute top-0 left-0 rounded-md shadow-md"
          controls
        />
      </div>
    </div>
  );
};

export default CoursePlayer;
