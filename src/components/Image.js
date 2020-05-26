import React from "react";

// backgroundColor is taken out of props but ignored
const Image = ({ path, backgroundColor, ...props }) => (
  <img
    role="button"
    title="Click to enlarge"
    style={{
      objectFit: "cover",
    }}
    alt="A clickable illustration"
    src={path}
    loading="lazy"
    {...props}
  />
);

export default Image;
