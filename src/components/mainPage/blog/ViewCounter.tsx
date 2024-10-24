"use client";

import React, { useEffect } from "react";

type Props = {
  blogSlug: string;
};

const ViewCounter = ({ blogSlug }: Props) => {
  useEffect(() => {
    const incrementViewCount = async () => {
      const url = `/apinet/blog-posts/${blogSlug}/increment-view-count`;
      try {
        const response = await fetch(url, {
          method: "PUT",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {

      }
    };

    incrementViewCount();
  }, [blogSlug]);

  return (
    <div className="hidden" aria-hidden>
      ViewCounter
    </div>
  );
};

export default ViewCounter;
