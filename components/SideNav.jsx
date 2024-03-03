"use client"
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3BottomLeftIcon,
  CogIcon,
  HomeIcon,
  PhotoIcon,
  RectangleStackIcon,
  Squares2X2Icon as Squares2X2IconOutline,
  UserGroupIcon,
  XMarkIcon,
  SideNavCustomeClass,
} from '@heroicons/react/24/outline';
import { Squares2X2Icon as Squares2X2IconMini } from '@heroicons/react/20/solid';
import Link from 'next/link';


const SideNav = ({value1,value2,value3,value4 }) => {

  const handleClick = (href) => {
    console.log(href);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Squares2X2IconOutline, current: value1 },
    { name: 'Business Config', href: '/business-config', icon: PhotoIcon, current: value2 },
    { name: 'User Setting', href: '/user', icon: UserGroupIcon, current: value3 },
    { name: 'Partner Setting', href: '/partner', icon: CogIcon, current: value4 },
  ]

  return (

    <div className="flex min-h-[100vh] max-h-[auto]">
      <div className="hidden w-28 overflow-y-auto bg-theme md:block">
        <div className="flex w-full flex-col items-center py-6">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=white"
              alt="Your Company"
            />
          </div>
          <div className="mt-6 w-full flex-1 space-y-8 px-2 text-center">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}
                  className={classNames(
                    item.current ? 'bg-darkTheme text-white' : 'text-white hover:bg-darkTheme hover:text-white',
                    'group flex w-full flex-col items-center rounded-md p-3 text-xs font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-white' : ' group-hover:text-white',
                      'h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;




