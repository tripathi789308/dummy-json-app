import React from "react";
import XIcon from "../icons/XIcon";

interface RemovableSpanProps {
  text: string;
  onRemove: () => void;
}

const RemovableSpan: React.FC<RemovableSpanProps> = ({ text, onRemove }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-custom-blue px-5 py-2 text-sm font-medium text-custom-black mr-2">
      {text}
      <button
        type="button"
        className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-custom-black hover:bg-custom-gray focus:outline-none"
        onClick={() => {
          onRemove();
        }}
      >
        <span className="sr-only">Remove</span>
        <XIcon className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
};

export default RemovableSpan;
