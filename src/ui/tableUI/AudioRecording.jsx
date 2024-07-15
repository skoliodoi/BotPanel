import { FiDownload } from "react-icons/fi";
import { Tooltip } from "@mui/material";

function AudioRecording({ recording }) {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center gap-3 border">
        <audio className="w-inherit rounded-lg" controls>
          <source src={recording} type="audio/wav"></source>
        </audio>
        <Tooltip>
          <a
            target="_blank"
            rel="noreferrer"
            className="z-50 flex content-center items-center rounded-md bg-sky-900 px-4 py-2 text-white outline-none hover:border-sky-900 hover:bg-white hover:font-bold hover:text-sky-900"
            href={recording}
            download={recording}
          >
            <FiDownload />
          </a>
        </Tooltip>
      </div>
    </>
  );
}

export default AudioRecording;
