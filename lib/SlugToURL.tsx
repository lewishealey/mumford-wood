import React from 'react';

export const slugToURL = (typeName: string, slug: string) => {
  let type = typeName.toLowerCase();

  // Pages are root pages not /page/
  if (type === 'page' || type === 'product') {
    type = '';
  } else {
    type = `/${type}`;
  }

  return `${type}/${slug}`;
};

export default slugToURL;
