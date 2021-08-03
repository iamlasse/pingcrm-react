import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import classNames from 'classnames';
import Icon from '@/Shared/Icon';

export default ({ icon, link, text }) => {
  const isActive = route().current(link + '*');

  const iconClasses = classNames('w-4 h-4 mr-2', {
    'text-indigo-800 fill-current': isActive,
    'text-indigo-600 group-hover:text-indigo-800 fill-current': !isActive
  });

  const textClasses = classNames({
    'text-indigo-800': isActive,
    'text-indigo-600 group-hover:text-indigo-800': !isActive
  });

  return (
    <div className="mb-4">
      <InertiaLink href={route(link)} className="flex items-center group py-3">
        <Icon name={icon} className={iconClasses} />
        <div className={textClasses}>{text}</div>
      </InertiaLink>
    </div>
  );
};
