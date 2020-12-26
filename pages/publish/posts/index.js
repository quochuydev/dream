import React from 'react';
import dynamic from 'next/dynamic';

const noSSRWithLoadingDynamic = (component) => {
  return dynamic(() => component, {
      ssr: false,
      loading: () => <></>,
  });
};

export default noSSRWithLoadingDynamic(import('../../../client/pages/posts'));