"use client"
import { Fragment, useState } from 'react';
import Link from 'next/link';
import { Disclosure, Transition, Dialog } from '@headlessui/react'
import {
  XMarkIcon,
  Bars3BottomLeftIcon,
  Squares2X2Icon as Squares2X2IconOutline,
} from '@heroicons/react/24/outline'
import {
  CogIcon,
  HomeIcon,
  PhotoIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false },
  { name: 'Dashboard', href: '#', icon: Squares2X2IconOutline, current: false },
  { name: 'Business Config', href: '#', icon: PhotoIcon, current: true },
  { name: 'User Setting', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Partner Setting', href: '#', icon: CogIcon, current: false },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const logout = () => {
  localStorage.removeItem('accessToken');
};
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <header className="w-full">
      <div className="relative z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
        <button
          type="button"
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme md:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <Disclosure as="nav" className="flex justify-end w-full">
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
              <div className="relative flex h-16 justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">

                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:justify-center sm:w-full">
                    <a
                      href="/space"
                      className="inline-flex items-center border-b-2 hover:border-theme px-1 pt-1 text-md font-medium text-gray-500 hover:text-gray-900"
                    >
                      Space
                    </a>
                    <a
                      href="/celebration"
                      className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-md font-medium text-gray-500 hover:border-theme hover:text-gray-900"
                    >
                      Celebration
                    </a>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                  <div className="hidden sm:flex lg:flex-1 lg:justify-end lg:w-full">
                    <Link href="/admin/login" className="text-md font-semibold leading-6 text-gray-900 relative group" onClick={logout}>
                      Log out
                      <span aria-hidden="true" className="transition-transform transform inline-block ml-1 group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>


                </div>
              </div>
            </div>
          </>
        </Disclosure>

      </div>
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-theme pb-4 pt-5">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-1 -mr-14 p-1">
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      <span className="sr-only">Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">
                  <nav className="flex h-full flex-col">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-darkTheme text-white'
                              : 'text-indigo-100 hover:bg-darkTheme hover:text-white',
                            'group flex items-center rounded-md py-2 px-3 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-white' : 'text-lightTheme group-hover:text-white',
                              'mr-3 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          <span>{item.name}</span>
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Header;
